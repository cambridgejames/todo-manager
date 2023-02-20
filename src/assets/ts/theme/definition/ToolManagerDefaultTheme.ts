/**
 * UI组件主题配置
 */
const devuiThemeData = {
  "devui-font-size": "14px",
  "devui-font-size-sm": "12px",
  "devui-font-size-md": "14px",
  "devui-font-size-lg": "14px",
  "devui-animation-duration-slow": "150ms",
  "devui-animation-duration-base": "100ms",
  "devui-animation-duration-fast": "100ms"
};

/**
 * 富文本编辑器主题配置
 */
const ckEditorThemeData = {
  "ck-border-radius": "0 !important",
  "ck-spacing-large": "10px !important"
};

/**
 * 主题配置
 */
const todoManagerThemeData = {
  "tm-header-height": "40px",
  "tm-nav-tab-padding": "6px",
  "tm-article-padding": "10px"
};

/**
 * 定义公共（默认）主题属性
 */
export const defaultThemeData = {
  ...devuiThemeData,
  ...ckEditorThemeData,
  ...todoManagerThemeData
};
