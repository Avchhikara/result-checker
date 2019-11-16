const get = require("./get-html").html;
const parse = require("./parse-html").parseHTML;
const structurize = require("./structurize");
const logger = require("./../utils/error-logger");
const db = require("./../db/index");
const getYear = require("./../utils/getYear");
const mail = require("./../utils/send-mail");
const template = require("./../utils/constants").templates;

const handler = async (url = "https://www.dcrustedp.in/show_chart.php") => {
  try {
    const htmlString = await get(url);
    const root = await parse(htmlString);
    const doc = await structurize(root);
    // Handling the version in db
    const result_out = await db.result(doc);
    if (result_out.length) {
      let sem_branch = result_out.map(res => ({
        sem: res.sem,
        branch: res.branch,
        year: getYear(res.sem) // This getYear function will get the admisison year as per the sem whose result is out
      }));
      // console.log(sem_result_out);
      const subs = await db.get(sem_branch);

      // Now, just write a script to send emails
      // Here 👇

      // console.log(subs);
      for (let sem in subs) {
        for (let subsciber of subs[sem]) {
          const data = mail({
            to: subsciber.email,
            from: "no-reply@result-notif.herokuapp.com",
            fromName: "Admin",
            subject: "Result release update",
            html: template.result.replace("userName", subsciber.name)
          });
        }
      }
    } else {
      // Do nothing
      console.log("No new result");
    }
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
