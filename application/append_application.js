const fs = require('fs');

try {
  fs.appendFileSync(
    'application_log.txt',
    `\n[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] [SHIPPING] Shipping Order to Customer [ShippingModule] Order #A1234 has been shipped. `
  );
  console.log('Appended successfully :) ');
} catch (error) {
  console.error('Error: ', error);
}
