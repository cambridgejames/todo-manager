import { BrowserWindow } from "electron";
import { onFullScreen, onLeaveFullScreen } from "@/electron/ipc/IpcProvider";

export const configureEvent = (mainWindow: BrowserWindow): void => {
  mainWindow.on("enter-full-screen", () => onFullScreen(mainWindow, "enter-full-screen"));
  mainWindow.on("enter-html-full-screen", () => onFullScreen(mainWindow, "enter-html-full-screen"));
  mainWindow.on("leave-full-screen", () => onLeaveFullScreen(mainWindow, "leave-full-screen"));
  mainWindow.on("leave-html-full-screen", () => onLeaveFullScreen(mainWindow, "leave-html-full-screen"));
};
