const logger = require("./../utils/error-logger");
const client = require("./connection");

const getBranch = async ctx => {
  try {
    const { rows } = await client.query("Select name, b_id from branch");
    if (!rows.length) {
      throw Error();
    }
    // console.log(rows);
    ctx.body = {
      status: 200,
      data: rows,
      length: rows.length,
      message: "Successfully retrieved!!"
    };
  } catch (err) {
    logger(err.message || err, 10);
    ctx.body = {
      status: 400,
      message: "Some error has occurred, please contact support"
    };
  }
};

module.exports = getBranch;
