const parse = require("./../parse/parse-handler");
const CronJob = require("cron").CronJob;
module.exports = new CronJob("*/20 * * * * *", function() {
  parse();
});
