const mysql = require('mysql');

let dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'thesis'
  });

module.exports = dbConnection;