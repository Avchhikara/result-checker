const client = require("./connection");
const logger = require("./../utils/error-logger");

const handleLoad = async ctx => {
  //   const html = await parse.html("https://www.dcrustedp.in/show_chart.php");
  try {
    const parse = require("./../parse/index.js");
    const htmlString = await parse.get(
      "https://www.dcrustedp.in/show_chart.php"
    );
    const root = await parse.parse(htmlString);
    const tr = root.querySelectorAll("tr");
    // console.log(tr);
    let child = "";
    for (let row of tr) {
      child = row.childNodes;
      if (child.length === 17) {
        // console.log(child[1].innerHTML);
        await client.query("INSERT INTO branch(name) values ($1)", [
          child[1].innerHTML
        ]);
      }
    }
    //   console.log(table);

    ctx.body = {
      status: 200,
      message: "Loaded"
    };
  } catch (err) {
    logger("branches already exist");
    console.log(err.message);
    ctx.body = { message: "Branches already exist", status: 400 };
  }
};

module.exports = handleLoad;
