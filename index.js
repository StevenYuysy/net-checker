const program = require("commander");
const path = require("path");
const debug = require("debug")("net-checker");
const { readAndParseConf } = require("./src/conf");
const { checkResult } = require("./src/net");

program
  .version("0.1.0")
  .arguments("<cmd> [env]")
  .action(function(cmd, env) {
    cmdValue = cmd;
    envValue = env;
  });

program.parse(process.argv);

if (typeof cmdValue === "undefined") {
  console.error("no command given!");
  process.exit(1);
}

debug("command:", cmdValue);
debug("environment:", envValue || "no environment given");

if (cmdValue === "check") {
  const urls = readAndParseConf(path.resolve(envValue));
  debug(urls);
  checkResult(urls)
    .then(result => {
      console.log(result.map(JSON.stringify).join("\n"));
    })
    .catch(err => {
      console.error(err);
    });
} else {
  console.error("invalid command");
}
