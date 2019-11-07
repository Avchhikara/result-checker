const get = require("./get-html").html;
const parse = require("./parse-html").parseHTML;
const structurize = require("./structurize");
const logger = require("./../utils/error-logger");
const db = require("./../db/index");

const handler = async (url = "https://www.dcrustedp.in/show_chart.php") => {
  try {
    const htmlString = await get(url);
    const root = await parse(htmlString);
    const doc = await structurize(root);
    db.result(doc);
    // Now, storing the values in db

    return doc;
  } catch (err) {
    logger("Error in parse handler \n" + err.message, 100);
    return {
      status: 400,
      message: "Unknown error has occurred"
    };
  }
};

module.exports = handler;
