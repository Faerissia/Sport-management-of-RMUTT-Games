const dbConnection = require('../util/db');
const session = require('express-session');
const express = require('express');

global.status_login;
global.role;
global.user;


function authen (req,res){
  var email = req.body.email;
  var password = req.body.password;

  if (email && password) {
    dbConnection.query(
      "SELECT * FROM account WHERE email = ? AND password = ?",
      [email, password],
      function (err, results) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          req.session.password = password;
          user = results[0].name + " " + results[0].lname;
          role = results[0].level;

          console.log(user+role);
          res.redirect("/dashboard");
        } else {
          req.flash('error','email หรือ password ไม่ถูกต้อง!')
          res.redirect('login');
        }
        res.end();
      }
    );
  }else{
    req.flash('error','กรุณากรอกข้อมูลให้ครบถ้วน!')
    res.redirect('login');
  }
};

module.exports = authen;