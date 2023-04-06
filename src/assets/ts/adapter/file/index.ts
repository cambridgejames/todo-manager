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
export const getConfigPath = (pathToFile: string): string => {
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

/**
 * 读取指定目录下的文件列表
 *
 * @param pathToDir 目录URL
 * @param filter 过滤正则
 */
export const readDir = (pathToDir: string, filter = "(?:)"): Promise<Array<string>> => {
  return new Promise<Array<string>>((resolve, reject) => {
    fs.readdir(getConfigPath(pathToDir), (error, data: Array<string>) => {
      if (error) {
        reject(error);
      }
      const regex = new RegExp(filter);
      resolve(data.filter(value => regex.test(value)));
    });
  });
};

/**
 * 判断指定目录或文件是否存在
 *
 * @param pathToFile
 */
export const isExists = async (pathToFile: string | Array<string>): Promise<boolean> => {
  const filePaths: Array<string> = typeof pathToFile === "string" ? [pathToFile] : pathToFile;
  let solution = true;
  for (const currentFilePath of filePaths) {
    solution &&= fs.existsSync(getConfigPath(currentFilePath));
  }
  return solution;
};
