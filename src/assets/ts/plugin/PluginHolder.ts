import { PluginFile } from "@/assets/ts/plugin/model";
import LOGGER from "@/log";
import { PluginClient, PluginExport } from "@todo-manager/plugin-sdk/lib/client";
import { get, isEmpty } from "lodash";

/**
 * 懒加载的插件文件对象及实例
 *
 * @since 2023-04-07
 */
class LazyPluginInstance {
  private readonly _instanceFile: PluginFile;
  private _instanceClient: PluginClient | null;

  public constructor(instanceFile: PluginFile) {
    this._instanceFile = instanceFile;
    this._instanceClient = null;
  }

  /**
   * 获取或加载插件实例
   */
  public loadInstanceClient(): PluginClient {
    if (!isEmpty(this._instanceClient)) {
      return this._instanceClient;
    }
    const plugin: PluginExport = require(/* webpackIgnore: true */ this._instanceFile.entrance).default;
    this._instanceClient = plugin.getInstance();
    this._instanceClient!.onMount(); // [Plugin Lifecycle] onMount
    LOGGER.warn(`Load and mount plugin ${this._instanceFile.config.name}`);
    return this._instanceClient!;
  }
}

/**
 * 插件实例存储管理类
 *
 * @since 2023-04-07
 */
export default class PluginHolder {
  private readonly commandPlugins: Map<string, Array<LazyPluginInstance>>;

  public constructor() {
    this.commandPlugins = new Map<string, Array<LazyPluginInstance>>();
  }

  /**
   * 添加一个插件
   *
   * @param pluginInstance 插件的文件信息
   */
  public async addPlugin(pluginInstance: PluginFile): Promise<void> {
    const currentPluginInstance = new LazyPluginInstance(pluginInstance);
    if (pluginInstance.config.activationEvents.includes("*")) {
      // 当插件标记为“*”时，在程序移动时就要立即加载插件
      const instances = get(this.commandPlugins, "*", new Array<LazyPluginInstance>());
      instances.push(currentPluginInstance);
      currentPluginInstance.loadInstanceClient();
      this.commandPlugins.set("*", instances);
      return;
    }
    // 缓存根据command指令启动的插件，不需要立即加载
    [...pluginInstance.config.activationEvents].filter(event => event.startsWith("onCommand:") && event.length > 10)
      .forEach(activationEvent => {
        const cachedPlugins = get(this.commandPlugins, activationEvent, new Array<LazyPluginInstance>());
        cachedPlugins.push(currentPluginInstance);
        this.commandPlugins.set(activationEvent, cachedPlugins);
      });
  }

  /**
   * 根据command指令加载或获取插件实例
   *
   * @param activationEvent command指令
   */
  public loadAndGetPlugins(activationEvent: string): Array<PluginClient> {
    return [...get(this.commandPlugins, activationEvent, new Array<LazyPluginInstance>())]
      .map(lazyPluginInstance => lazyPluginInstance.loadInstanceClient());
  }
}
