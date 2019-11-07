const client = require("./connection");
const loadBranches = require("./load");
const getBranches = require("./get-branch");
const result = require("./result");

module.exports = {
  client,
  loadBranches,
  getBranches,
  result
};
