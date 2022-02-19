//This module generates a cpp file containing the code sent from server
//it saves the code in the codes folder.

const fs = require("fs");

const path = require("path");

const dirCodes = path.join(__dirname, "codes");

const { v4: uuid } = require("uuid"); //To generate a unique id for the filename.

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (code) => {
  const filename = uuid() + ".cpp";
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, code);
  return filepath;
};

module.exports = { generateFile };
