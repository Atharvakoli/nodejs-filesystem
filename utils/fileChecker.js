require("dotenv").config();
const fs = require("fs");
const path = process.env.FILE_PATH;

function checkAndCreateFile(filePath) {
  if (!filePath) {
    console.log("file Path is not defined");
    return;
  }
  fs.access(filePath, fs.constants.F_OK, (error) => {
    if (error) {
      fs.writeFile(filePath, "snaped text", (writeErr) => {
        if (writeErr) throw writeErr;
        console.log("File created :) ");
      });
    } else {
      console.log("File already exists");
    }
  });
}

checkAndCreateFile(path);
