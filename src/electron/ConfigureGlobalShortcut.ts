import {BrowserWindow, globalShortcut} from "electron";

export const configureGlobalShortcut = (): void => {
  /**
   * 刷新页面
   */
  globalShortcut.register("F5", (): void => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.reload();
    }
  });

  /**
   * 刷新页面（不使用缓存）
   */
  globalShortcut.register("Shift+F5", (): void => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.reloadIgnoringCache();
    }
  });

  /**
   * 最大化窗口
   */
  globalShortcut.register("F11", (): void => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
    }
  });

  /**
   * 调试窗口
   */
  globalShortcut.register("Ctrl+Shift+I", (): void => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.openDevTools();
    }
  });
}
