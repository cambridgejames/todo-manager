import { ipcRenderer } from "electron";
import { getPluginChanel } from "@/common";

class Logger {
  private static _logger: Logger;

  public static instance(): Logger {
    if (this._logger === undefined) {
      this._logger = new Logger();
    }
    return this._logger;
  }

  public warn(...args: any): void {
    this.logWarn(args).then(() => {
    });
  }

  private async logWarn(...args: any): Promise<void> {
    console.log(args);
    await ipcRenderer.invoke(getPluginChanel("logger"), {
      data: {
        "devui-global-bg-normal": "#ffffff",
        "devui-global-bg": "#f7f8fa",
        "tm-window-btn-color": "#64676e"
      }
    });
  }
}

export const LOGGER: Logger = Logger.instance();
