const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'task_log.txt');

try {
  const data = fs.readFileSync(filePath, 'utf-8');
  const convertedToArray = data.trim().split('\n');

  let logEntries = 0;

  for (let entry of convertedToArray) {
    if (
      entry.includes('[INFO]') ||
      entry.includes('[ERROR]') ||
      entry.includes('[DEBUG]') ||
      entry.includes('[WARNING]') ||
      entry.includes('[FATAL]')
    ) {
      logEntries++;
    }
  }
  console.log(logEntries);
} catch (error) {
  console.error('Error: ', error.message);
}
