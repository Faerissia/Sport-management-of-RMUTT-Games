const express = require("express");
const routes = require("./routes");
const http = require("http");
const path = require("path");
const session = require("express-session");
const app = express();
const mysql = require("mysql");
let bodyParser = require("body-parser");
let flash = require("express-flash");
const dbConnection = require("./util/db");

//routes variable
const account = require("./routes/account");
const uni = require("./routes/uni");
const faculty = require("./routes/faculty");
const sport = require("./routes/sport");
const place = require("./routes/place");
const tournament = require("./routes/tournament");

// all environments
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "assets")));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "secret",
    resave: "true",
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

// gobla variable
let status_login;
var User_name;
let name_log;

app.get("/login", (req, res) => {
  if (req.session.loggedin) {
    res.render("dashboard.ejs", {
      status_login: req.session.loggedin,
      User_name: req.body.name,
    });
  } else {
    res.render("login.ejs", { status_login: req.session.loggedin });
  }
});

app.post("/login", function (req, res) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  console.log(name);
  if (email && password) {
    dbConnection.query(
      "SELECT * FROM account WHERE email = ? AND password = ?",
      [email, password],
      function (err, results) {
        // console.log(email);
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          req.session.name = name;
      

          //response.redirect('/home');
          res.redirect("/dashboard");
        } else {
          res.send("Please login to view this page!");
        }
        res.end();
      }
    );
  }
});

app.get("/dashboard", (req, res) => {
  let s = bodyParser.json;
  var name_log = req.session.name;
  console.log("log 2=" + name_log);
  console.log("name v1=" + req.body);
  console.log("name v2=" + req.session.user);
  console.log("name v3=" + req.body.name);
  console.log("name v4=" + s);
  if (req.session.loggedin) {
    res.render("dashboard.ejs", { status_login: req.session.loggedin });
  } else {
    res.render("login.ejs", { status_login: req.session.loggedin });
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("login");
  });
});

//routes
app.use("/account", account);
app.use("/uni", uni);
app.use("/faculty", faculty);
app.use("/sport", sport);
app.use("/place", place);
app.use("/tournament", tournament);

//Middleware

app.listen(3000, () => {
  console.log("Openlink with http://localhost:3000/login");
});
