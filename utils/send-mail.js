// This will just send the email to whoever we want
const axios = require("./axios.instance");
const send_mail = async ({ to, from, fromName, subject, html }) => {
  // console.log(to, from, fromName, subject, html);
  try {
    if (to && from && fromName && subject && html) {
      const res = await axios.emailer.post("/send", {
        to,
        from,
        fromName,
        subject,
        html
      });
    } else {
      throw Error("All the parameters haven't been provided");
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = send_mail;
