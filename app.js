const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
let bodyParser=require("body-parser");
let flash = require('express-flash');
const dbConnection = require('./util/db');
const session = require('express-session');

//routes variable
const dashboard = require('./routes/dashboard');
const account = require('./routes/account');
const uni = require('./routes/uni');
const faculty = require('./routes/faculty');
const sport = require('./routes/sport');
const place = require('./routes/place');
const tournament = require('./routes/tournament');
const tnmcheck = require('./routes/tnmcheck');
const tnmsetdp = require('./routes/tnmsetdp');
const tnmsave = require('./routes/tnmsave');
const uindex = require('./routes/userside/uindex');


global.status_login;
global.role;
global.user;
var auth;

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"assets")))

app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());

app.get('/login',(req, res) => {
    res.render('login',{status_login: req.session.loggedin});
})


app.post('/login', (req, res) => {
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
          auth = req.session.loggedin;
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
});

app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('login');
  })
})


app.use('/',uindex);

//routes
app.use('/dashboard', dashboard);
app.use('/account', account);
app.use('/uni', uni);
app.use('/faculty',faculty);
app.use('/sport',sport);
app.use('/place',place);
app.use('/tournament', tournament);
app.use('/tnmcheck',tnmcheck);
app.use('/tnmsetdp',tnmsetdp);
app.use('/tnmsave',tnmsave);


//Middleware
app.listen(3000)