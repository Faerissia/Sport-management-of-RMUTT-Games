let express = require("express");
let router = express.Router();
let dbConnection = require("../util/db");

/* --------------------------- function formatDate -------------------------- */
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}




function getUpdatedDataSportName(dataSportName, sportCount) {
  const updatedDataSportName = dataSportName.map((sport) => {
    const countObj = sportCount.find((item) => item.sportID === sport.sportID);
    return {
      ...sport,
      count_sportID: countObj ? countObj.count_sportID : 0,
    };
  });

  return updatedDataSportName;
}

// let defaultdate_S = new Date();
// defaultdate_S.setFullYear(defaultdate_S.getFullYear() - 1);
// let defaultdate_E = new Date();

let defaultdate_S = new Date(new Date().getFullYear(), 0, 1);
let defaultdate_E = new Date(new Date().getFullYear(), 11, 31);

let data_sportname = [];
let value_select = [];
let sport_count = [];
let sport_count_wait = [];
let sport_count_do = [];

var success = [];
var ongoing = [];
var waiting = [];

let display_month = [];
let display_month_wait = [];
let display_month_do = [];
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

/* -------------------------------- add value_form ------------------------------- */
router.post("/value_date", (req, res) => {
  let date_S ;
  let date_E ;
  value_select = [];
  sport_count = [];
  sport_count_wait = [];
  sport_count_do = [];
  
  display_month = [];
  display_month_wait = [];
  display_month_do = [];
  // input
  date_S = new Date(req.body.value_startdate);
  date_E = new Date(req.body.value_enddate);
  let sport_input = req.body.value_sport;
  console.log("Received startdate: ", date_S);
  console.log("Received enddate: ", date_E);
  console.log("Received sport: ", sport_input);

  if (!req.body.value_startdate && !req.body.value_enddate) {
    date_S = defaultdate_S
    date_E = defaultdate_E
  }



  value_select.push({
    date_S: formatDate(date_S),
    date_E: formatDate(date_E),
    sport:sport_input
  });
  // console.table(value_select);

  /* ------------------------------- for filter ------------------------------- */
  // res.redirect("/dashboard");
  let value = [];
 
  //  formatDate and for SQL
  const sql_S = single_quote + formatDate(date_S)+ single_quote;
  const sql_E = single_quote + formatDate(date_E) + single_quote;
  const sql_sport_input = single_quote + sport_input + single_quote;

  let selcetsport = [];

  //sql for selcet sport
  dbConnection.query(
    "SELECT sportID,sportName FROM sport ORDER BY sportID asc",
    (err, selcetsport1) => {
      if (err) {
        console.log( "==========================================================================");
        console.log(err);
        console.log( "==========================================================================");
      }
      selcetsport = selcetsport1;
    }
  );
  dbConnection.query("SELECT `sportName`,`sportID`FROM `sport`",(err,rows)=>{
    if (err) {
      console.log( "==========================================================================");
      console.log(err);
      console.log( "==========================================================================");
    }
    data_sportname = rows
  });

  

  //sql
  let sql_1 // for chart_1
  let sql_2 // for chart_1_wait
  let sql_3 // for chart_1_do
  let sql_4 // for sport
  let sql_5 // for sport_wait
  let sql_6 // for sport_do
  let sql_7 // for card In competition and competition over
  let sql_8 // for card Waiting to register

      if (sport_input) {
        // console.log("fillter");
        //sql fillter 
        sql_1 = "SELECT LEFT(MONTHNAME(tnmEnddate), 3) AS Month, COUNT(tnmEnddate) AS Count FROM tournament WHERE tnmEnddate BETWEEN " +sql_S +" AND " +sql_E + "AND sportID = "+sql_sport_input+" AND st1 IS NOT NULL  GROUP BY  Month ORDER BY Month ";
        sql_2 = "SELECT LEFT(MONTHNAME(tnmStartdate), 3) AS Month, COUNT(tnmStartdate) AS Count  FROM tournament WHERE  tnmStartdate  BETWEEN  " +sql_S + " AND " +sql_E + "  AND st1 IS null AND  NOW()  BETWEEN `tnmStartdate` AND `tnmEnddate`  AND sportID = "+sql_sport_input+" GROUP BY  Month ORDER BY Month";
        sql_3 = "SELECT LEFT(MONTHNAME(`Rstartdate`), 3) AS Month, COUNT(`Rstartdate`) AS Count  FROM tournament WHERE  `Rstartdate`  BETWEEN  " +sql_S + "  AND  " +sql_E + " AND st1 IS null AND NOW()  BETWEEN `Rstartdate` AND `Renddate`  AND sportID = "+sql_sport_input+" GROUP BY  Month ORDER BY Month";
        sql_4 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmEnddate BETWEEN " + sql_S + " AND " +sql_E + " AND t.sportID = "+sql_sport_input+" AND t.st1 IS NOT NULL  GROUP BY t.sportID;";
        sql_5 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.Rstartdate BETWEEN  " +sql_S +" AND " + sql_E +" AND t.sportID = "+sql_sport_input+" AND t.st1 IS NULL AND NOW()  BETWEEN t.Rstartdate AND t.Renddate GROUP BY t.sportID" ;
        sql_6 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmStartdate BETWEEN  " +sql_S +" AND " +sql_E +" AND t.sportID = "+sql_sport_input+" AND t.st1 IS NULL AND NOW()  BETWEEN t.`tnmStartdate` AND t.`tnmEnddate` GROUP BY t.sportID;";
        sql_7 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE tnmStartdate  BETWEEN " +sql_S +" AND " +sql_E +" AND sportID = "+sql_sport_input+" ";
        sql_8 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE Rstartdate  BETWEEN " +sql_S +" AND " +sql_E + " AND sportID = "+sql_sport_input+" ";

      }else {
        // console.log("default");
        // sql default

        sql_1 = "SELECT LEFT(MONTHNAME(tnmEnddate), 3) AS Month, COUNT(tnmEnddate) AS Count FROM tournament WHERE tnmEnddate BETWEEN " +sql_S +" AND " +sql_E +" AND st1 IS NOT NULL GROUP BY  Month ORDER BY Month ";
        sql_2 = "SELECT LEFT(MONTHNAME(tnmStartdate), 3) AS Month, COUNT(tnmStartdate) AS Count  FROM tournament WHERE  tnmStartdate  BETWEEN  " +sql_S + " AND " +sql_E + "  AND st1 IS null AND  NOW()  BETWEEN `tnmStartdate` AND `tnmEnddate` GROUP BY  Month ORDER BY Month";
        sql_3 = "SELECT LEFT(MONTHNAME(`Rstartdate`), 3) AS Month, COUNT(`Rstartdate`) AS Count  FROM tournament WHERE  `Rstartdate`  BETWEEN  " +sql_S + "  AND  " +sql_E + " AND st1 IS null AND NOW()  BETWEEN `Rstartdate` AND `Renddate` GROUP BY  Month ORDER BY Month";
        sql_4 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmEnddate BETWEEN " + sql_S + " AND " +sql_E + " AND t.st1 IS NOT NULL  GROUP BY t.sportID;";
        sql_5 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.Rstartdate BETWEEN  " +sql_S +" AND " + sql_E +" AND t.st1 IS NULL AND NOW()  BETWEEN t.Rstartdate AND t.Renddate GROUP BY t.sportID" ;
        sql_6 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.`tnmStartdate` BETWEEN  " +sql_S +" AND " +sql_E +" AND t.st1 IS NULL AND NOW()  BETWEEN t.`tnmStartdate` AND t.`tnmEnddate` GROUP BY t.sportID;";
        sql_7 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE tnmStartdate  BETWEEN " +sql_S +" AND " +sql_E +" ";
        sql_8 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE Rstartdate  BETWEEN " +sql_S +" AND " +sql_E + " ";



      }

      /* ------------------------------ zone chart_1 ------------------------------ */
  dbConnection.query(sql_1, (err, rows) => {
    if (err) {
      console.log( "==========================================================================");
      console.log(err);
      console.log( "==========================================================================");
    }
    // console.log("\ntable sql chart_1");
    
    
    // console.table(rows);
    // console.log("table 1\n",rows);

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

  dbConnection.query(sql_2, (err, rows) => {
    if (err) {
      console.log( "==========================================================================");
      console.log(err);
      console.log( "==========================================================================");
    }
    console.log("\ntable sql 2 chart_1");
    
    
    // console.table(rows);
    // console.log("table 1\n",rows);

    const counts = {};

    monthNames.forEach((month) => {
      counts[month] = 0;
    });

    rows.forEach((rows) => {
      counts[rows.Month] = rows.Count;
    });

    const count_do = Object.entries(counts).map(([month, value]) => {
      return { month, value };
    });

    display_month_do = count_do;
  });
  dbConnection.query(sql_3, (err, rows) => {
    if (err) {
      console.log( "==========================================================================");
      console.log(err);
      console.log( "==========================================================================");
    }
    console.log("\ntable sql 3 chart_1");
    
    
    // console.table(rows);
    // console.log("table 1\n",rows);

    const counts = {};

    monthNames.forEach((month) => {
      counts[month] = 0;
    });

    rows.forEach((rows) => {
      counts[rows.Month] = rows.Count;
    });

    const count_wait = Object.entries(counts).map(([month, value]) => {
      return { month, value };
    });

    display_month_wait = count_wait;
  });

  

  

  /* ------------------------------- zone sport ------------------------------- */
  dbConnection.query(
    sql_4,
    (err, rowsport) => {
      if (err) {
        console.log( "==========================================================================");
        console.log(err);
        console.log( "==========================================================================");
      }
      console.table(rowsport);
      console.log("table 4\n",rowsport);
      sport_count = [];
      sport_count = rowsport;
    }
  );
  /* ------------------------------- zone sport ------------------------------- */
  dbConnection.query(
    sql_5,
    (err, rowsport) => {
      if (err) {
        console.log( "==========================================================================");
        console.log(err);
        console.log( "==========================================================================");
      }
      console.table(rowsport);
      console.log("table 5\n",rowsport);
      sport_count_wait = [];
      sport_count_wait = rowsport;
    }
  );
  /* ------------------------------- zone sport ------------------------------- */
  dbConnection.query(
    sql_6,
    (err, rowsport) => {
      if (err) {
        console.log( "==========================================================================");
        console.log(err);
        console.log( "==========================================================================");
      }
      console.table(rowsport);
      console.log("table 6\n",rowsport);
      sport_count_do = [];
      sport_count_do = rowsport;
    }
  );

  /* -------------------------------- zone card ------------------------------- */
  let result = [];
  let count_In = 0;
  let count_Out = 0;
  let count_fin = 0;
  let date = new Date();

  dbConnection.query(sql_7, (err, rows) => {
    if (err) {
      console.log( "==========================================================================");
      console.log(err);
      console.log( "==========================================================================");
    }
    console.log("\t tnmStartdate");
    console.table(rows);
    

    for (let index = 0; index < rows.length; index++) {
      var tnmStartdate = rows[index].tnmStartdate;
      var tnmEnddate = rows[index].tnmEnddate;

      if (
        date >= tnmStartdate &&
        date <= tnmEnddate &&
        rows[index].st1 === null
      ) {
        count_In += 1;
        result.push({
          Datamath: index,
          Name: rows[index].tnmName,
          chack: "In",
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
          count_fin += 1;
          result.push({
            Datamath: index,
            Name: rows[index].tnmName,
            chack: "Success",
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
  });

  dbConnection.query(sql_8, (err, rows) => {
    if (err) {
      console.log( "==========================================================================");
      console.log(err);
      console.log( "==========================================================================");
    }
    console.log("\t Rstartdate");
    console.table(rows);

    for (let index = 0; index < rows.length; index++) {
      var RStrdate = rows[index].Rstartdate;
      var REnddate = rows[index].Renddate;
      if (
        date >= RStrdate &&
        date <= REnddate &&
        rows[index].st1 === null
      ) {
        count_Out += 1;
        result.push({
          Datamath: index,
          Name: rows[index].tnmName,
          chack: "Waiting",
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
    value = [];
    value.push({ In: count_In, Out: count_Out, fin: count_fin });

    success = getUpdatedDataSportName(data_sportname, sport_count);
    console.log(success);

    ongoing = getUpdatedDataSportName(data_sportname, sport_count_do);
    console.log(ongoing);

     waiting = getUpdatedDataSportName(data_sportname, sport_count_wait);
    console.log(waiting);


    // display result total
    console.log("\ntable result");
    console.table(result);
    
    console.log("\ntable value");
    console.table(value);

    res.render("dashboard", {
      result: result,
      count: value,
      display_month,
      display_month_wait,
      display_month_do,
      selcetsport,
      sport_count,
      sport_count_do,
      sport_count_wait,
      success,
      ongoing,
      waiting,
      value_select,
      data_sportname
    });
  });
});


// default 
router.get("/", (req, res, err) => {
  if (req.session.username) {
    if (req.session.level === "เจ้าหน้าที่") {
      dbConnection.query("SELECT `sportName`,`sportID`FROM `sport`",(err,rows)=>{
        if (err) {
          console.log( "==========================================================================");
          console.log(err);
          console.log( "==========================================================================");
        }
        data_sportname = rows
        console.log(data_sportname);
      });
      
       

      
      


      value_select= []
      let value = [];
      //default date
     

      // formatDate and for SQL
      const sql_S = single_quote + formatDate(defaultdate_S)+ single_quote;
      const sql_E = single_quote + formatDate(defaultdate_E) + single_quote;

      let selcetsport = [];
      //sql for selcet sport
      dbConnection.query(
        "SELECT sportID,sportName FROM sport ORDER BY sportID asc",
        (err, selcetsport1) => {
          if (err) {
            console.log( "==========================================================================");
            console.log(err);
            console.log( "==========================================================================");
          }
          selcetsport = selcetsport1;
        }
      );

      /* ------------------------------ zone chart_1 ------------------------------ */

      dbConnection.query("SELECT LEFT(MONTHNAME(tnmEnddate), 3) AS Month, COUNT(tnmEnddate) AS Count FROM tournament WHERE tnmEnddate BETWEEN " +sql_S + " AND " +sql_E + "  AND st1 IS NOT NULL GROUP BY  Month ORDER BY Month ", (err, rows) => {
        if (err) {
          console.log( "==========================================================================");
          console.log(err);
          console.log( "==========================================================================");
        }
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

      dbConnection.query("SELECT LEFT(MONTHNAME(tnmStartdate), 3) AS Month, COUNT(tnmStartdate) AS Count  FROM tournament WHERE  tnmStartdate  BETWEEN  " +sql_S + " AND " +sql_E + "  AND st1 IS null AND  NOW()  BETWEEN `tnmStartdate` AND `tnmEnddate` GROUP BY  Month ORDER BY Month", (err, rows) => {
        if (err) {
          console.log( "==========================================================================");
          console.log(err);
          console.log( "==========================================================================");
        }
        const counts = {};
        monthNames.forEach((month) => {
          counts[month] = 0;
        });

        rows.forEach((rows) => {
          counts[rows.Month] = rows.Count;
        });

        const count_do = Object.entries(counts).map(([month, value]) => {
          return { month, value };
        });
        // console.table(count_do);

        display_month_do = count_do;
        // console.group
        // console.log("log do");
        // console.log(display_month_do);
        // console.groupEnd
      });

      dbConnection.query("SELECT LEFT(MONTHNAME(`Rstartdate`), 3) AS Month, COUNT(`Rstartdate`) AS Count  FROM tournament WHERE  `Rstartdate`  BETWEEN  " +sql_S + "  AND  " +sql_E + " AND st1 IS null AND NOW()  BETWEEN `Rstartdate` AND `Renddate` GROUP BY  Month ORDER BY Month", (err, rows) => {
        if (err) {
          console.log( "==========================================================================");
          console.log(err);
          console.log( "==========================================================================");
        }
        const counts = {};
        monthNames.forEach((month) => {
          counts[month] = 0;
        });

        rows.forEach((rows) => {
          counts[rows.Month] = rows.Count;
        });

        const countwait = Object.entries(counts).map(([month, value]) => {
          return { month, value };
        });
        // console.table(countwait);

        display_month_wait = countwait;
        // console.group
        // console.log("log wait");
        // console.log(display_month_wait);
        // console.groupEnd
      });



      /* ------------------------------- zone sport ------------------------------- */
      dbConnection.query("SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmEnddate BETWEEN " +sql_S +" AND " + sql_E +" AND t.st1 IS NOT NULL GROUP BY t.sportID;",
        (err, rowsport) => {
          if (err) {
            console.log( "==========================================================================");
            console.log(err);
            console.log( "==========================================================================");
          }
          sport_count = [];
          sport_count = rowsport;
          console.log("sport_count");
          console.table(sport_count);
        }
      );

      /* ------------------------------- zone sport ------------------------------- */
      dbConnection.query("SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.Rstartdate BETWEEN  " +sql_S +" AND " + sql_E +" AND t.st1 IS NULL AND NOW()  BETWEEN t.Rstartdate AND t.Renddate GROUP BY t.sportID;",
        (err, rowsport) => {
          if (err) {
            console.log( "==========================================================================");
            console.log(err);
            console.log( "==========================================================================");
          }
          sport_count_wait = [];
          sport_count_wait = rowsport;
          console.log("sport_count_wait");
          console.table(sport_count_wait);
        }
      );
      /* ------------------------------- zone sport ------------------------------- */
      dbConnection.query("SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.`tnmStartdate` BETWEEN  " +sql_S +" AND " +sql_E +" AND t.st1 IS NULL AND NOW()  BETWEEN t.`tnmStartdate` AND t.`tnmEnddate` GROUP BY t.sportID;",
        (err, rowsport) => {
          if (err) {
            console.log( "==========================================================================");
            console.log(err);
            console.log( "==========================================================================");
          }
          sport_count_do = [];
          sport_count_do = rowsport;
          console.log("sport_count_do");
          console.table(sport_count_do);
        }
      );

     

      /* -------------------------------- zone card ------------------------------- */
      let result = [];
      let count_In = 0;
      let count_Out = 0;
      let count_fin = 0;
      let date = new Date();

      dbConnection.query("SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE tnmStartdate  BETWEEN " +sql_S +" AND " +sql_E +" ",
      (err, rows) => {
        if (err) {
          console.log( "==========================================================================");
          console.log(err);
          console.log( "==========================================================================");
        }
        // console.log("\t tnmStartdate");
        // console.table(rows);

        for (let index = 0; index < rows.length; index++) {
          var tnmStartdate = rows[index].tnmStartdate;
          var tnmEnddate = rows[index].tnmEnddate;

          if (
            date >= tnmStartdate &&
            date <= tnmEnddate &&
            rows[index].st1 === null
          ) {
            count_In += 1;
            result.push({
              Datamath: index,
              Name: rows[index].tnmName,
              chack: "In",
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
              count_fin += 1;
              result.push({
                Datamath: index,
                Name: rows[index].tnmName,
                chack: "Success",
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
      });

      dbConnection.query("SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE Rstartdate  BETWEEN " +sql_S +" AND " +sql_E +" ", 
      (err, rows) => {
        if (err) {
          console.log( "==========================================================================");
          console.log(err);
          console.log( "==========================================================================");
        }

        



         success = getUpdatedDataSportName(data_sportname, sport_count);
        console.log(success);

        ongoing = getUpdatedDataSportName(data_sportname, sport_count_do);
        console.log(ongoing);

         waiting = getUpdatedDataSportName(data_sportname, sport_count_wait);
        console.log(waiting);


     


        
        // console.log("\t Rstartdate");
        // console.table(rows);

        for (let index = 0; index < rows.length; index++) {
          var RStrdate = rows[index].Rstartdate;
          var REnddate = rows[index].Renddate;
          if (
            date >= RStrdate &&
            date <= REnddate &&
            rows[index].st1 === null
          ) {
            count_Out += 1;
            result.push({
              Datamath: index,
              Name: rows[index].tnmName,
              chack: "Wait",
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
        value = [];
        value.push({ In: count_In, Out: count_Out, fin: count_fin });
        

        value_select.push({
          date_S: formatDate(sql_S),
          date_E: formatDate(sql_E),
        });

        

        // display result total
        // console.log("result");
        // console.table(result);
        // console.log("resuvaluelt");
        // console.table(value);
        res.render("dashboard", {
          result: result,
          count: value,
          display_month_wait,
          display_month_do,
          display_month,
          selcetsport,
          sport_count,
          sport_count_do,
          sport_count_wait,
          value_select,
          data_sportname,
          success,
          ongoing,
          waiting,
          
        });
      });
    } else {
      req.flash("error", "ไม่สามารถเข้าถึงได้");
      res.redirect("login");
    }
  } else {
    res.redirect("error404");
  }
});

module.exports = router;
