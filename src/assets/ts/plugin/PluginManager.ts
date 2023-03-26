import { PluginClient } from "@todo-manager/plugin-sdk/lib/client/PluginClient";
import { readDir } from "@/assets/ts/adapter/file";
import PluginHolder from "@/assets/ts/plugin/PluginHolder";

const PLUGIN_DIR: string = "/plugins";
const PLUGIN_FILTER: string = "^(?!.*sdk).*$";

export default class PluginManager {
  private static _pluginManager: PluginManager;

  private readonly pluginHolder: PluginHolder;

  private constructor() {
    this.pluginHolder = new PluginHolder();
    this.loadPlugins().then(() => {});
  }

  public static instance(): PluginManager {
    if (this._pluginManager === undefined) {
      this._pluginManager = new PluginManager();
    }
    return this._pluginManager;
  }

  private async loadPlugins(): Promise<void> {
    const directories = await readDir(PLUGIN_DIR, PLUGIN_FILTER);
    for (const directory of directories) {
      const dirName = `${PLUGIN_DIR}/${directory}/lib`;
      const fileList = await readDir(dirName);
      console.log(fileList);
    }
  }
}
