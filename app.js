const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
let bodyParser=require("body-parser");
let flash = require('express-flash');
const dbConnection = require('./util/db');
const session = require('express-session');

const authen = require('./routes/auth');

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


app.post('/login',authen, (req, res) => {
  
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