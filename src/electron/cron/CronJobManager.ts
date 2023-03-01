import nodeCron from "node-cron";
import { BrowserWindow } from "electron";
import { onSecondTimer } from "@/electron/ipc/IpcProvider";

export const initCronJob = (mainWindow: BrowserWindow) => {
  nodeCron.schedule("* * * * * *", () => {
    onSecondTimer(mainWindow);
  });
};
