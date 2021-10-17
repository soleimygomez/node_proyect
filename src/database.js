const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "simulador_credito",
});

// console.log(connection);

connection.connect(function (err) {
  if (err) {
   console.log(err.message);
    ///console.log(err);
    return err;
  } else {
    console.log("Db is Connected");
  }
});

module.exports = connection;
