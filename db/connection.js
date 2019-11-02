const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "avnish",
  password: "",
  ssl: false
});

client.connect(err => {
  if (err) throw Error("Error in connecting to PostgreSQL database");
});

module.exports = client;
