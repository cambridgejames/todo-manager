import { readFile, writeFile } from "@/assets/ts/adapter/file";

const IS_DEVELOPMENT: boolean = process.env.NODE_ENV !== "production";
const CONFIG_FILE_URL: string[] = [
  "/config/settings.user.json"
];

export type RollbackFunc = () => void;

export const getRollbackFunc = async (): Promise<RollbackFunc | null> => {
  if (!IS_DEVELOPMENT) {
    return null;
  }
  const solutionMap = new Map<string, string>();
  for (const filePathItem of CONFIG_FILE_URL) {
    const currentSolution: string = await readFile(filePathItem);
    solutionMap.set(filePathItem, currentSolution);
    console.log(`Record config file name: ${filePathItem}`);
  }
  return () => {
    for (const [key, value] of solutionMap) {
      writeFile(value, key);
      console.log(`Rollback config file: ${key}`);
    }
  };
};
