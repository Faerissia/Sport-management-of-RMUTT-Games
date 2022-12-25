let express = require("express");
let router = express.Router();
let dbConnection = require("../util/db");
const fileUpload = require("express-fileupload");
let User;
router.use(fileUpload());

// display tournament page
router.get("/", (req, res, next) => {
  dbConnection.query(
    "SELECT t.tnmID, t.tnmName,s.sportName,t.tnmStartdate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID",
    (err, rows) => {
      if (err) {
        req.flash("error", err);
        res.render("tournament", {
          data: "",
          status_login: req.session.loggedin,
          User: User,
        });
      } else {
        res.render("tournament", {
          data: rows,
          status_login: req.session.loggedin,
          User: User,
        });
      }
    }
  );
});

//display add tournament page
router.get("/add", (req, res, next) => {
  dbConnection.query(
    "SELECT sportID,sportName FROM sport ORDER BY sportID asc",
    (err, rows) => {
      if (err) {
        req.flash("error", err);
        res.render("tournament/add", {
          data: "",
          status_login: req.session.loggedin,
          User: User,
        });
      } else {
        res.render("tournament/add", {
          data: rows,
          tnmName: "",
          sportID: "",
          tnmUrl: "",
          tnmDetail: "",
          tnmPicture: "",
          status_login: req.session.loggedin,
          User: User,
        });
      }
    }
  );
});

// add new tournament
router.post("/add", (req, res, next) => {
  let tnmName = req.body.tnmName;
  let sportID = req.body.sportID;
  let tnmUrl = req.body.tnmUrl;
  let tnmDetail = req.body.tnmDetail;

  let errors = false;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let tnmPicture = req.files.tnmPicture;
  let tnmFile1 = req.files.tnmFile1;
  tnmPicture.mv("./assets/" + tnmPicture.name);
  tnmFile1.mv("./assets/" + tnmFile1.name);

  if (tnmName.length === 0) {
    errors = true;
    //set flash message
    req.flash("error", "โปรดกรอก");
    //render to add.ejs with flash message
    res.render("tournament/add", {
      tnmName: tnmName,
      sportID: sportID,
      tnmUrl: tnmUrl,
      tnmDetail: tnmDetail,
      tnmPicture: tnmPicture,
      tnmFile1: tnmFile1,
      status_login: req.session.loggedin,
      User: User,
    });
  }
  // if no error
  if (!errors) {
    let form_data = {
      tnmName: tnmName,
      sportID: sportID,
      tnmUrl: tnmUrl,
      tnmDetail: tnmDetail,
      tnmPicture: tnmPicture.name,
      tnmFile1: tnmFile1.name,
    };
    // insert query db
    dbConnection.query(
      "INSERT INTO tournament SET ?",
      form_data,
      (err, result) => {
        if (err) {
          req.flash("error", err);

          res.render("tournament/add", {
            tnmName: form_data.tnmName,
            sportID: form_data.sportID,
            tnmUrl: form_data.tnmUrl,
            tnmDetail: form_data.tnmDetail,
            tnmPicture: form_data.tnmPicture,
            tnmFile1: form_data.tnmFile1,
            status_login: req.session.loggedin,
            User: User,
          });
        } else {
          req.flash("success", "tournament successfully added");
          res.redirect("/tournament");
        }
      }
    );
  }
});

// display edit tournament page
router.get("/edit/(:tnmID)", (req, res, next) => {
  let tnmID = req.params.tnmID;

  dbConnection.query(
    "SELECT * FROM tournament WHERE tnmID = " + tnmID,
    (err, rows, fields) => {
      if (rows.length <= 0) {
        req.flash("error", "tournament not found with id = " + tnmID);
        res.redirect("/tournament");
      } else {
        res.render("tournament/edit", {
          title: "แก้ไข การแข่งขัน",
          tnmID: rows[0].tnmID,
          tnmName: rows[0].tnmName,
          tournamentPlaynum: rows[0].tournamentPlaynum,
          type: rows[0].type,
          status_login: req.session.loggedin,
          User: User,
        });
      }
    }
  );
});

// update book page
router.post("/update/:tournamentID", (req, res, next) => {
  let tournamentID = req.params.tournamentID;
  let tournamentName = req.body.tournamentName;
  let tournamentPlaynum = req.body.tournamentPlaynum;
  let type = req.body.type;
  let errors = false;

  if (tournamentName.length === 0) {
    errors = true;
    req.flash("error", "Please enter name and author");
    res.render("tournament/edit", {
      tournamentID: req.params.tournamentID,
      tournamentName: tournamentName,
      tournamentPlaynum: tournamentPlaynum,
      type: type,
      status_login: req.session.loggedin,
      User: User,
    });
  }
  // if no error
  if (!errors) {
    let form_data = {
      tournamentName: tournamentName,
      tournamentPlaynum: tournamentPlaynum,
      type: type,
    };
    // update query
    dbConnection.query(
      "UPDATE tournament SET ? WHERE tournamentID = " + tournamentID,
      form_data,
      (err, result) => {
        if (err) {
          req.flash("error", err);
          res.render("tournament/edit", {
            tournamentID: req.params.tournamentID,
            tournamentName: form_data.tournamentName,
            tournamentPlaynum: form_data.tournamentPlaynum,
            type: form_data.type,
            status_login: req.session.loggedin,
            User: User,
          });
        } else {
          req.flash("success", "tournament successfully updated");
          res.redirect("/tournament");
        }
      }
    );
  }
});

// delete tournament
router.get("/delete/(:tnmID)", (req, res, next) => {
  let tnmID = req.params.tnmID;

  dbConnection.query(
    "DELETE FROM tournament WHERE tnmID = " + tnmID,
    (err, result) => {
      if (err) {
        req.flash("error", err), res.redirect("/tournament");
      } else {
        req.flash("success", "tournament successfully deleted! ID = " + tnmID);
        res.redirect("/tournament");
      }
    }
  );
});

module.exports = router;
