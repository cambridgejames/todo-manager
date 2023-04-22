import { BrowserWindow, ipcMain } from "electron";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

import { Theme } from "devui-theme";
import { getPluginChanel, IpcRenderChannel } from "@todo-manager/plugin-sdk/lib/common";

// eslint-disable-next-line
type IpcHandleFunc = (event: IpcMainInvokeEvent, ...args: any[]) => (Promise<void>) | (any);

const changeThemeHandler: IpcHandleFunc = (event: IpcMainInvokeEvent, targetTheme: Theme) => {
  const themeData = targetTheme.data;
  const mainWindows: Array<BrowserWindow> = BrowserWindow.getAllWindows();
  for (const currentWindow of mainWindows) {
    currentWindow.setBackgroundColor(themeData["devui-global-bg-normal"]);
    if (currentWindow.setTitleBarOverlay) {
      currentWindow.setTitleBarOverlay({
        color: themeData["devui-global-bg"],
        symbolColor: themeData["tm-window-btn-color"]
      });
    }
  }
};

const pluginChannelRetransmissionHandler: IpcHandleFunc = (event: IpcMainInvokeEvent, ...args: any[]) => {
  console.log(args);
};

export const handleIpc = () => {
  ipcMain.handle(IpcRenderChannel.CHANGE_THEME, changeThemeHandler);
  ipcMain.handle(getPluginChanel("*"), pluginChannelRetransmissionHandler);
};
