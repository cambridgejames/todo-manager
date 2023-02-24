import { IpcRenderChannel } from "@/assets/ts/interface/ipc/IpcRenderChannel";

import { BrowserWindow, ipcMain } from "electron";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

import { Theme } from "devui-theme";

type IpcHandleFunc = (event: IpcMainInvokeEvent, ...args: any[]) => (Promise<void>) | (any);

const IPC_HANDLER_MAP = new Map<IpcRenderChannel, IpcHandleFunc>();

IPC_HANDLER_MAP.set(IpcRenderChannel.CHANGE_THEME, (event, targetTheme: Theme) => {
  const themeData = targetTheme.data;
  const mainWindow: BrowserWindow = BrowserWindow.getAllWindows()[0];
  mainWindow.setBackgroundColor(themeData["devui-global-bg-normal"]);
  mainWindow.setTitleBarOverlay({
    color: themeData["devui-global-bg"],
    symbolColor: themeData["tm-window-btn-color"]
  });
});

export const handleIpc = () => IPC_HANDLER_MAP.forEach((handler: IpcHandleFunc, channel: string) => {
  ipcMain.handle(channel, handler);
});
