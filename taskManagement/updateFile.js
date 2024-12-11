const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, 'task_log.txt');

//APPEND

try {
  const newLogEntry =
    '[2024-10-24 10:30:00] [INFO] [TaskModule] Task #T006 completed by User #U125.';

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    const currentContent = fs.readFileSync(filePath, 'utf-8');
    const separator = currentContent.endsWith('\n') ? '' : '\n';
    fs.appendFileSync(filePath, `${separator}${newLogEntry}`, 'utf-8');
  } else {
    fs.writeFileSync(filePath, newLogEntry, 'utf-8');
  }
  console.log('File appended successfully');
} catch (error) {
  console.log('Error: ', error.message);
}

// Update
try {
  let content = fs.readFileSync(filePath, 'utf-8');
  let contentToArray = content.trim().split('\n');

  let newContent = `[${new Date()
    .toISOString()
    .replace('T', ' ')
    .slice(
      0,
      19
    )}] [ERROR] [DatabaseModule] Task #T002 status successfully updated after retry.`;

  let newUpdatedDetails = contentToArray.map((text) =>
    text.trim() ===
    '[2024-10-24 09:15:30] [ERROR] [DatabaseModule] Failed to update task status for Task #T002.'
      ? newContent
      : text
  );

  fs.writeFileSync(filePath, newUpdatedDetails.join('\n'), 'utf-8');
  console.log('File Updated successfully.');
} catch (error) {
  console.log('Error: ', error.message);
}
