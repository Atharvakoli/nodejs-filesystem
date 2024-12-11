const fs = require('fs');

try {
  fs.appendFileSync('log.txt', 'New log entry: Data appended at 2:00 PM\\n');
  console.log('Data appended successfully');
} catch (err) {
  console.error('Error: Unable to write to the file');
}
