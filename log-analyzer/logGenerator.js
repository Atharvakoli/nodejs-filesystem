const fs = require("fs");

// Define log levels and sample messages
const logLevels = ["INFO", "DEBUG", "WARNING", "ERROR", "CRITICAL"];
const userLogMessages = [
  "User logged in successfully.",
  "User failed to authenticate.",
  "Database connection established.",
  "Database connection failed.",
  "Data saved to database.",
  "Data retrieval successful.",
  "An unexpected error occurred.",
  "Service request timed out.",
  "Cache cleared successfully.",
  "Email sent to user.",
];
const systemLogMessages = [
  "Server started on port 3000.",
  "Server shut down unexpectedly.",
  "Database connection established.",
  "Database connection failed with error code 503.",
  "Memory usage exceeded threshold.",
  "Disk space below 20%.",
  "Service request timed out.",
];

function chooseLogMessage() {
  const isSystemEvent = Math.random() < 0.3; // 30% chance for a system event
  if (isSystemEvent) {
    return systemLogMessages[
      Math.floor(Math.random() * systemLogMessages.length)
    ];
  }
  return userLogMessages[Math.floor(Math.random() * userLogMessages.length)];
}

// Generate a random timestamp within the last 24 hours
function randomTimestamp() {
  const now = new Date();
  const randomPastTime = now.getTime() - Math.floor(Math.random() * 86400000); // 86400000 ms in a day
  return new Date(randomPastTime)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");
}

// Generate a single log line
function generateLogLine() {
  const timestamp = randomTimestamp();
  const level = logLevels[Math.floor(Math.random() * logLevels.length)];
  const message =
    userLogMessages[Math.floor(Math.random() * userLogMessages.length)];
  const userId = Math.floor(Math.random() * 9000) + 1000; // Random user ID between 1000 and 9999
  return `${timestamp} - ${level} - User ID ${userId} - ${message}`;
}

// Generate and write log lines to file
function generateLogFile(filename, numLines) {
  let logs = "";
  for (let i = 0; i < numLines; i++) {
    logs += generateLogLine() + "\n";
  }
  fs.writeFileSync(filename, logs);
  console.log(`Generated ${numLines} log lines in '${filename}'`);
}

// Generate 10,000 log lines in 'logs.txt'
generateLogFile("logs.txt", 1000);
