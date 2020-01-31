const axios = require("axios");
const debug = require("debug")("net-checker");
const { CONNECTION_TIMEOUT } = require("./env");

async function checkResult(urls, cb) {
  // return Promise.all(urls.map(url => check(url, cb)));
  const results = [];
  for (url of urls) {
    const result = await check(url, cb);
    results.push(result);
  }
  return results;
}

async function check(url, cb) {
  try {
    if (cb) cb(url);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, CONNECTION_TIMEOUT);
    await axios.get(url, { cancelToken: source.token });
    return { url, success: true, message: "ok" };
  } catch (e) {
    debug("[check error]", e);
    return { url, success: false, message: e.toString() };
  }
}

module.exports = { checkResult, check };
