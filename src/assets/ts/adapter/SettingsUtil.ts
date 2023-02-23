import defaultConfigure from "./settings.default.json";
import * as jsonPath from "jsonpath";
import { readFile, writeFile } from "@/assets/ts/adapter/file";

const CONFIG_FILE_URL = "/config/settings.user.json";

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
  console.log(userConfigJSON);
  return writeFile(JSON.stringify(userConfigJSON), CONFIG_FILE_URL);
};
