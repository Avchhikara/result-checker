const client = require("./../db/index").client;
const mail = require("./../utils/send-mail");
const logger = require("./../utils/error-logger");
const Joi = require("@hapi/joi");
const constants = require("./../utils/constants.js");

const handleAdd = async ctx => {
  try {
    const { name, email, admission_year, branch } = JSON.parse(
      ctx.request.body
    );

    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .max(100)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      admission_year: Joi.string().required(),
      branch: Joi.string().required()
    });
    const validation = schema.validate({
      name,
      email,
      branch,
      admission_year
    });
    if (!validation.error) {
      // Now, just saving the data

      const query =
        "INSERT into subscribers(name, email, branch, admission_year) values ($1, $2, $3, $4)";
      const params = [name, email, branch, admission_year];
      const response = await client.query(query, params);
      // console.log(response);
      ctx.body = {
        status: 200,
        message:
          "Entry added successfully, you will recieve a confirmation email shortly!!"
      };
      // Sending the email
      // mail({
      //   to: email,
      //   from: "no-reply@result-notif.herokuapp.com",
      //   fromName: "Admin",
      //   subject: "Subscription Confirmation to result notifications",
      //   html: constants.templates.subscribed
      // });

      // // Also, sending myself an email that someone has registered
      // mail({
      //   to: "avnishchhikara@outlook.com",
      //   from: "no-reply@result-notif.herokuapp.com",
      //   fromName: "Admin",
      //   subject: "We got new user 🥳",
      //   html: `<div>Hello me, <br> We have got a new user name: <strong>${name}</strong> of <strong>${admission_year}</strong> admission year</div>`
      // });
    } else {
      // console.log(validation.error);
      // ctx.body = validation.error;
      ctx.redirect(constants.baseURL + "?error=" + validation.error.message);
      // ctx.body = {
      //   status: 400,
      //   message: validation.error.message
      // };
    }
  } catch (err) {
    message =
      "something went wrong, you might check the values you have entered";

    if (err.code && err.code === "23505") {
      message = `Given email is already registered`;
    }

    logger(err.message || message);

    ctx.body = {
      status: 404,
      message
    };
  }
};

module.exports = {
  handleAdd
};
