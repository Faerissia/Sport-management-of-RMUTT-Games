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

router.get("/", (req, res, err) => {
  dbConnection.query(
    "SELECT tnmID,sportID,Rstartdate,Renddate,tnmStartdate,tnmEnddate,st1  FROM tournament",
    (err, rows) => {
      if (req.session.loggedin) {
        if (role === "เจ้าหน้าที่") {
          // console.table(rows);
          let result = [];
          let count= [];

          let count_In = 0;
          let count_Out = 0;
          let count_fin = 0;
          for (let index = 0; index < rows.length; index++) {
            console.log("เข้า For");
            console.table(rows);
            let date = new Date();
            console.log(date);
            const element = rows[index];
            let RStrdate = rows[index].Rstartdate;
            let REnddate = rows[index].Renddate;
            console.log("ค่า 1" + RStrdate);
            console.log("ค่า 2" + REnddate);

            if (date >= RStrdate && date <= REnddate) {
              console.log("รอบ" + index + "อยู่");
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
              console.log("รอบ" + index + "หลุด");
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
            if (rows[index].st1  !== null) {
                count_fin++;
              }
          }

          
          count.push({In:count_In,Out:count_Out,fin:count_fin});
          
          console.log(result);
          console.table(result);
          console.log(count);
          console.table(count);

          res.render("dashboard", {
            data: rows,
            status_login: req.session.loggedin,
            user: user,
            result: result,
            count:count
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
