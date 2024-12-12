require("dotenv").config();
const fs = require("fs");
const path = require("path");
const checkAndCreateFile = require("./utils/fileChecker");

const deletedfilePath = path.resolve(process.env.DELETED_LOG_FILE);
const directoryPath = path.resolve(process.env.DIRECTORY_PATH);
const threSholdDays = parseInt(process.env.THRESHOLD_DAYS, 10);
const threSholdDate = new Date(
  Date.now() - threSholdDays * 24 * 60 * 60 * 1000
);

async function deleteOldFiles() {
  try {
    const files = await fs.promises.readdir(directoryPath);
    const deletedFiles = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      try {
        const stats = await fs.promises.stat(filePath);
        if (stats.mtime < threSholdDate) {
          await fs.promises.unlink(filePath);
          console.log("Deleted file:", filePath);
          deletedFiles.push(file);
        }
      } catch (err) {
        console.error("Error processing file:", filePath, err);
      }
    }

    checkAndCreateFile(deletedfilePath);
    const logData =
      [
        `Deleted ${deletedFiles.length} files`,
        `Files deleted: ${deletedFiles.join(", ")}`,
      ].join("\n") + "\n";

    fs.promises.appendFile(deletedfilePath, logData, "utf-8");
    console.log("Log updated successfully.");
  } catch (err) {
    console.error("Error reading directory or writing log:", err);
  }
}

deleteOldFiles();
