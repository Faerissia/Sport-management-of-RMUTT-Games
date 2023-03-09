const mysql = require('mysql');

let dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'thesis'
  });

  dbConnection.connect( (error)=>{
    if(error) {
      console.log(error)
    }else{
      console.log("SUCCESS MYSQL CONNECT!")
    }
  })

module.exports = dbConnection;