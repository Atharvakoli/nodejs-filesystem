const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'application_log.txt');

try {
  let data = fs.readFileSync(filePath, 'utf-8');
  console.log(data);
  console.log('\n');
  console.log('LENGTH :) ', data.trim().split('\n').length);
} catch (error) {
  console.error(error);
}
