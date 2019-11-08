const mail = require("./send-mail");
const constants = require("./constants");

const logger = (err = "", priority) => {
  // This will send the email to me whenever an error is occurred
  if (priority >= 10) {
    const to = {
      to: "chhikaraway@gmail.com",
      from: "support@result-notif.herokuapp.com",
      fromName: "Support",
      subject: "Error Logger | Notification 🔌",
      html: constants.templates.error.replace("errMessageString", err)
    };
    mail({ ...to })
      .then(data => console.log("mail is sent"))
      .catch(err => console.log("Error in sending mail"));

    console.log(err || "No error has been provided");
  } else console.log(err || "unknown error has occurred");
};

module.exports = logger;
