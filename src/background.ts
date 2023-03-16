import { app, protocol, BrowserWindow, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import * as path from "path";

import { getRollbackFunc, RollbackFunc } from "@/electron/ConfigureRoleback";
import { handleIpc } from "@/electron/ipc/IpcHandler";
import { configureEvent } from "@/electron/ConfiguerEvent";
import { configureGlobalShortcut } from "@/electron/ConfigureGlobalShortcut";
import { initCronJob } from "./electron/cron/CronJobManager";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);
let rollbackFunc: RollbackFunc | null = null;

async function createWindow() {
  Menu.setApplicationMenu(null);
  rollbackFunc = await getRollbackFunc();
  const mainBrowserWindow = new BrowserWindow({
    width: 960,
    height: 680,
    title: "ElectricTodo",
    titleBarStyle: "hidden",
    backgroundColor: "#2b2d30",
    titleBarOverlay: {
      color: "#2b2d30",
      symbolColor: "#8c8c8c",
      height: 40
    },
    icon: path.join(__dirname, "../public/icon/icon.ico"), // Windows图标
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.platform === "darwin") {
    app.dock.setIcon(path.join(__dirname, "../public/icon/icon.icns"));
  }
  configureEvent(mainBrowserWindow);
  configureGlobalShortcut();
  initCronJob(mainBrowserWindow);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await mainBrowserWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) {
      mainBrowserWindow.webContents.openDevTools();
    }
  } else {
    createProtocol("app");
    await mainBrowserWindow.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (rollbackFunc) {
    rollbackFunc(); // 回滚配置文件
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

app.on("ready", async () => {
  handleIpc();
  await createWindow();
});

// Exit cleanly on request from parent process in development mode.
const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
