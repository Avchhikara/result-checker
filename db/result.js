/*
This file only gives us the branches whose result is out

PS: It doesn't gives us who should be notified, for that, look into:  parse-handler.js, line 17
*/

const client = require("./connection");
const logger = require("./../utils/error-logger");

const handleResult = async doc => {
  try {
    const { first, reappear } = doc;
    const output = [];
    for (let sem in first) {
      let sem_result = first[sem];
      for (result of sem_result) {
        // First, getting the value
        const { branch, date } = result;
        // console.log(result);

        let rows = await getValue(parseInt(sem), branch);
        const out_res = checkOut(date);
        if (rows.length) {
          // When there are rows
          // Now, comparing if the result is out yet
          const entry = rows[0];
          if (entry.out === false && out_res)
            output.push({
              branch,
              sem: parseInt(sem),
              date: entry.outdate
            });
          //   Now, running the update
          await update(parseInt(sem), branch, out_res);
        } else {
          // Saving the value in db
          await insert(parseInt(sem), branch, out_res);
        }
      }
    }

    return output;
  } catch (err) {
    logger("Error in storing the result \n" + err.message);
    return Error("Enable to enter the values");
  }
};

async function getValue(sem, branch) {
  const data = await client.query(
    "select * from result where branch=$1 and sem=$2",
    [branch, sem]
  );
  return data.rows;
}

async function insert(sem, branch, out) {
  let str = "INSERT into result (branch, sem, out) values ($1, $2, $3)";
  return await client.query(str, [branch, sem, out]);
}

async function update(sem, branch, out) {
  const data = await client.query(
    "update result set out=$1 where branch=$2 and sem=$3",
    [out, branch, sem]
  );
  return data;
}

function checkOut(date = "") {
  if (date.includes("-") || date.includes("/")) {
    return true;
  }
  return false;
}

module.exports = handleResult;
