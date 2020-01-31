const program = require("commander");
const path = require("path");
const debug = require("debug")("net-checker");
const ora = require("ora");
const Table = require("cli-table");
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
  const spinner = ora("net-checker loading").start();
  const spinnerCb = text => {
    spinner.text = "send http GET request to " + text;
  };
  debug(urls);
  checkResult(urls, spinnerCb)
    .then(result => {
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
      spinner.error();
      console.error(err);
    });
} else {
  console.error("invalid command");
}
