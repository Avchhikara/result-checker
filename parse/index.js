const html = require("./parse-html");
const get = require("./get-html");
const handler = require("./parse-handler");
const structurize = require("./structurize");

module.exports = {
  parse: html.parseHTML,
  get: get.html,
  handler,
  structurize
};
