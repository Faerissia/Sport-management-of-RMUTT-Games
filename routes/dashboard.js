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
let value_m;
let display_month = [];

router.post("/dash-value", (req, res) => {
  value_m = req.body.value;
  console.log("Received value:", value_m);

  let date = new Date();
  date.setMonth(date.getMonth() - value_m);
  //  console.log("🚀 ~ file: dashboard.js:27 ~ router.post ~ date", date)
  // console.log(date);

  for (let index = 0; index < value_m; index++) {

    let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


    let curret_date = new Date();
    let day = curret_date.getDate();
    curret_date.setMonth(curret_date.getMonth() - index);
    let month = curret_date.getMonth() + 1;
    let year = curret_date.getFullYear();
    // console.log("🚀 ~ file: dashboard.js:41 ~ router.post ~ year", year)
    // console.log("🚀 ~ file: dashboard.js:40 ~ router.post ~ month", month)
    // console.log("🚀 ~ file: dashboard.js:38 ~ router.post ~ day", day)



    

    let result_date= `${year}-${month <= 9 ? '0' + month : month}-${(day <= 9 ? '0' + day : day)}`
    let sgq ='\''
    let result_date1= (sgq+result_date+sgq)
    console.log("🚀 ~ file: dashboard.js:81 ~ router.post ~ result_date", result_date)
    console.log("🚀 ~ file: dashboard.js:82 ~ router.post ~ result_date1", result_date1)
    
    dbConnection.query(
      "SELECT tnmName,  tnmEnddate FROM tournament WHERE MONTH(tnmEnddate) = MONTH("+result_date1+") AND tnmEnddate BETWEEN DATE_SUB(NOW(), INTERVAL " +
      value_m +
      " MONTH) AND NOW();",
      (err, rows) => {
        

      
        
        
        
        
        console.log("\n\n🚀 ~ file: dashboard.js:40 ~ router.post ~ month", month)
        const result_f = monthNames[month-1];
        console.log("🚀 ~ file: dashboard.js:59 ~ router.post ~ result_f", result_f)
        console.log("🚀 ~ file: dashboard.js:87 ~ router.post ~ result_date1", result_date1)
        console.table(rows);

        // dbConnection.destroy
        display_month.push({
          month:monthNames[month-1],result_cout:rows.length
        });
        // console.table( display_month)
      
       
        
      
      }

    );
  }
  res.redirect("/dashboard");
  // let index=0;
  // while (index < value_m) {
    
  //   let curret_date = new Date();
  //   let day = curret_date.getDate();
  //   curret_date.setMonth(curret_date.getMonth() - index);
  //   let month = curret_date.getMonth() + 1;
  //   let year = curret_date.getFullYear();
  //   // console.log("🚀 ~ file: dashboard.js:41 ~ router.post ~ year", year)
  //   // console.log("🚀 ~ file: dashboard.js:40 ~ router.post ~ month", month)
  //   // console.log("🚀 ~ file: dashboard.js:38 ~ router.post ~ day", day)



    

  //   let result_date= `${year}-${month <= 9 ? '0' + month : month}-${(day <= 9 ? '0' + day : day)}`
  //   let sgq ='\''
  //   let result_date1= (sgq+result_date+sgq)
  //   console.log("🚀 ~ file: dashboard.js:81 ~ router.post ~ result_date", result_date)
  //   console.log("🚀 ~ file: dashboard.js:82 ~ router.post ~ result_date1", result_date1)
    
  //   dbConnection.query(
  //     "SELECT tnmEnddate FROM tournament WHERE MONTH(tnmEnddate) = MONTH("+result_date1+") AND tnmEnddate BETWEEN DATE_SUB(NOW(), INTERVAL " +
  //     value_m +
  //     " MONTH) AND NOW();",
  //     (err, rows) => {
  //       console.log("\n\n🚀 ~ file: dashboard.js:40 ~ router.post ~ month", month)
  //       console.log("🚀 ~ file: dashboard.js:87 ~ router.post ~ result_date1", result_date1)
  //       console.table(rows);
  //       dbConnection.destroy
  //     }

  //   );
  //   index++;
    
  // }

 

});



router.get("/", (req, res, err) => {
  dbConnection.query(
    "SELECT tnmID,sportID,Rstartdate,Renddate,tnmStartdate,tnmEnddate,st1  FROM tournament",
    (err, rows) => {
      if (req.session.loggedin) {
        if (role === "เจ้าหน้าที่") {
          // console.table(rows);
          let result = [];
          let count = [];

          let count_In = 0;
          let count_Out = 0;
          let count_fin = 0;
          for (let index = 0; index < rows.length; index++) {
            // console.log("เข้า For");
            // console.table(rows);
            let date = new Date();
            // console.log(date);
            const element = rows[index];
            let RStrdate = rows[index].Rstartdate;
            let REnddate = rows[index].Renddate;
            // console.log("ค่า 1" + RStrdate);
            // console.log("ค่า 2" + REnddate);

            if (date >= RStrdate && date <= REnddate) {
              // console.log("รอบ" + index + "อยู่");
              count_In++;
              result.push({
                Datamath: index,
                chackdate: "In",
                tnmID: rows[index].tnmID,
                sportID: rows[index].sportID,
                Rstartdate: rows[index].Rstartdate,
                Renddate: rows[index].Renddate,
                tnmStartdate: rows[index].tnmStartdate,
                tnmEnddate: rows[index].tnmEnddate,
                rank: rows[index].st1,
              });
            } else {
              // console.log("รอบ" + index + "หลุด");
              count_Out++;
              result.push({
                Datamath: index,
                chackdate: "Out",
                tnmID: rows[index].tnmID,
                sportID: rows[index].sportID,
                Rstartdate: rows[index].Rstartdate,
                Renddate: rows[index].Renddate,
                tnmStartdate: rows[index].tnmStartdate,
                tnmEnddate: rows[index].tnmEnddate,
                rank: rows[index].st1,
              });
            }
            if (rows[index].st1 !== null) {
              count_fin++;
            }
          }
          console.table( display_month)
          count.push({ In: count_In, Out: count_Out, fin: count_fin });
          
          // console.log(result);
          // console.table(result);
          // console.log(count);
          // console.table(count);

          res.render("dashboard", {
            data: rows,
            status_login: req.session.loggedin,
            user: user,
            result: result,
            count: count,
            display_month:display_month
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
