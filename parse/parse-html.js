const HTMLparser = require("node-html-parser");
const logger = require("./../utils/error-logger");

const get = require("./get-html");

const parseHTML = async htmlString => {
  try {
    // First, getting the html
    if (!htmlString) {
      return {
        status: 404,
        message: "Please provide the html string"
      };
    }

    const root = await HTMLparser.parse(htmlString);

    return root;
  } catch (err) {
    logger(err.message);
    return {
      status: 400,
      message: "Something went wrong"
    };
  }
};

module.exports = {
  parseHTML
};
