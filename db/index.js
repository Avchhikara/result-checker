const client = require("./connection");
const loadBranches = require("./load");
const getBranches = require("./get-branch");
const result = require("./result");
const get = require("./get-subscribers");

module.exports = {
  client,
  loadBranches,
  getBranches,
  result,
  get
};
