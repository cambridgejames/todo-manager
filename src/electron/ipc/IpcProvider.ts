import { BrowserWindow } from "electron";
import { IpcMainChannel } from "@todo-manager/plugin-sdk/lib/common";

export const onFullScreen = (mainWindow: BrowserWindow, eventName: string) => {
  console.log(eventName);
  mainWindow.webContents.send(IpcMainChannel.ENTER_FULL_SCREEN);
};

export const onLeaveFullScreen = (mainWindow: BrowserWindow, eventName: string) => {
  console.log(eventName);
  mainWindow.webContents.send(IpcMainChannel.LEAVE_FULL_SCREEN);
};

export const onSecondlyTimer = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.send(IpcMainChannel.TIMER_SECOND, Date.now());
};

export const onDailyTimer = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.send(IpcMainChannel.TIMER_DAY, Date.now());
};
