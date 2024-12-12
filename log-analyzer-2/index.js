const fs = require("fs");
require("dotenv").config();
const readline = require("readline");

const logFile = process.env.LOG_FILE_PATH;
const authFilePath = process.env.AUTH_LOG_FILE_PATH;

const config = {
  errorThreshold: 3,
  failedAuthThreshold: 3,
};

function highlightErrors() {
  try {
    const data = fs.readFileSync(logFile, "utf-8");
    const logLines = data.trim().split("\n");
    let errorCount = 0;

    logLines.forEach((line) => {
      if (line.includes("ERROR")) {
        errorCount++;
      }
    });

    console.log("Total numbers of error detected", errorCount);

    if (errorCount >= config.errorThreshold) {
      console.log(
        `Alert Errors have exceeded the threshold of  ${config.errorThreshold}`
      );
    } else {
      console.log(`Errors are with in acceptable limits.`);
    }
  } catch (error) {
    console.error(`Error reading log files ${error}`);
  }
}

// highlightErrors();

function logSuspiciousActivity() {
  try {
    const data = fs.readFileSync(authFilePath, "utf-8");
    const lines = data.trim().split("\n");

    let failedAuthCount = 0;
    lines.forEach((line) => {
      if (line.includes("User failed to authenticate.")) {
        failedAuthCount++;
      }
    });

    console.log(`Failed Authenticate ${failedAuthCount}`);

    if (failedAuthCount >= config.failedAuthThreshold) {
      const alertMessage = `Authentication Failure Detected: ${failedAuthCount} attempts failed.`;
      fs.writeFileSync("./logs/suspiciousActivity.log", alertMessage, {
        flag: "a",
      });
      console.log(`ALERT! Authentication failure exceeded.`);
    } else {
      console.log(`Authentication Failure is within limits.`);
    }
  } catch (error) {
    console.error(`Error handling logs: ${error.message}`);
  }
}
// logSuspiciousActivity();

function countSuccessfulLogins() {
  try {
    let data = fs.readFileSync(authFilePath, "utf-8");
    let logLine = data.trim().split("\n");

    let countOfSuccessfulLogin = 0;

    logLine.forEach((line) => {
      if (line.includes("User logged in successfully.")) {
        countOfSuccessfulLogin++;
      }
    });
    console.log("User logged in message count :) ", countOfSuccessfulLogin);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}
// countSuccessfulLogins();

function calculateErrorToWarningRatio() {
  try {
    let data = fs.readFileSync(authFilePath, "utf-8");
    let logLines = data.trim().split("\n");

    let ratio = 0;
    let warn = 0;
    let error = 0;

    logLines.forEach((line) => {
      if (line.includes("ERROR")) error++;
      if (line.includes("WARNING")) warn++;
    });

    if (warn % 2 === 0 && error % 2 === 0) {
      warn /= 2;
      error /= 2;
    }
    console.log(`RATIO:) , ${warn} : ${error}`);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}
// calculateErrorToWarningRatio();

function highlightErrorsWithDynamicThreshold() {
  try {
    const data = fs.readFileSync(authFilePath, "utf-8");
    const logLines = data.trim().split("\n");
    let errorCount = 0;
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter your threshold: ", (input) => {
      console.log(config.errorThreshold);
      config.errorThreshold = parseInt(input, 10);
      console.log(config.errorThreshold);

      if (isNaN(config.errorThreshold) || config.errorThreshold < 0) {
        console.error("Invalid threshold value. Please enter a valid number.");
        rl.close();
        return;
      }

      let errorCount = 0;

      logLines.forEach((line) => {
        if (line.includes("ERROR")) {
          errorCount++;
        }
      });

      console.log("Total number of errors detected:", errorCount);

      if (errorCount >= config.errorThreshold) {
        console.log(
          `Alert! Errors have exceeded the threshold of ${config.errorThreshold}.`
        );
      } else {
        console.log("Errors are within acceptable limits.");
      }

      rl.close();
    });
  } catch (error) {
    console.error(`Error reading log files ${error}`);
  }
}

highlightErrorsWithDynamicThreshold();
