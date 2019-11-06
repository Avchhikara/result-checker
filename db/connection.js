const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "avnish",
  password: "",
  database: "result-checker",
  ssl: false
});

client.connect(err => {
  // console.log(err.message);
  if (err) throw Error("Error in connecting to PostgreSQL database");
});

module.exports = client;
