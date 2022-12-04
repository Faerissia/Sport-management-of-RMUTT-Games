const mysql = require("mysql");
const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "thesis"
}).promise()

module.export = dbConnection;