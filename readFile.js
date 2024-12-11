const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'log.txt');

try {
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log(data);
} catch (err) {
  console.error('Error: File not found or cannot be read');
}
