const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  ssl: true
});

client.connect(err => {
  // console.log(err.message);
  if (err) throw Error("Error in connecting to PostgreSQL database");
});

module.exports = client;
