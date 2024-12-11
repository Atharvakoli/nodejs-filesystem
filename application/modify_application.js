const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, 'application_log.txt');

try {
  let data = fs.readFileSync(filePath, 'utf-8');
  let convertDataToArray = data.trim().split('\n');

  const currentDateTime = new Date();
  const formattedDate = currentDateTime
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);
  const updatedLogEntry = `[${formattedDate}] [SUCCESS] [PaymentModule] Payment for Order #A1234 has been processed successfully.`;

  let newUpdatedLogs = convertDataToArray.map((text) =>
    text.trim() ===
    '[2024-10-23 15:02:15] [WARNING] [PaymentModule] Payment processing taking longer than expected for Order #A1234.'
      ? updatedLogEntry
      : text
  );
  fs.writeFileSync('application_log.txt', newUpdatedLogs.join('\n'));
  console.log('Application Modified successfully :)');
} catch (error) {
  console.error('Error: ', error);
}
