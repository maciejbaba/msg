import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "messenger",
});

connection.connect((err: Error | null) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
