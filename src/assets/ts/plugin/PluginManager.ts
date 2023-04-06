import { getConfigPath, isExists, readDir, readFile } from "@/assets/ts/adapter/file";
import PluginHolder from "@/assets/ts/plugin/PluginHolder";
import { PluginConfig, PluginFile } from "@/assets/ts/plugin/model";
import LOGGER from "@/log";

import * as jsonpath from "jsonpath";
import * as path from "path";
import { isEmpty } from "lodash";

/**
 * 插件管理单例类
 *
 * @since 2023-04-07
 */
export default class PluginManager {
  private static readonly _PLUGIN_DIR: string = "/plugins";
  private static readonly _PLUGIN_FILTER: string = "^(?!.*sdk).*$";

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
    const directories = await readDir(PluginManager._PLUGIN_DIR, PluginManager._PLUGIN_FILTER);
    for (const directory of directories) {
      const currentPlugin = await this.checkAndGetPluginFile(directory);
      if (currentPlugin === null) {
        continue;
      }
      LOGGER.info(`Found plugin: ${currentPlugin.config.name}`);
      this.pluginHolder.addPlugin(currentPlugin).then(() => {
        LOGGER.warn(`Add plugin ${currentPlugin.config.name} to holder`);
      }).catch(error => {
        LOGGER.error(`Add plugin ${currentPlugin.config.name} to holder failed: ${error}`);
      });
    }
  }

  /**
   * 校验并返回插件的文件信息
   *
   * @param pluginDirName 插件目录名称
   * @private
   */
  private async checkAndGetPluginFile(pluginDirName: string): Promise<PluginFile | null> {
    const pluginDirPath = path.join(PluginManager._PLUGIN_DIR, pluginDirName);
    const fileNameList = await readDir(pluginDirPath);
    if (!fileNameList.includes("package.json")) {
      LOGGER.info(`Plugin dir "${pluginDirName}" dose not has package.json, skip parsing.`);
      return null;
    }
    const packageJsonContent: JSON = JSON.parse(await readFile(path.join(pluginDirPath, "package.json")));
    const entrance: string = jsonpath.value(packageJsonContent, "$.main");
    const pluginConfig: PluginConfig = jsonpath.value(packageJsonContent, "$.plugin") as PluginConfig;
    if (!await this.checkPluginConfig(pluginDirName, pluginConfig)) {
      LOGGER.info(`Plugin config in "${pluginDirName}/package.json" is illegal, skip parsing.`);
      return null;
    }
    return {
      entrance: path.resolve(getConfigPath(pluginDirPath), entrance),
      config: pluginConfig,
      i18n: new Map<string, Array<string>>()
    };
  }

  /**
   * 校验package.json中的插件配置
   *
   * @param pluginDirName 插件目录名称
   * @param pluginConfig 插件配置
   * @private
   */
  private async checkPluginConfig(pluginDirName: string, pluginConfig: PluginConfig): Promise<boolean> {
    if (isEmpty(pluginConfig) || isEmpty(pluginConfig.name) || isEmpty(pluginConfig.activationEvents)) {
      return false;
    }
    const i18n = pluginConfig.i18n;
    if (isEmpty(i18n)) {
      return true;
    }
    return await isExists([...i18n.values()].map(i18nFile => path.join(pluginDirName, i18nFile)));
  }
}
