import { defaultThemeData } from "./ToolManagerDefaultTheme";

/**
 * UI组件主题配置
 */
const devuiThemeData = {
  "devui-global-bg": "#2b2d30",
  "devui-global-bg-normal": "#1e1f22",
  "devui-icon-fill": "#ced0d6",
  "devui-icon-fill-active": "#ced0d6",
  "devui-primary": "#3573f0",
  "devui-primary-hover": "#3168d5",
  "devui-primary-active": "#2857b4",
  "devui-text": "#e8e8e8"
};

/**
 * 富文本编辑器主题配置
 */
const ckEditorThemeData = {
  "ck-color-base-text": `${devuiThemeData["devui-text"]} !important`,
  "ck-color-base-background": `${devuiThemeData["devui-global-bg-normal"]} !important`
};

/**
 * 主题配置
 */
const todoManagerThemeData = {
  "tm-window-btn-color": "#8c8c8c",
  "tm-primary-hover": "#393b40",
  "tm-primary-border": "#43454a",
  "tm-close-hover": "#e81123",
  "tm-close-active": "#f1707a",
  "tm-text-select-bg": "#214283"
};

/**
 * ToolManager暗色主题变量定义
 */
export const themeData = {
  ...defaultThemeData,
  ...devuiThemeData,
  ...ckEditorThemeData,
  ...todoManagerThemeData
};
