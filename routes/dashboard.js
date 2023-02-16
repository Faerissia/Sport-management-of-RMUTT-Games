let express = require("express");
let router = express.Router();
let dbConnection = require("../util/db");

// display tnmcheck page

/* --------------------------------- old ver -------------------------------- */
// router.get('/', (req, res, err) => {
//     if(req.session.loggedin){
//             res.render('dashboard', {
//                 status_login: req.session.loggedin,process,user: user,role: role  });
//             }else{
//                 res.redirect('error404');
//             }
//             })
// January, February, March, April, May, June, July, August, September, October, November, December

let date_S = new Date();
date_S.setFullYear(date_S.getFullYear() - 1);
let date_E = new Date();

// let date_S =0;
// let date_E =0;

let date_select = [];

let diffInDays = 0;

let sport_count = [];
let display_month = [];
let single_quote = "'";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/* -------------------------------- test days ------------------------------- */
router.post("/value_date", (req, res) => {
  display_month = [];
  date_select = [];
  date_S = new Date(req.body.value_startdate);
  date_E = new Date(req.body.value_enddate);
  console.log("Received startdate:", date_S);
  console.log("Received enddate:", date_E);
  // Calculate the difference in milliseconds
  // const diffInMs = date_E.getTime() - date_S.getTime();
  // // Convert milliseconds to days
  // diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  // // Output the result
  // console.log(
  //   `The number of days between ${date_S.toDateString()} and ${date_E.toDateString()} is ${diffInDays} days.`
  // );
  // console.log(
  //   "🚀 ~ file: dashboard.js:76 ~ router.post ~ diffInDays",
  //   diffInDays
  // );

  date_select.push({
    date_S: formatDate(date_S),
    date_E: formatDate(date_E),
  });
  // console.table(date_select);

  res.redirect("/dashboard");
});

/* ------------------------------- test month ------------------------------- */

router.get("/", (req, res, err) => {
  if (req.session.loggedin) {
    if (role === "เจ้าหน้าที่") {
      let selcetsport = [];

      /* -------------------------- sql for selcet sport -------------------------- */
      dbConnection.query(
        "SELECT sportID,sportName FROM sport ORDER BY sportID asc",
        (err, selcetsport1) => {
          selcetsport = selcetsport1;
        }
      );

      /* ------------------------------ zone chart_1 ------------------------------ */

      /* -------------------------- sql default call all -------------------------- */
      const sql_default_1 =
        "SELECT tnmName,  tnmEnddate ,sportID FROM tournament";

      /* ------------------------------- sql fillter ------------------------------ */
      const sql_1 =
        "SELECT LEFT(MONTHNAME(tnmEnddate), 3) AS Month, COUNT(tnmEnddate) AS Count FROM tournament WHERE tnmEnddate BETWEEN " +
        single_quote +
        formatDate(date_S) +
        single_quote +
        " AND " +
        single_quote +
        formatDate(date_E) +
        single_quote +
        "  GROUP BY  Month ORDER BY Month ";

      dbConnection.query(sql_1, (err, rows) => {
        if (err) {
          console.log(
            "=========================================================================="
          );
          console.log(err);
        }
        // console.log(rows);

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const counts = {};

        monthNames.forEach((month) => {
          counts[month] = 0;
        });

        rows.forEach((rows) => {
          counts[rows.Month] = rows.Count;
        });

        const count = Object.entries(counts).map(([month, value]) => {
          return { month, value };
        });

        display_month = count;
      });
      /* ------------------------------- zone sport ------------------------------- */
      dbConnection.query(
        "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmEnddate BETWEEN " +
          single_quote +
          formatDate(date_S) +
          single_quote +
          " AND " +
          single_quote +
          formatDate(date_E) +
          single_quote +
          " GROUP BY t.sportID;",

        (err2, rowsport) => {
          sport_count = [];

          sport_count = rowsport;
          /* --------------------------------- out db --------------------------------- */
        }
      );

      /* -------------------------------- zone card ------------------------------- */

      /* -------------------------- sql default call all -------------------------- */
      const sql_default_3 =
        "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament";

      /* ------------------------------- sql fillter ------------------------------ */
      const sql_filter_3 =
        "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE Rstartdate AND Renddate BETWEEN " +
        single_quote +
        formatDate(date_S) +
        single_quote +
        " AND " +
        single_quote +
        formatDate(date_E) +
        single_quote +
        " ";

      // let sql_3;
      // // if (diffInDays === 0) {
      // //   sql_3 = sql_default_3;
      // //   // console.log("ค่า 0");
      // // } else {
      // //   sql_3 = sql_filter_3;
      // //   // console.log("ค่าไม่ 0");
      // // }
      let result = [];
      let count = [];

      let count_In = 0;
      let count_Out = 0;
      let count_fin = 0;
      let date = new Date();

      dbConnection.query(sql_filter_3, (err, rows) => {
        console.table(rows);

        for (let index = 0; index < rows.length; index++) {
          var RStrdate = rows[index].Rstartdate;
          var REnddate = rows[index].Renddate;
          var tnmStartdate = rows[index].tnmStartdate;
          var tnmEnddate = rows[index].tnmEnddate;
          if (
            date >= RStrdate &&
            date <= REnddate &&
            rows[index].st1 === null
          ) {
            count_Out++;
            result.push({
              Datamath: index,
              chackdate: "InRis",
              tnmID: rows[index].tnmID,
              sportID: rows[index].sportID,
              Rstartdate: rows[index].Rstartdate,
              Renddate: rows[index].Renddate,
              tnmStartdate: rows[index].tnmStartdate,
              tnmEnddate: rows[index].tnmEnddate,
              rank: rows[index].st1,
            });
          } else {
            if (
              date >= tnmStartdate &&
              date <= tnmEnddate &&
              rows[index].st1 === null
            ) {
              count_In++;
              result.push({
                Datamath: index,
                chackdate: "PlayOut",
                tnmID: rows[index].tnmID,
                sportID: rows[index].sportID,
                Rstartdate: rows[index].Rstartdate,
                Renddate: rows[index].Renddate,
                tnmStartdate: rows[index].tnmStartdate,
                tnmEnddate: rows[index].tnmEnddate,
                rank: rows[index].st1,
              });
            } else {
              if (rows[index].st1 !== null) {
                count_fin++;
                result.push({
                  Datamath: index,
                  chackdate: "fins",
                  tnmID: rows[index].tnmID,
                  sportID: rows[index].sportID,
                  Rstartdate: rows[index].Rstartdate,
                  Renddate: rows[index].Renddate,
                  tnmStartdate: rows[index].tnmStartdate,
                  tnmEnddate: rows[index].tnmEnddate,
                  rank: rows[index].st1,
                });
              }
            }
          }
        }

        count.push({ In: count_In, Out: count_Out, fin: count_fin });
  
        console.table(result);
  
        /* -------------------------------- zone card ------------------------------- */
        res.render("dashboard", {
          // data: rows,
          status_login: req.session.loggedin,
          user: user,
          result: result,
          count: count,
          display_month,
          selcetsport,
          sport_count,
          date_select,
        });
        display_month = [];
        date_select = [];
        sport_count = [];
        count = [];
      });










      
    } else {
      req.flash("error", "ไม่สามารถเข้าถึงได้");
      res.redirect("login");
    }
  } else {
    res.redirect("error404");
  }
});

router.get("/edit", (req, res, err) => {
  if (req.session.loggedin) {
    res.render("titleedit", {
      status_login: req.session.loggedin,
      process,
      user: user,
      role: role,
    });
  } else {
    res.redirect("error404");
  }
});

module.exports = router;
function newFunction() {
  display_month = [];
}
