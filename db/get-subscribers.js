const client = require("./connection");
const getSubs = async sem_branch => {
  //   First, getting the branch ids
  const branches = await client.query("Select * from branch");
  // Now, getting the corresponding branch id
  const obj_branch = {};
  branches.rows.forEach(branch => {
    obj_branch[branch.name] = branch.b_id;
  });

  for (let i of sem_branch) {
    i["b_id"] = obj_branch[i.branch];
  }

  const query = `SELECT * from subscribers where admission_year=$1 and branch=$2`;

  let out = {};
  for (let i of sem_branch) {
    const data = await client.query(query, [i.year, i.b_id]);
    console.log(data.rows);
    parseSem(data.rows, out, i.sem);
  }

  return out;
};

function parseSem(rows, obj, sem) {
  obj[sem] = rows;
}

module.exports = getSubs;
