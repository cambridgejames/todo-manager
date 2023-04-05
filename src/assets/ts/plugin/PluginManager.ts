import { PluginClient } from "@todo-manager/plugin-sdk/lib/client/PluginClient";
import { getConfigPath, readDir, readFile } from "@/assets/ts/adapter/file";
import PluginHolder from "@/assets/ts/plugin/PluginHolder";
import * as path from "path";
import { PluginFile } from "@/assets/ts/plugin/model/PluginFile";
import * as jsonpath from "jsonpath";
import { PluginConfig } from "@/assets/ts/plugin/model/PluginConfig";

const PLUGIN_DIR: string = "/plugins";
const PLUGIN_FILTER: string = "^(?!.*sdk).*$";

export default class PluginManager {
  private static _pluginManager: PluginManager;

  private readonly pluginHolder: PluginHolder;

  private constructor() {
    this.pluginHolder = new PluginHolder();
    this.scanPlugins().then(() => {});
  }

  public static instance(): PluginManager {
    if (this._pluginManager === undefined) {
      this._pluginManager = new PluginManager();
    }
    return this._pluginManager;
  }

  private async scanPlugins(): Promise<void> {
    const directories = await readDir(PLUGIN_DIR, PLUGIN_FILTER);
    for (const directory of directories) {
      const currentPlugin = await this.checkAndGetPluginFile(path.join(PLUGIN_DIR, directory));
      if (currentPlugin === null) {
        continue;
      }
      const plugin = require(/* webpackIgnore: true */ currentPlugin.entrance);
      const instance: PluginClient = plugin.default.getInstance();
      console.log(instance);
      instance.onMount();
    }
  }

  private async checkAndGetPluginFile(pluginDirPath: string): Promise<PluginFile | null> {
    const fileNameList = await readDir(pluginDirPath);
    if (!fileNameList.includes("package.json")) {
      return null;
    }
    const packageJsonContent: JSON = JSON.parse(await readFile(path.join(pluginDirPath, "package.json")));
    const entrance: string = jsonpath.value(packageJsonContent, "$.main");
    const pluginConfig: PluginConfig = jsonpath.value(packageJsonContent, "$.plugin") as PluginConfig;
    // 缺省：i18n文件校验
    return {
      entrance: path.resolve(getConfigPath(pluginDirPath), entrance),
      config: pluginConfig,
      i18n: new Map<string, Array<string>>()
    };
  }
}
