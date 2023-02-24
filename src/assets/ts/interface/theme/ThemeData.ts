import { Theme } from "devui-theme";

/**
 * 主题配置信息
 */
export interface ThemeData {
  devui: { [themeParamName: string]: string },
  editor: { [themeParamName: string]: string },
  native: { [themeParamName: string]: string },
  isDark: boolean
}

export interface AllThemeData {
  defaultThemeId: string,
  themes: { [themeId: string]: Theme }
}
