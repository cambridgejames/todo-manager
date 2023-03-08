import * as cron from "cron";
import { BrowserWindow } from "electron";
import { onSecondlyTimer, onDailyTimer } from "@/electron/ipc/IpcProvider";

export const initCronJob = (mainWindow: BrowserWindow) => {
  // 初始化秒级事件触发器
  const secondlyTimerJob = new cron.CronJob("* * * * * *", () => {
    onSecondlyTimer(mainWindow);
  }, null, true);
  secondlyTimerJob.start();

  // 初始化天级事件触发器
  const dailyTimerJob = new cron.CronJob("0 0 0 * * *", () => {
    onDailyTimer(mainWindow);
  });
  dailyTimerJob.start();
};
