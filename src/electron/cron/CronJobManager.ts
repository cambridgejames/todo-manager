import nodeCron from "node-cron";
import { BrowserWindow } from "electron";
import { onSecondlyTimer, onDailyTimer } from "@/electron/ipc/IpcProvider";

export const initCronJob = (mainWindow: BrowserWindow) => {
  nodeCron.schedule("* * * * * *", () => {
    onSecondlyTimer(mainWindow);
  });
  nodeCron.schedule("0 0 0 * * *", () => {
    onDailyTimer(mainWindow);
  });
};
