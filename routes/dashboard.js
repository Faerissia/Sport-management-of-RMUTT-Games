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
let value_m = 11;
let sport_count =[];
let display_month = [];
let monthNames = [
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

router.post("/dash-value", (req, res) => {
  display_month = [];
  value_m = req.body.value;
  console.log("Received value:", value_m);

  // let date = new Date();
  // date.setMonth(date.getMonth() - value_m);
  // //  console.log("🚀 ~ file: dashboard.js:27 ~ router.post ~ date", date)
  // // console.log(date);

  // for (let index = 0; index < value_m; index++) {
  //   let curret_date = new Date();
  //   let day = curret_date.getDate();
  //   curret_date.setMonth(curret_date.getMonth() - index);
  //   let month = curret_date.getMonth() + 1;
  //   let year = curret_date.getFullYear();
  //   // console.log("🚀 ~ file: dashboard.js:41 ~ router.post ~ year", year)
  //   // console.log("🚀 ~ file: dashboard.js:40 ~ router.post ~ month", month)
  //   // console.log("🚀 ~ file: dashboard.js:38 ~ router.post ~ day", day)

  //   // math date
  //   let result_date = `${year}-${month <= 9 ? "0" + month : month}-${
  //     day <= 9 ? "0" + day : day
  //   }`;
  //   //for sql
  //   let single_quote = "'";
  //   let result_date1 = single_quote + result_date + single_quote;

  //   console.log(
  //     "🚀 ~ file: dashboard.js:81 ~ router.post ~ result_date",
  //     result_date
  //   );
  //   console.log(
  //     "🚀 ~ file: dashboard.js:82 ~ router.post ~ result_date1",
  //     result_date1
  //   );

  //   dbConnection.query(
  //     "SELECT tnmName,  tnmEnddate ,sportID FROM tournament WHERE MONTH(tnmEnddate) = MONTH(" +
  //       result_date1 +
  //       ") AND tnmEnddate BETWEEN DATE_SUB(NOW(), INTERVAL " +
  //       value_m +
  //       " MONTH) AND NOW();",
  //     (err, rows) => {
  //       console.log(
  //         "\n\n🚀 ~ file: dashboard.js:40 ~ router.post ~ month",
  //         month
  //       );
  //       const result_f = monthNames[month - 1];
  //       console.log(
  //         "🚀 ~ file: dashboard.js:59 ~ router.post ~ result_f",
  //         result_f
  //       );
  //       console.log(
  //         "🚀 ~ file: dashboard.js:87 ~ router.post ~ result_date1",
  //         result_date1
  //       );
  //       // console.table(rows);

  //       // dbConnection.destroy
  //       display_month.push({
  //         month: monthNames[month - 1],
  //         result_cout: rows.length,
  //         sport: rows.sportID,
  //       });

  //       // console.table( display_month)
  //     }
  //   );
  // }
  res.redirect("/dashboard");
});

router.get("/", (req, res, err) => {
  if (req.session.loggedin) {
    if (role === "เจ้าหน้าที่") {
      display_month = [];
      let single_quote = "'";

      let date = new Date();
      date.setMonth(date.getMonth() - value_m);

      // console.log(date);
   

      for (let index = 0; index < value_m; index++) {
        let curret_date = new Date();
        let day = curret_date.getDate();
        curret_date.setMonth(curret_date.getMonth() - index);
        let month = curret_date.getMonth() + 1;
        let year = curret_date.getFullYear();

        // math date
        let result_date = `${year}-${month <= 9 ? "0" + month : month}-${
          day <= 9 ? "0" + day : day
        }`;
        //for sql
        let result_date1 = single_quote + result_date + single_quote;

        
        
        
        dbConnection.query(
          "SELECT tnmName,  tnmEnddate ,sportID FROM tournament WHERE MONTH(tnmEnddate) = MONTH(" +
            result_date1 +
            ") AND tnmEnddate BETWEEN DATE_SUB(NOW(), INTERVAL " +
            value_m +
            " MONTH) AND NOW();",
          (err, rows) => {
            const result_f = monthNames[month - 1];
           

            display_month.push({
              month: monthNames[month - 1] + ` ` + `${year}`,
              result_cout: rows.length,
              sport: rows.sportID,
            });
          }
        );
      }


      if (value_m === 11) {
        let curret_date = new Date();
        let day = curret_date.getDate();
        curret_date.setMonth(curret_date.getMonth() - 12);
        let month = curret_date.getMonth() + 1;
        let year = curret_date.getFullYear();

        // math date
        let result_date = `${year}-${month <= 9 ? "0" + month : month}-${
          day <= 9 ? "0" + day : day
        }`;
        //for sql
        let result_date1 = single_quote + result_date + single_quote;
        
        dbConnection.query(
          "SELECT tnmName, DATE_FORMAT(tnmEnddate, '%Y-%m-%d') as EndDate, sportID FROM tournament WHERE MONTH(tnmEnddate) = MONTH("+result_date1+")AND tnmEnddate BETWEEN DATE_SUB(NOW(), INTERVAL 12 MONTH) AND NOW()AND YEAR(tnmEnddate) != YEAR(NOW())",
          (err, rows) => {
            display_month.push({
              month: monthNames[month - 1]+ ` ` + `${year}`,
              result_cout: rows.length,
              sport: rows.sportID,

            });
          }
        );
      }
    

      // let default_month = [];
      // if (display_month.length === 0) {
      //   console.log("\nว่างงงงงงงงงงงงงงงงงงง- -------------------------------------------------------------------------\n"  );
      //   var currentDate = new Date();
      //   var currentMonth = currentDate.getMonth();

      //   for (var i = 0; i < 12; i++) {
      //       let monthIndex = (currentMonth + 12 - i) % 12;
      //       let monthName = monthNames[monthIndex];
      //       console.log(monthName);
      //       display_month.push({
      //         month: monthName,
      //         result_cout: rows.length,
      //         sport: rows.sportID,
      //       });
      //   }
      // }

      dbConnection.query(
        "SELECT sportID, COUNT(sportID) as count_sportID FROM tournament WHERE tnmStartdate and tnmEnddate and Rstartdate and Renddate >= DATE_SUB(NOW(), INTERVAL " +
          value_m +
          " MONTH) GROUP BY sportID; ",

        (err2, rowsport) => {
           sport_count = [];
          let test_c = [0];
          

          console.log(
            "!111-- -------------------------------------------------------------------------\n"
          );
            const testl =[];
          
          for (let index = 0; index < rowsport.length; index++) {
            
            if (rowsport[index].sportID === 1) {
              sport_count.push({
                count:rowsport[index].count_sportID
              })
            }
            if (rowsport[index].sportID === 2) {
              sport_count.push({
                count:rowsport[index].count_sportID
              })
            }
            if (rowsport[index].sportID === 3) {
              sport_count.push({
                count:rowsport[index].count_sportID
              })
            }
            if (rowsport[index].sportID === 4) {
              sport_count.push({
                count:rowsport[index].count_sportID
              })
            }
            if (rowsport[index].sportID === 5) {
              sport_count.push({
                count:rowsport[index].count_sportID
              })
            }
           
          }
          


          console.table(sport_count);
          console.log(rowsport);
          console.log("3333----------------------------------------------\n");
        }
      );
      dbConnection.query(
        "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE tnmStartdate and tnmEnddate and Rstartdate and Renddate >= DATE_SUB(NOW(), INTERVAL " +
          value_m +
          " MONTH);",
        (err, rows) => {
          console.log(
            "!222-- -------------------------------------------------------------------------\n"
          );
          console.table(rows);
          let result = [];
          let count = [];

          let count_In = 0;
          let count_Out = 0;
          let count_fin = 0;
          for (let index = 0; index < rows.length; index++) {
            let date = new Date();
            const element = rows[index];
            let RStrdate = rows[index].Rstartdate;
            let REnddate = rows[index].Renddate;
            let tnmStartdate = rows[index].tnmStartdate;
            let tnmEnddate = rows[index].tnmEnddate;
            if (date >= RStrdate && date <= REnddate    )   {
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
            }else {
              if (rows[index].st1 === null) {
                
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
              }else{
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
            // if (rows[index].st1 !== null) {
            //   count_fin++;
            // }
          }
          // console.log(display_month);
          count.push({ In: count_In, Out: count_Out, fin: count_fin });

          // console.log(result);
          console.table(result);
          // console.log(count);
          // console.table(count);

          res.render("dashboard", {
            data: rows,
            status_login: req.session.loggedin,
            user: user,
            result: result,
            count: count,
            display_month,
            value_m,
            sport_count
          });
        }
      );
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
