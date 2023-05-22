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


let chart_data =[];

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
  
  // input
  date_S = new Date(req.body.value_startdate);
  date_E = new Date(req.body.value_enddate);
  let sport_input = req.body.value_sport;
  // console.log("Received startdate: ", date_S);
  // console.log("Received enddate: ", date_E);
  // console.log("Received sport: ", sport_input);

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
  
  let sql_4 // for sport
  let sql_5 // for sport_wait
  let sql_6 // for sport_do
  let sql_7 // for card In competition and competition over
  let sql_8 // for card Waiting to register

      if (sport_input) {
         
        let data = '';
        let startDate = new Date(sql_S);
        let endDate = new Date(sql_E);
        if (startDate <=endDate) {  
          
          let diffYears = endDate.getFullYear() - startDate.getFullYear();
          let diffMonths = diffYears * 12 + endDate.getMonth() - startDate.getMonth();
          
          while ((diffMonths+1) > 0) {
            let yearMonth = startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }).split(' ').slice(0,2).join('-');
            let firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            let lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            let sDate = formatDate(firstDay);
            let eDate = formatDate(lastDay);
  
            data += `SELECT '${yearMonth}' AS yearMonth, '${sDate}' AS sDate, '${eDate}' AS eDate, now() AS chkDate \n`;
            if (startDate.getMonth() !== endDate.getMonth() || startDate.getFullYear() !== endDate.getFullYear()) { // เพิ่มเงื่อนไขว่าถ้าเดือนไม่ใช่เดือนเดียวกันให้เติม UNION
              data += 'UNION ';
            }
            startDate.setMonth(startDate.getMonth() + 1);
            diffMonths--;
          }
        } else {
          console.log('endDate ต้องมากกว่า startDate');
        }

        // console.log(data);
                
        let sql_chart_1 = `select A.*, (select count(*)  from tournament T where T.sportID = ${sql_sport_input} AND (A.chkDate < T.tnmStartdate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as notStart, (select count(*)  from tournament T where T.sportID = ${sql_sport_input} AND  (A.chkDate between T.tnmStartdate and T.tnmEnddate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as inProcess, (select count(*)  from tournament T where T.sportID = ${sql_sport_input} AND  (A.chkDate > T.tnmEnddate) and t.st1 is NOT null and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as done from ( ${data} ) A `
        
        // console.log("\n",sql_chart_1);

        dbConnection.query(sql_chart_1,(err_chart,chart_count)=>{
          if (err_chart) {
            console.log( "==========================================================================");
            console.log(err_chart);
            console.log( "==========================================================================");
          }
          chart_data = chart_count
          // console.table(chart_data);


        })
         

        // console.log("fillter sport");
        //sql fillter 
        sql_4 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmEnddate BETWEEN " + sql_S + " AND " +sql_E + " AND t.sportID = "+sql_sport_input+" AND t.st1 IS NOT NULL  GROUP BY t.sportID;";
        sql_5 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.Rstartdate BETWEEN  " +sql_S +" AND " + sql_E +" AND t.sportID = "+sql_sport_input+" AND t.st1 IS NULL AND NOW()  BETWEEN t.Rstartdate AND t.Renddate GROUP BY t.sportID" ;
        sql_6 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmStartdate BETWEEN  " +sql_S +" AND " +sql_E +" AND t.sportID = "+sql_sport_input+" AND t.st1 IS NULL AND NOW()  BETWEEN t.`tnmStartdate` AND t.`tnmEnddate` GROUP BY t.sportID;";
        sql_7 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE tnmStartdate  BETWEEN " +sql_S +" AND " +sql_E +" AND sportID = "+sql_sport_input+" ";
        sql_8 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE Rstartdate  BETWEEN " +sql_S +" AND " +sql_E + " AND sportID = "+sql_sport_input+" ";

      }else {
        // console.log("default all sport");
        // sql default
        sql_4 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmEnddate BETWEEN " + sql_S + " AND " +sql_E + " AND t.st1 IS NOT NULL  GROUP BY t.sportID;";
        sql_5 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.Rstartdate BETWEEN  " +sql_S +" AND " + sql_E +" AND t.st1 IS NULL AND '2023-04-09'  BETWEEN t.Rstartdate AND t.Renddate GROUP BY t.sportID" ;
        sql_6 = "SELECT s.sportName,t.sportID, COUNT(t.sportID) as count_sportID FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.`tnmStartdate` BETWEEN  " +sql_S +" AND " +sql_E +" AND t.st1 IS NULL AND '2023-04-09'  BETWEEN t.`tnmStartdate` AND t.`tnmEnddate` GROUP BY t.sportID;";
        sql_7 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE tnmStartdate  BETWEEN " +sql_S +" AND " +sql_E +" ";
        sql_8 = "SELECT tnmName, sportID, Rstartdate, Renddate, tnmStartdate, tnmEnddate, st1 FROM tournament WHERE Rstartdate  BETWEEN " +sql_S +" AND " +sql_E + " ";


 

      /* ------------------------------ zone chart_1 ------------------------------ */
let data = '';
let startDate = new Date(sql_S);
let endDate = new Date(sql_E);

if (startDate <=endDate) {  
  
  let diffYears = endDate.getFullYear() - startDate.getFullYear();
  let diffMonths = diffYears * 12 + endDate.getMonth() - startDate.getMonth();
  
  while ((diffMonths+1) > 0) {
    let yearMonth = startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }).split(' ').slice(0,2).join('-');
    let firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    let lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    let sDate = formatDate(firstDay);
    let eDate = formatDate(lastDay);
  
    data += `SELECT '${yearMonth}' AS yearMonth, '${sDate}' AS sDate, '${eDate}' AS eDate, '2023-04-09' AS chkDate \n`;
    if (startDate.getMonth() !== endDate.getMonth() || startDate.getFullYear() !== endDate.getFullYear()) { // เพิ่มเงื่อนไขว่าถ้าเดือนไม่ใช่เดือนเดียวกันให้เติม UNION
      data += 'UNION ';
    }
    startDate.setMonth(startDate.getMonth() + 1);
    diffMonths--;
  }

} else {
  console.log('endDate ต้องมากกว่า startDate');
}

console.log(data);
        
let sql_chart_1 = `select A.*, (select count(*)  from tournament T where  (A.chkDate < T.tnmStartdate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as notStart, (select count(*)  from tournament T where   (A.chkDate between T.tnmStartdate and T.tnmEnddate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as inProcess, (select count(*)  from tournament T where   (A.chkDate > T.tnmEnddate) and t.st1 is NOT null and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as done from ( ${data} ) A `
// console.log("\n",sql_chart_1);

dbConnection.query(sql_chart_1,(err_chart,chart_count)=>{
  if (err_chart) {
    console.log( "==========================================================================");
    console.log(err_chart);
    console.log( "==========================================================================");
  }
  chart_data = chart_count
  // console.table(chart_data);


})




 
      }

      /* ------------------------------ zone chart_1 ------------------------------ */

  /* ------------------------------- zone sport ------------------------------- */
  dbConnection.query(
    sql_4,
    (err, rowsport) => {
      if (err) {
        console.log( "==========================================================================");
        console.log(err);
        console.log( "==========================================================================");
      }
      // console.table(rowsport);
      // console.log("table 4\n",rowsport);
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
      // console.table(rowsport);
      // console.log("table 5\n",rowsport);
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
      // console.table(rowsport);
      // console.log("table 6\n",rowsport);
      sport_count_do = [];
      sport_count_do = rowsport;
    }
  );

  /* -------------------------------- zone card ------------------------------- */
  let result = [];
  let count_In = 0;
  let count_Out = 0;
  let count_fin = 0;
  let date
  if (sport_input) {
     date = new Date();
  } else {
     date = new Date('2023-04-09');
  }
  
  // ต้องลบ1วัน เพราะ เรื่องทามโซน ทำให้คิวรี่ที่ดึงมาลด1 วัน จึงต้องลดวันตาม เพื่อให้ตรง
  date.setDate(date.getDate() - 1) 
  
  // console.log("🚀 ~ file: dashboard.js:331 ~ router.post ~ date:", date)

  dbConnection.query(sql_7, (err, rows) => {
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
          // tnmID: rows[index].tnmID,
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
            // tnmID: rows[index].tnmID,
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
          chack: "Waiting",
          // tnmID: rows[index].tnmID,
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
    // console.log(success);

    ongoing = getUpdatedDataSportName(data_sportname, sport_count_do);
    // console.log(ongoing);

     waiting = getUpdatedDataSportName(data_sportname, sport_count_wait);
    // console.log(waiting);


    // display result total
    // console.log("\ntable result");
    // console.table(result);
    
    // console.log("\ntable value");
    // console.table(value);

    res.render("dashboard", {
      result: result,
      count: value,
      selcetsport,
      sport_count,
      sport_count_do,
      sport_count_wait,
      success,
      ongoing,
      waiting,
      value_select,
      data_sportname,
      chart_data,
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
        // console.log(data_sportname);
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

       
      let data = '';
      let startDate = new Date(sql_S);
      let endDate = new Date(sql_E);

      if (startDate <=endDate) {  
        let diffYears = endDate.getFullYear() - startDate.getFullYear();
        let diffMonths = diffYears * 12 + endDate.getMonth() - startDate.getMonth();
        
        while ((diffMonths+1) > 0) {
          // let yearMonth = startDate.toISOString().substr(0, 7);
          let yearMonth = startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }).split(' ').slice(0,2).join('-');
          let firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
          let lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
          // let sDate = firstDay.toISOString().substr(0, 10);
          // let eDate = lastDay.toISOString().substr(0, 10);
          let sDate = formatDate(firstDay);
          let eDate = formatDate(lastDay);
        
          data += `SELECT '${yearMonth}' AS yearMonth, '${sDate}' AS sDate, '${eDate}' AS eDate, now() AS chkDate \n`;
          if (startDate.getMonth() !== endDate.getMonth() || startDate.getFullYear() !== endDate.getFullYear()) { // เพิ่มเงื่อนไขว่าถ้าเดือนไม่ใช่เดือนเดียวกันให้เติม UNION
            data += 'UNION ';
          }
          startDate.setMonth(startDate.getMonth() + 1);
          diffMonths--;
        }
    } else {
      console.log('endDate ต้องมากกว่า startDate');
    }
      
      // console.log(data);
              
      let sql_chart_1 = `select A.*, (select count(*)  from tournament T where  (A.chkDate < T.tnmStartdate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as notStart, (select count(*)  from tournament T where   (A.chkDate between T.tnmStartdate and T.tnmEnddate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as inProcess, (select count(*)  from tournament T where   (A.chkDate > T.tnmEnddate) and t.st1 is NOT null and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as done from ( ${data} ) A `
      // let sql_chart_1 = `select A.*, (select count(*)  from tournament T where  T.sportID ="1" AND(A.chkDate < T.tnmStartdate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as notStart, (select count(*)  from tournament T where  T.sportID ="1" AND (A.chkDate between T.tnmStartdate and T.tnmEnddate) and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as inProcess, (select count(*)  from tournament T where  T.sportID ="1" AND (A.chkDate > T.tnmEnddate) and t.st1 is NOT null and ( A.sDate <= T.Rstartdate or A.sDate <= T.Renddate or A.sDate <= T.tnmStartdate or A.sDate <= T.tnmEnddate ) and (A.eDate >= T.Rstartdate or A.eDate >= T.Renddate or A.eDate >= T.tnmStartdate or A.eDate >= T.tnmEnddate)) as done from ( ${data} ) A `
      // console.log("\n",sql_chart_1);
      
      dbConnection.query(sql_chart_1,(err_chart,chart_count)=>{
        if (err_chart) {
          console.log( "==========================================================================");
          console.log(err_chart);
          console.log( "==========================================================================");
        }
      
      
        chart_data = chart_count
        // console.table(chart_data);
      
      
      })
      
      
      
      
       


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
          // console.log("sport_count");
          // console.table(sport_count);
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
          // console.log("sport_count_wait");
          // console.table(sport_count_wait);
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
          // console.log("sport_count_do");
          // console.table(sport_count_do);
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
              // tnmID: rows[index].tnmID,
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
                // tnmID: rows[index].tnmID,
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
        // console.log(success);

        ongoing = getUpdatedDataSportName(data_sportname, sport_count_do);
        // console.log(ongoing);

         waiting = getUpdatedDataSportName(data_sportname, sport_count_wait);
        // console.log(waiting);


     


        
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
              // tnmID: rows[index].tnmID,
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
          selcetsport,
          sport_count,
          sport_count_do,
          sport_count_wait,
          value_select,
          data_sportname,
          success,
          ongoing,
          waiting,
          chart_data,
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

router.get('/done/:Datedata', function(req, res, next) {
  let date = req.params.Datedata.split('&');
  const date_start = date[0]
  const date_end = date[1]
  
  const value_date = {
    start:date_start,
    end:date_end
  };
  dbConnection.query(`SELECT tnmID, tnmName,tnmTypegame,Rstartdate,Renddate,tnmStartdate,tnmEnddate,tnmDetail FROM tournament WHERE '2023-04-09' NOT BETWEEN tnmStartdate AND tnmEnddate and '2023-04-09' NOT BETWEEN Rstartdate AND Renddate  and st1 is not null`, (err, rows) => {
  if(req.session.username){
      if(req.session.level === 'เจ้าหน้าที่'){
          res.render('status_dashboard/done', { data: rows,value_date,} );
      }else{
          req.flash('error','ไม่สามารถเข้าถึงได้');
          res.redirect('login');
      }
  }else{
      res.redirect('error404');
  }
  })
})

router.get('/inprocess/:Datedata', function(req, res, next) {
  let date = req.params.Datedata.split('&');
  const date_start = date[0]
  const date_end = date[1]
  
  const value_date = {
    start:date_start,
    end:date_end
  };
  dbConnection.query(`SELECT tnmID, tnmName,tnmTypegame,Rstartdate,Renddate,tnmStartdate,tnmEnddate,tnmDetail FROM tournament WHERE '2023-04-09' BETWEEN tnmStartdate AND tnmEnddate AND tnmStartdate BETWEEN '2023-01-01' AND '2023-12-31' AND tnmEnddate BETWEEN '${date_start}' AND '${date_end}' `, (err, rows) => {
  if(req.session.username){
      if(req.session.level === 'เจ้าหน้าที่'){
       
          res.render('status_dashboard/inprocess', { data: rows,value_date,} );
      }else{
          req.flash('error','ไม่สามารถเข้าถึงได้');
          res.redirect('login');
      }
  }else{
      res.redirect('error404');
  }
  })
})

router.get('/notstart/:Datedata', function(req, res, next) {
  let date = req.params.Datedata.split('&');
  const date_start = date[0]
  const date_end = date[1]
  
  const value_date = {
    start:date_start,
    end:date_end
  };
  dbConnection.query(`SELECT tnmID,tnmName,tnmTypegame,Rstartdate,Renddate,tnmStartdate,tnmEnddate,tnmDetail FROM tournament WHERE '2023-04-09' BETWEEN Rstartdate AND Renddate AND Rstartdate BETWEEN '2023-01-01' AND '2023-12-31' AND Renddate BETWEEN '${date_start}' AND '${date_end}' `, (err, rows) => {
  if(req.session.username){
      if(req.session.level === 'เจ้าหน้าที่'){
        res.render('status_dashboard/notstart', { data: rows,value_date,} );
      }else{
          req.flash('error','ไม่สามารถเข้าถึงได้');
          res.redirect('login');
      }
  }else{
      res.redirect('error404');
  }
  })
})





module.exports = router;
