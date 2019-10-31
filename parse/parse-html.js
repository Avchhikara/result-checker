const HTMLparser = require("node-html-parser");

const get = require("./get-html");

const parseHTML = async url => {
  // First, getting the html

  const htmlString = await get.html("https://www.dcrustedp.in/show_chart.php");
  const root = await HTMLparser.parse(htmlString);

  const tr = root.querySelectorAll("tr");
  for (let row of tr) {
    console.log("Child Nodes", row.childNodes.length);
  }

  return htmlString;
};

module.exports = {
  parseHTML
};
