import { IpcRenderChannel } from "@/assets/ts/interface/ipc/IpcRenderChannel";

import { BrowserWindow, ipcMain } from "electron";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

import { Theme } from "devui-theme";

// eslint-disable-next-line
type IpcHandleFunc = (event: IpcMainInvokeEvent, ...args: any[]) => (Promise<void>) | (any);

const IPC_HANDLER_MAP = new Map<IpcRenderChannel, IpcHandleFunc>();

IPC_HANDLER_MAP.set(IpcRenderChannel.CHANGE_THEME, (event, targetTheme: Theme) => {
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
});

export const handleIpc = () => IPC_HANDLER_MAP.forEach((handler: IpcHandleFunc, channel: string) => {
  ipcMain.handle(channel, handler);
});
