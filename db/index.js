const client = require("./connection");
const loadBranches = require("./load");
const getBranches = require("./get-branch");
module.exports = {
  client,
  loadBranches,
  getBranches
};
