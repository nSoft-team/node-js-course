import path from "path";
import fs from "fs";

// Log absolute file:
const logFile = path.resolve(__dirname, "../log.txt");

// Log a message:
function log(message: string, err: any): void {
  const now = new Date();
  let msgToLog = now.toUTCString() + "\n";
  if (message) msgToLog += message + "\n";
  if (typeof err === "string") msgToLog += err + "\n"; // E.g. throw new "Blah..." in some internal library.
  if (err && err.message) msgToLog += `Message: ${err.message}\n`;
  if (err && err.stack) msgToLog += `Stack: ${err.stack}\n`;
  msgToLog +=
    "----------------------------------------------------------------------------------------------------\n";
  fs.appendFile(logFile, msgToLog, () => {}); // Do nothing if fail to log.
}

export default {
  log,
};
