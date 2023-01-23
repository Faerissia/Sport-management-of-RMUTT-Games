const express = require('express');
const path = require('path');
const app = express();
let bodyParser=require("body-parser");
let flash = require('express-flash');
const dbConnection = require('./util/db');
const session = require('express-session');
const fs = require('fs');

//routes variable
const dashboard = require('./routes/dashboard');
const account = require('./routes/account');
const uni = require('./routes/uni');
const faculty = require('./routes/faculty');
const sport = require('./routes/sport');
const place = require('./routes/place');
const tournament = require('./routes/tournament');
const tnmsearch = require('./routes/tnmsearch');
const tnmcheck = require('./routes/tnmcheck');
const tnmsetdp = require('./routes/tnmsetdp');
const tnmsave = require('./routes/tnmsave');
const uindex = require('./routes/userside/uindex');
const fileUpload = require('express-fileupload');
const placetable = require('./routes/placetable');

global.status_login;
global.role;
global.user;

global.tournamentName;

// all environments
  const title = fs.readFileSync(path.join(__dirname,'title.txt'), 'utf-8');
  process.title = title;

app.use(fileUpload());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"assets")))
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}))


app.post('/change-title', function(req, res) {
  process.title = req.body.title;
  fs.writeFileSync(path.join(__dirname, 'title.txt'), process.title);
  res.redirect('/dashboard');
});

app.get('/login',(req, res) => {
  if (req.session.loggedin) {
    res.redirect('dashboard');
  } else {
    res.render('login',{status_login: req.session.loggedin});
  }
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
          var active = results[0].status;
          role = results[0].level;
          if(active === 'ใช้งาน'){
          req.session.loggedin = true;
          req.session.email = email;
          req.session.password = password;
          user = results[0].name + " " + results[0].lname;
          console.log(role)
              res.redirect("/dashboard");
          }else{
            req.flash('error','กรุณาติดต่อผู้ดูแลระบบ!')
          res.redirect('login');
          }
        }else{
          req.flash('error','email หรือ password ไม่ถูกต้อง!')
          res.redirect('login');
        }
      }
    );
  }else {
    req.flash('error','กรุณากรอกข้อมูลให้ครบถ้วน!')
    res.redirect('login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('login');
  })
})

app.use(bodyParser. text({type: '/'}));

app.get('/error404', (req, res) => {
    res.render('error',{status_login: req.session.loggedin});
})

app.use('/',uindex);

//routes
app.use('/account', account);
app.use('/dashboard', dashboard);
app.use('/uni', uni);
app.use('/faculty',faculty);
app.use('/sport',sport);
app.use('/place',place);
app.use('/tnmsearch',tnmsearch);
app.use('/tournament', tournament);
app.use('/tnmcheck',tnmcheck);
app.use('/tnmsetdp',tnmsetdp);
app.use('/tnmsave',tnmsave);
app.use('/placetable',placetable);





//Middleware
app.listen(3000)