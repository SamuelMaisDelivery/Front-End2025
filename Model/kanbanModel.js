const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../db.json");

const readData = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
