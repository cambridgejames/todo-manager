import LOGGER from "electron-log";
import * as path from "path";
import * as fs from "fs";

const logDir = path.resolve("./log");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

LOGGER.transports.file.level = "warn";
LOGGER.transports.file.file = path.join(logDir, "root.log");
LOGGER.transports.file.maxSize = 50 * 1024 * 1024; // 50MB

LOGGER.transports.console.level = "warn";

export default LOGGER;
