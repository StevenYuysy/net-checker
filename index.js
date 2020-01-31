const program = require("commander");
const path = require("path");
const debug = require("debug")("net-checker");
const ora = require("ora");
const fs = require("fs");
const Table = require("cli-table");
const { readAndParseConf } = require("./src/conf");
const { checkResult } = require("./src/net");

program
  .version("0.1.0")
  .arguments("<cmd> [env] [dest]")
  .action(function(cmd, env, dest) {
    cmdValue = cmd;
    envValue = env;
    destValue = dest;
  });

program.parse(process.argv);

if (typeof cmdValue === "undefined") {
  console.error("no command given!");
  process.exit(1);
}

debug("command:", cmdValue);
debug("environment:", envValue || "no environment given");
debug("destination:", destValue);

if (cmdValue === "check") {
  const urls = readAndParseConf(path.resolve(envValue));
  const spinner = ora("net-checker loading").start();
  const spinnerCb = text => {
    spinner.text = "sending http GET request to " + text;
  };
  debug(urls);
  checkResult(urls, spinnerCb)
    .then(result => {
      if (destValue) {
        spinner.text = "writing files to" + destValue;
        fs.writeFileSync(destValue, JSON.stringify(result, null, 4), "utf8");
      }
      spinner.stop();
      const table = new Table();
      result = result.map(r => {
        if (r.success) return [r.url, "✅"];
        return [r.url, "❌"];
      });
      table.push(["url", "status"]);
      table.push(...result);
      console.log(table.toString());
    })
    .catch(err => {
      spinner.stop();
      console.error(err);
    });
} else {
  console.error("invalid command");
}
