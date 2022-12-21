const express = require('express');
const routes = require('./routes');
const http = require('http');
const path = require('path');
const session = require('express-session');
const app = express();
const mysql = require('mysql');
let bodyParser=require("body-parser");
let flash = require('express-flash');
const dbConnection = require('./util/db');

//routes variable
const account = require('./routes/account')
const uni = require('./routes/uni');
const faculty = require('./routes/faculty');
const sport = require('./routes/sport');
const place = require('./routes/place');
const tournament = require('./routes/tournament');

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"assets")))

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'secret',
              resave: 'true',
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
app.use(flash());


app.get('/login',(req, res) => {
  if(req.session.loggedin){
    res.render('dashboard.ejs');
  }else{
  res.render('login.ejs');
  }
})

app.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (email && password) {
      dbConnection.query(
          "SELECT * FROM account WHERE email = ? AND password = ?",
          [email, password],
          function (err, results,) {
              // console.log(email);
              if (results.length > 0) {
                  req.session.loggedin = true;
                  req.session.email = email;
                  //response.redirect('/home');
                  res.redirect('/dashboard');
              } else {
                  res.send("Please login to view this page!");
              }
              res.end();
          });
  }
})

app.get('/dashboard',(req, res) => {
  if(req.session.loggedin){
    res.render('dashboard.ejs');
  }else{
  res.render('login.ejs');
  }
})

app.get('/logout',function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('login');
  })
})


//routes
app.use('/account', account);
app.use('/uni', uni);
app.use('/faculty',faculty);
app.use('/sport',sport);
app.use('/place',place);
app.use('/tournament', tournament);

//Middleware
app.listen(3000)
