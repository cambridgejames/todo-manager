import { Theme, devuiLightTheme, devuiDarkTheme } from "devui-theme";
import { themeData as lightThemeData } from "./definition/ToolManagerLightTheme";
import { themeData as darkThemeData } from "./definition/ToolManagerDarkTheme";
import { readDir, readFile } from "@/assets/ts/adapter/file";
import * as path from "path";
import { AllThemeData, ThemeData } from "@/assets/ts/interface/theme/ThemeData";

const THEME_DIR: string = "/theme";
const THEME_FILE_NAME_SUFFIX: string = "json";
const THEME_FILE_NAME_DEFAULT: string = "default";
const THEME_FILE_FILTER: string = `^(?!${THEME_FILE_NAME_DEFAULT}\\.${THEME_FILE_NAME_SUFFIX}).+\\.${THEME_FILE_NAME_SUFFIX}$`;

const THEME_FILES: Array<string> = await readDir(THEME_DIR, THEME_FILE_FILTER);

/**
 * 根据文件名读取主题配置文件数据
 *
 * @param fileName 主题配置文件名
 */
const getThemeData = async (fileName: string): Promise<ThemeData> => {
  const themeData = await readFile(path.join(THEME_DIR, fileName));
  return JSON.parse(themeData) as ThemeData;
};

// 文件名转驼峰命名
const fileNameToNativeName = (fileName: string): string => fileName.substring(0, fileName.length - THEME_FILE_NAME_SUFFIX.length - 1);
// 驼峰命名转横线连接
const nativeNameToId = (nativeName: string): string => nativeName.replace(/([A-Z])/g, "-$1").toLowerCase();
// 驼峰命名转空格连接
const nativeNameToName = (nativeName: string): string => nativeName.replace(/([A-Z])/g, " $1")
  .replace(/^./, (str: string): string => str.toUpperCase());

/**
 * 将主题配置文件转换成主题对象
 *
 * @param nativeThemeName 主题配置文件名（不包含后缀名）
 * @param themeData 主题配置文件数据
 */
const buildDevUiTheme = (nativeThemeName: string, themeData: ThemeData): Theme => {
  const themeName = nativeNameToName(nativeThemeName);
  for (const key in themeData.editor) {
    themeData.editor = Object.assign(themeData.editor, { [key]: `${themeData.editor[key]} !important` });
  }
  const mergedTheme = themeData.isDark ? devuiDarkTheme.data : devuiLightTheme.data;
  return new Theme({
    id: nativeNameToId(nativeThemeName),
    name: themeName,
    cnName: themeName,
    data: Object.assign({}, mergedTheme, themeData.devui, themeData.editor, themeData.native),
    isDark: themeData.isDark
  });
};

/**
 * 构造全部主题集合 [key=主题Id, value=DevUI主题对象]
 *
 * @param defaultThemeFileName 默认主题文件名
 * @param themeFileNames 主题文件名列表
 */
const buildAllThemeDataMap = async (defaultThemeFileName: string, themeFileNames: Array<string>): Promise<AllThemeData> => {
  const defaultThemeData: ThemeData = await getThemeData(defaultThemeFileName);
  const themDataMap: AllThemeData = { themes: {} } as AllThemeData;
  for (const currentFileName of themeFileNames) {
    const currentFileContent: ThemeData = await getThemeData(currentFileName);
    const currentThemeData: ThemeData = Object.assign({}, defaultThemeData, currentFileContent);
    const nativeThemeName: string = fileNameToNativeName(currentFileName);
    themDataMap.themes[nativeNameToId(nativeThemeName)] = buildDevUiTheme(nativeThemeName, currentThemeData);
  }
  themDataMap.defaultThemeId = "tm-dark";
  return themDataMap;
};

export const allThemData: AllThemeData
  = await buildAllThemeDataMap(`${THEME_FILE_NAME_DEFAULT}.${THEME_FILE_NAME_SUFFIX}`, THEME_FILES);

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
