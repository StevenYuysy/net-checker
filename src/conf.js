const fs = require("fs");
const validator = require("validator");

function checkUrlValid(url) {
  return validator.isURL(url);
}

function parseConf(text) {
  const urls = text
    .split("\n")
    .filter(i => i.trim())
    .map(i => i.trim());
  const invalidUrls = urls.filter(url => !checkUrlValid(url));
  if (invalidUrls.length) {
    throw new Error("invalid urls: " + invalidUrls.join(","));
  }
  return urls;
}

function readConf(path) {
  const text = fs.readFileSync(path, "utf8");
  return text;
}

function readAndParseConf(path) {
  const text = readConf(path);
  return parseConf(text);
}

module.exports = {
  checkUrlValid,
  parseConf,
  readConf,
  readAndParseConf
};
