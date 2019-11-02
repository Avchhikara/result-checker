const logger = (err = "") => {
  // This will send the email to me whenever an error is occurred
  console.log(err || "unknown error has occurred");
};

module.exports = logger;
