import defaultConfigure from "./settings.default.json";
import { JSONPath } from "jsonpath-plus";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";

const resourcePath = await resolveResource("conf/settings.default.json");
const userConfigure = JSON.parse(await readTextFile(resourcePath));

/**
 * 根据JSONPath获取配置
 *
 * @param jsonPath JSONPath
 */
export const getConfigure = (jsonPath: string): string | undefined => {
  const result = JSONPath({ path: jsonPath, json: userConfigure, wrap: false });
  return result === undefined ? JSONPath({ path: jsonPath, json: defaultConfigure, wrap: false }) : result;
};

export const setConfigure = (jsonPath: string, confStr: string): void => {
  JSONPath({
    path: jsonPath,
    json: userConfigure,
    wrap: false,
    callback: (a, b, c) => {
      console.log(a, b, c);
    }
  });
  console.log(confStr);
};
