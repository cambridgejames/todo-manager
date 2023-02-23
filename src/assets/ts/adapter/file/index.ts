import * as path from "path";
import * as fs from "fs";

const IS_DEVELOPMENT: boolean = process.env.NODE_ENV !== "production";
const RESOURCE_DIR_NAME: string = "build";
const CONFIG_FILE_ENCODING = "utf-8";

/**
 * 根据文件URL拼接文件实际路径
 *
 * @param pathToFile 配置文件的URL（从assets目录开始）
 */
const getConfigPath = (pathToFile: string): string => {
  return IS_DEVELOPMENT ? path.join(".", RESOURCE_DIR_NAME, pathToFile) : path.join(".", pathToFile);
};

/**
 * 读取配置文件
 *
 * @param pathToFile 配置文件的URL
 */
export const readFile = (pathToFile: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(getConfigPath(pathToFile), CONFIG_FILE_ENCODING, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
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
    fs.writeFile(getConfigPath(pathToFile), fileContent, CONFIG_FILE_ENCODING, error => {
      if (error) {
        reject(error);
      }
    });
  });
};
