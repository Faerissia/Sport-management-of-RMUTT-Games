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
const { log, profile } = require("console");

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
var profile_user;
var User;

app.get("/login", (req, res) => {
  if (req.session.loggedin) {
    res.render("dashboard.ejs", {
      status_login: req.session.loggedin,
      User: User,
    });
  } else {
    res.render("login.ejs", {
      status_login: req.session.loggedin,
      User: User,
    });
  }
});

app.post("/login", function (req, res) {
  console.log(req.body);
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
          const query =
            "SELECT * FROM `account` WHERE email = '" +
            email +
            "' AND password = '" +
            password +
            "'";
          dbConnection.query(query, (error, results) => {
            if (error) throw error;
            profile_user = results[0];
            User = results[0].name + " " + results[0].lname;
          });
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
  if (req.session.loggedin) {
    res.render("dashboard.ejs", {
      status_login: req.session.loggedin,
      User: User,
      data:profile_user
    });
  } else {
    res.render("login.ejs", { status_login: req.session.loggedin, User: User });
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


app.get("/", (req, res) => {
 
    res.render("framework", {
      status_login: req.session.loggedin,
      User: User,
    });
  
});
