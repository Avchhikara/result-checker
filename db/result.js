const client = require("./connection");
const logger = require("./../utils/error-logger");

const handleResult = async doc => {
  try {
    const { first, reappear } = doc;
    for (let sem in first) {
      let sem_result = first[sem];
      for (result in sem_result) {
        // First, getting the value
        const { branch, date } = result;
        getValue(parseInt(sem), branch);
      }
    }
  } catch (err) {
    logger("Error in storing the result");
    return Error("Enable to enter the values");
  }
};

async function getValue(sem, branch) {
  const data = await client.query(
    "select * from result where branch=$1 and sem=$2",
    [sem, branch]
  );
  console.log(data);
}

module.exports = handleResult;
