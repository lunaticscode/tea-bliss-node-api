const { DATABASE_URL } = require("../consts/config");
const mysql = require("mysql2");
const connection = mysql.createConnection(DATABASE_URL);
console.log("exec db-connection.....");

module.exports = connection;
