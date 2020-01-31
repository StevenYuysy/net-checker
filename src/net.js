const axios = require("axios");

function checkResult(urls) {
  return Promise.all(urls.map(check));
}

async function check(url) {
  try {
    await axios.get(url);
    return { url, success: true };
  } catch (e) {
    return { url, success: false };
  }
}

module.exports = { checkResult, check };
