import defaultConfigure from "./settings.default.json";
import { JSONPath } from "jsonpath-plus";

/**
 * 根据JSONPath获取配置
 *
 * @param jsonPath JSONPath
 */
export const getConfigure = (jsonPath: string): string | undefined => {
  const result = JSONPath({ path: jsonPath, json: {}, wrap: false });
  return result === undefined ? JSONPath({ path: jsonPath, json: defaultConfigure, wrap: false }) : result;
};

export const setConfigure = (jsonPath: string, confStr: string): void => {
  JSONPath({
    path: jsonPath,
    json: {},
    wrap: false,
    callback: (a, b, c) => {
      console.log(a, b, c);
    }
  });
  console.log(confStr);
};
