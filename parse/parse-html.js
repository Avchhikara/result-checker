const HTMLparser = require("node-html-parser");
const logger = require("./../utils/error-logger");

const get = require("./get-html");

const parseHTML = async url => {
  try {
    // First, getting the html

    const htmlString = await get.html(
      "https://www.dcrustedp.in/show_chart.php"
    );
    const root = await HTMLparser.parse(htmlString);

    const tr = root.querySelectorAll("tr");
    // for (let row of tr) {
    //   console.log("Child Nodes", row.childNodes.length);
    // }

    return htmlString;
  } catch (err) {
    logger(err.message);
    return `
    <h4>The Result page of University is not working 🤔</h4>
    <p>Get back later</p>
    <p>Something serious is cooking like result 😅</p>
    `;
  }
};

module.exports = {
  parseHTML
};
