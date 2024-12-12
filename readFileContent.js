require("dotenv").config();
const fs = require("fs");
const path = require("path");
const logError = require("./errorLogger");

const filePath = path.resolve(process.env.READ_FILE_PATH);

try {
  if (filePath === undefined) {
    logError(
      "Error: fileToRead.txt does not exist. Please check the file path."
    );
    return;
  }
  const data = fs.readFileSync(filePath, "utf-8");
  console.log(data);
} catch (error) {
  console.error("Error while reading", error);
}
