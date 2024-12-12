require("dotenv").config();
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const logFilePath = process.env.LOG_FILE_PATH;

function summarizeLogs() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    const lines = data.trim().split("\n");
    let errorCount = 0;
    let warningCount = 0;
    lines.forEach((line) => {
      if (line.includes("ERROR")) {
        errorCount++;
      } else if (line.includes("WARN")) {
        warningCount++;
      }
    });
    console.log("Summary: ");
    console.log("Total Errors: ", errorCount);
    console.log("Total Warning: ", warningCount);
  } catch (error) {
    console.error("Error while summarizing: ", error);
  }
}

function extractErrorMessages() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    const lines = data.trim().split("\n");

    const errorMessages = lines.filter((line) => line.includes("ERROR"));
    let erroLogFile = path.join(__dirname, "errorMessages.log");
    fs.writeFileSync(erroLogFile, errorMessages.join("\n"), "utf-8");
  } catch (error) {
    console.error("Error while extracting: ", error.message);
  }
}

function countLogLevel() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    const lines = data.trim().split("\n");
    let info = 0,
      warn = 0,
      error = 0;
    lines.forEach((line) => {
      if (line.includes("ERROR")) error++;
      if (line.includes("WARN")) warn++;
      if (line.includes("INFO")) info++;
    });
    console.log(`INFO Count: ${info}\n
WARN Count: ${warn}\n
ERROR Count: ${error}`);
  } catch (error) {
    console.error("Error while file reading ", error);
  }
}
// countLogLevel();

function logFileAnalyzer() {
  let toStop = true;
  try {
    while (toStop) {
      console.log(
        "Choose an option:\n 1. Summarize Errors and Warnings\n 2. Extract Error Messages 3. To stop"
      );

      let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question("Enter your Option in between 1-3", (input) => {
        switch (input) {
          case 1:
            summarizeLogs();
            break;
          case 2:
            extractErrorMessages();
          case 3:
            toStop = false;
          default:
            console.log("Wrong input");
            break;
        }
        rl.close();
      })
    }
  } catch (error) {
    console.error("Error while file loging", error.message);
  }
}
logFileAnalyzer();
