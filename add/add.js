const client = require("./../db/index").client;
const error = require("./../utils/errors");
const logger = require("./../utils/error-logger");
const Joi = require("@hapi/joi");
const constants = require("./../utils/constants.js");

const handleAdd = async ctx => {
  try {
    const { name, email, sem, branch } = JSON.parse(ctx.request.body);
    // console.log(name, email, sem, branch);
    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .max(100)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      sem: Joi.string().required(),
      branch: Joi.string().required()
    });
    const validation = schema.validate({
      name,
      email,
      sem,
      branch
    });
    if (!validation.error) {
      // Now, just saving the data

      const query =
        "INSERT into subscribers(name, email, sem, branch) values ($1, $2, $3, $4)";
      const params = [name, email, sem, branch];
      const response = await client.query(query, params);
      // console.log(response);
      ctx.body = {
        status: 200,
        message: "Entry added successfully"
      };
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
    message = "something went wrong";

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
