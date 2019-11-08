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

  //   console.log(sem_branch);

  const query = `SELECT * from subscribers where sem=$1 and branch=$2`;

  let out = {};
  for (let i of sem_branch) {
    const data = await client.query(query, [i.sem, i.b_id]);
    parseSem(data.rows, out, i.sem);
  }

  return out;
};

function parseSem(rows, obj, sem) {
  obj[sem] = rows;
}

module.exports = getSubs;
