const axios = require("axios");
const https = require("https");
const constants = require("./constants");

const unsafe = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  timeout: 5000
});

const instance = axios.create({
  timeout: 5000
});

const emailer = axios.create({
  timeout: 5000,
  baseURL: constants.emailer,
  headers: { key: process.env.emailer || require("./../private").emailer }
});

module.exports = {
  unsafe,
  instance,
  emailer
};
