require("dotenv").config();
const fs = require("fs");
const path = require("path");

const directoryPath = path.resolve(process.env.DIRECTORY_PATH);
const threSholdDays = parseInt(process.env.THRESHOLD_DAYS);
const threSholdDate = new Date(
  Date.now() - threSholdDays * 24 * 60 * 60 * 1000
);

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error detecting directory ", err);
  }
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return console.error("Error getting files stats", err);
      }
      if (stats.mtime < threSholdDate) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error in deleting file", err);
          } else {
            console.log("deleted old files successful", filePath);
          }
        });
      }
    });
  });
});
