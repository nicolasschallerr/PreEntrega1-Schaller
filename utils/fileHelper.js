const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const MAX_RETRIES = 5;
const BASE_DELAY = 100;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const readFile = async (filePath) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const data = await readFileAsync(filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        throw new Error(
          `Failed to read file after ${MAX_RETRIES} attempts: ${err.message}`
        );
      }
      await delay(BASE_DELAY * 2 ** (attempt - 1));
    }
  }
};

const writeFile = async (filePath, data) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await writeFileAsync(filePath, JSON.stringify(data, null, 2), "utf8");
      return;
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        throw new Error(
          `Failed to write file after ${MAX_RETRIES} attempts: ${err.message}`
        );
      }
      await delay(BASE_DELAY * 2 ** (attempt - 1));
    }
  }
};

module.exports = { readFile, writeFile };
