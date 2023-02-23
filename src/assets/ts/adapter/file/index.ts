import * as path from "path";
import * as fs from "fs";

const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
const CONFIG_FILE_OPTION = "utf-8";

/**
 * 根据文件URL拼接文件实际路径
 *
 * @param pathToFile 配置文件的URL（从assets目录开始）
 */
const getConfigPath = (pathToFile: string): string => {
  if (IS_DEVELOPMENT) {
    return path.join(".", "assets", pathToFile);
  }
  return path.join(".", pathToFile);
};

/**
 * 读取配置文件
 *
 * @param pathToFile 配置文件的URL
 */
export const readFile = (pathToFile: string): Promise<JSON> => {
  return new Promise((resolve, reject) => {
    fs.readFile(getConfigPath(pathToFile), CONFIG_FILE_OPTION, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

/**
 * 写配置文件
 *
 * @param fileContent 配置文件内容
 * @param pathToFile 配置文件的URL
 */
export const writeFile = (fileContent: string, pathToFile: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(getConfigPath(pathToFile), fileContent, error => {
      if (error) {
        reject(error);
      }
    });
  });
};
