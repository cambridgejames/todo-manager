import defaultConfigure from "@/build/config/settings.default.json";
import * as jsonPath from "jsonpath";
import { readFile, writeFile } from "@/assets/ts/adapter/file";

const CONFIG_FILE_URL: string = "/config/settings.user.json";
const CONFIG_FILE_INDENTATION: number = 2;

/**
 * 根据JSONPath获取配置
 *
 * @param jsonPathStr JSONPath
 */
export const getConfigure = async (jsonPathStr: string): Promise<string | undefined> => {
  const userConfigJSON: JSON = await readFile(CONFIG_FILE_URL);
  const solution = jsonPath.value(userConfigJSON, jsonPathStr);
  return solution === undefined ? jsonPath.value(defaultConfigure, jsonPathStr) : solution;
};

export const setConfigure = async (jsonPathStr: string, confStr: string): Promise<void> => {
  const userConfigJSON: JSON = await readFile(CONFIG_FILE_URL);
  jsonPath.value(userConfigJSON, jsonPathStr, confStr);
  return writeFile(`${JSON.stringify(userConfigJSON, null, CONFIG_FILE_INDENTATION)}\n`, CONFIG_FILE_URL);
};
