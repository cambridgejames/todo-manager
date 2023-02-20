import { defaultThemeData } from "./ToolManagerDefaultTheme";

/**
 * UI组件主题配置
 */
const devuiThemeData = {
  "devui-global-bg": "#f7f8fa",
  "devui-global-bg-normal": "#ffffff",
  "devui-icon-fill": "#6c707e",
  "devui-icon-fill-active": "#ffffff",
  "devui-primary": "#3573f0",
  "devui-primary-hover": "#769dee",
  "devui-primary-active": "#5689ee",
  "devui-text": "#252b3a"
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
  "tm-primary-hover": "#ebecf0",
  "tm-primary-border": "#e1e2e8",
  "tm-close-hover": "#e81123",
  "tm-close-active": "#f1707a",
  "tm-text-select-bg": "#a6d2ff"
};

/**
 * ToolManager亮色主题变量定义
 */
export const themeData = {
  ...defaultThemeData,
  ...devuiThemeData,
  ...ckEditorThemeData,
  ...todoManagerThemeData
};
