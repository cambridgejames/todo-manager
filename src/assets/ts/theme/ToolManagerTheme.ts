import { Theme, devuiLightTheme, devuiDarkTheme } from "devui-theme";
import { themeData as lightThemeData } from "./definition/ToolManagerLightTheme";
import { themeData as darkThemeData } from "./definition/ToolManagerDarkTheme";

/**
 * 定义亮色主题
 */
export const toolManagerLightTheme: Theme = new Theme({
  id: "ToolManagerLightTheme",
  name: "Tool Manager Light",
  cnName: "Tool Manager Light",
  data: Object.assign({}, devuiLightTheme.data, lightThemeData),
  isDark: false
});

/**
 * 定义暗色主题
 */
export const toolManagerDarkTheme: Theme = new Theme({
  id: "ToolManagerDarkTheme",
  name: "Tool Manager Dark",
  cnName: "Tool Manager Dark",
  data: Object.assign({}, devuiDarkTheme.data, darkThemeData),
  isDark: true
});
