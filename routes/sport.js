let express = require("express");
let router = express.Router();
let dbConnection = require("../util/db");

// display sport page
router.get("/", (req, res, next) => {
  dbConnection.query(
    "SELECT * FROM sport ORDER BY sportID asc",
    (err, rows) => {
      if (req.session.loggedin) {
        if (role === "เจ้าหน้าที่") {
          res.render("sport", {
            data: rows,
            status_login: req.session.loggedin,
            user: user,
          });
        } else {
          req.flash("error", "ไม่สามารถเข้าถึงได้");
          res.redirect("login");
        }
      } else {
        res.redirect("error404");
      }
    }
  );
});

//display add sport page
router.get("/add", (req, res, next) => {
  if (req.session.loggedin) {
    if (role === "เจ้าหน้าที่") {
      res.render("sport/add", {
        sportName: "",
        sportPlaynum: "",
        type: "",
        status_login: req.session.loggedin,
        user: user,
      });
    } else {
      req.flash("error", "ไม่สามารถเข้าถึงได้");
      res.redirect("login");
    }
  } else {
    res.redirect("error404");
  }
});

// add new sport
router.post("/add", (req, res, next) => {
  let sportName = req.body.sportName;
  let sportPlaynum = req.body.sportPlaynum;
  let type = req.body.type;
  let errors = false;

  if (sportName.length === 0) {
    errors = true;
    //set flash message
    req.flash("error", "โปรดกรอก");
    //render to add.ejs with flash message
    res.render("sport/add", {
      sportName: sportName,
      sportPlaynum: sportPlaynum,
      type: type,
      status_login: req.session.loggedin,
    });
  }

  // if no error
  if (!errors) {
    let form_data = {
      sportName: sportName,
      sportPlaynum: sportPlaynum,
      type: type,
    };
    // insert query db
    dbConnection.query("INSERT INTO sport SET ?", form_data, (err, result) => {
      if (err) {
        req.flash("error", err);

        res.render("sport/add", {
          sportName: form_data.sportName,
          sportPlaynum: form_data.sportPlaynum,
          type: form_data.type,
          status_login: req.session.loggedin,
        });
      } else {
        req.flash("success", "sport successfully added");
        res.redirect("/sport");
      }
    });
  }
});

// display edit book page
router.get("/edit/(:sportID)", (req, res, next) => {
  let sportID = req.params.sportID;
  dbConnection.query(
    "SELECT * FROM sport WHERE sportID = " + sportID,
    (err, rows, fields) => {
      if (role === "เจ้าหน้าที่") {
        if (rows.length <= 0) {
          req.flash("error", "Book not found with id = " + sportID);
          res.redirect("/sport");
        } else {
          res.render("sport/edit", {
            title: "แก้ไข กีฬา",
            sportID: rows[0].sportID,
            sportName: rows[0].sportName,
            sportPlaynum: rows[0].sportPlaynum,
            type: rows[0].type,
            status_login: req.session.loggedin,
            user: user,
          });
        }
      } else {
        req.flash("error", "ไม่สามารถเข้าถึงได้");
        res.redirect("login");
      }
    }
  );
});

// update book page
router.post("/update/:sportID", (req, res, next) => {
  let sportID = req.params.sportID;
  let sportName = req.body.sportName;
  let sportPlaynum = req.body.sportPlaynum;
  let type = req.body.type;
  let errors = false;

  if (sportName.length === 0) {
    errors = true;
    req.flash("error", "Please enter name and author");
    res.render("sport/edit", {
      sportID: req.params.sportID,
      sportName: sportName,
      sportPlaynum: sportPlaynum,
      type: type,
    });
  }
  // if no error
  if (!errors) {
    let form_data = {
      sportName: sportName,
      sportPlaynum: sportPlaynum,
      type: type,
    };
    // update query
    dbConnection.query(
      "UPDATE sport SET ? WHERE sportID = " + sportID,
      form_data,
      (err, result) => {
        if (err) {
          req.flash("error", err);
          res.render("sport/edit", {
            sportID: req.params.sportID,
            sportName: form_data.sportName,
            sportPlaynum: form_data.sportPlaynum,
            type: form_data.type,
          });
        } else {
          req.flash("success", "sport successfully updated");
          res.redirect("/sport");
        }
      }
    );
  }
});

// delete sport
router.get("/delete/(:sportID)", (req, res, next) => {
  let sportID = req.params.sportID;

  dbConnection.query(
    "DELETE FROM sport WHERE sportID = " + sportID,
    (err, result) => {
      if (err) {
        req.flash("error", err), res.redirect("/sport");
      } else {
        req.flash("success", "sport successfully deleted! ID = " + sportID);
        res.redirect("/sport");
      }
    }
  );
});

module.exports = router;
