let express = require('express');
let router = express.Router();
let dbConnection = require('../../util/db');
const path = require('path');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thesissportmanage@gmail.com',
      pass: 'vtevtgdhgebnyqog'
    }
  });



router.post('/verifysingle', (req, res) => {
    let RestoredOTP = req.body.RestoredOTP;
    let otp = req.body.otp;

    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let facultyID = req.body.facultyID;
    let playerIDCard = req.body.playerIDCard;
    let playerStudentID = req.body.playerStudentID;
    let playerFile1 = req.body.playerFile1;
    let tnmID =req.body.tnmID;


    if (otp === RestoredOTP) {
        dbConnection.query('SELECT * FROM player WHERE playerIDCard = ? AND tnmID = ?',[playerIDCard, tnmID] ,(err,rows) => {
            if(rows.length > 0){
                let form_data = {
                    tnmID: tnmID,
                    playerFName: playerFName,
                    playerLName: playerLName,
                    playerGender: playerGender,
                    playerBirthday: playerBirthday,
                    playerPhone: playerPhone,
                    playerEmail: playerEmail,
                    facultyID: facultyID,
                    playerIDCard: playerIDCard,
                    playerStudentID: playerStudentID,
                    playerFile1: playerFile1,
                    detailDoc: 'สมัครซ้ำ'
                }
                console.log('ซ้ำ')
                dbConnection.query('INSERT INTO player SET ?', form_data, (err, result) => {
                    if (err) {
                        console.log(JSON.stringify(err));
                        req.flash('error', err)
                        res.redirect('/tnmdetail/'+tnmID)
                    } else {
                        req.flash('success', 'สมัครเข้าร่วมการแข่งขันแล้ว');
                        res.redirect('/tnmdetail/'+tnmID);
                    }
                })
            }else{
                let form_data = {
                    tnmID: tnmID,
                    playerFName: playerFName,
                    playerLName: playerLName,
                    playerGender: playerGender,
                    playerBirthday: playerBirthday,
                    playerPhone: playerPhone,
                    playerEmail: playerEmail,
                    facultyID: facultyID,
                    playerIDCard: playerIDCard,
                    playerStudentID: playerStudentID,
                    playerFile1: playerFile1
                }
                console.log('ไม่ซ้ำ')
                dbConnection.query('INSERT INTO player SET ?', form_data, (err, result) => {
                    if (err) {
                        console.log(JSON.stringify(err));
                        req.flash('error', err)
                        res.redirect('/tnmdetail/'+tnmID)
                    } else {
                        req.flash('success', 'สมัครเข้าร่วมการแข่งขันแล้ว');
                        res.redirect('/tnmdetail/'+tnmID);
                    }
                })
            }
        })

    } else {
        res.send('Invalid OTP');
    }
});

router.post('/verifysingle', (req, res) => {

})



// display tnmcheck page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
         if (err) {
            req.flash('error', err);
            res.render('userside/index', { data: '' });
        } else {
                res.render('userside/index', { data: rows,status_login: req.session.loggedin});
        }
    })
})

router.get('/showall', (req, res, next) => {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/showall', { data: '' });
        } else {
            res.render('userside/showall', { data: rows,status_login: req.session.loggedin });
        }
    })
})

router.get('/tnmdetail/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament LEFT JOIN sport ON tournament.sportID = sport.sportID WHERE tnmID = ' + tnmID, (err, rows) => {
            res.render('userside/tnm/tnmdetail', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
    })
})

router.get('/tnmbracket/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmbracket', { data: '' });
        } else {
            res.render('userside/tnm/tnmbracket', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        }
    })
})

router.get('/tnmparticipant/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName,f.name AS FacName FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID WHERE t.tnmID = ' + tnmID, (err, rows) => {
        if (rows[0].teamID === null){
            res.render('userside/tnm/tnmparticipant', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        } else {
            dbConnection.query('SELECT * FROM team WHERE tnmID = '+tnmID, (err, rows) => {
            res.render('userside/tnm/tnmparticipant', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        })
    }
})
})

router.get('/tnmmatch/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmmatch', { data: '' });
        } else {
            res.render('userside/tnm/tnmmatch', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        }
    })
})

router.get('/tnmrank/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmrank', { data: '' });
        } else {
            res.render('userside/tnm/tnmrank', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        }
    })
})

router.get('/tnmhighlight/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID,t.tnmName,h.tnmID,h.linkvid,h.filePic,h.date,h.description FROM tournament t LEFT JOIN highlight h ON t.tnmID = h.tnmID WHERE t.tnmID = ' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmhighlight', { data: '' });
        } else {
            res.render('userside/tnm/tnmhighlight', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        }
    })
})

router.get('/singlereg/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT u.name, u.uniID,t.tnmID, t.tnmName FROM university u INNER JOIN tournament t WHERE tnmID =' +tnmID, (err, rows) => {
                res.render('userside/regform/singlereg', { data: rows,tnmID: tnmID,status_login: req.session.loggedin
                 });
    })
})

router.post('/singlereg', (req, res, next) =>{

    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let facultyID = req.body.facultyID;
    let playerIDCard = req.body.playerIDCard;
    let playerStudentID = req.body.playerStudentID;
    let playerFile1 = req.files.playerFile1;
    let tnmID =req.body.tnmID;

    
    var name_pfile = new Date().getTime() +'_'+playerFile1.name;
    playerFile1.mv('./assets/player/' + name_pfile);


    let OTP = Math.floor(1000 + Math.random() * 9000);

    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: playerEmail,
        subject: 'รหัส OTP สำหรับการยืนยันอีเมลสมัครเข้าร่วมการแข่งขัน',
        text: 'รหัส OTP ของคุณคือ : ' + OTP
      };

      console.log(OTP);
      console.log(req.session.storedOTP);

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.render('userside/regform/otpsingle',{
            playerEmail: playerEmail,
            status_login: req.session.loggedin,
            OTP: OTP,
            tnmID: tnmID,
            playerFName: playerFName,
            playerLName: playerLName,
            playerGender: playerGender,
            playerBirthday: playerBirthday,
            playerPhone: playerPhone,
            playerEmail: playerEmail,
            facultyID: facultyID,
            playerIDCard: playerIDCard,
            playerStudentID: playerStudentID,
            playerFile1: name_pfile})
        }
      });
})

router.get('/teamreg/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT u.name, u.uniID,t.tnmID, t.tnmName,s.sportName,s.sportPlaynum FROM tournament t INNER JOIN university u LEFT JOIN sport s ON t.sportID = s.sportID WHERE tnmID = ' +tnmID, (err, rows) => {
                res.render('userside/regform/teamreg', { data: rows,status_login: req.session.loggedin
                 });
    })
})

router.post('/teamreg', async (req, res, next) =>{
    //ทีม
    let teamName = req.body.teamName;
    let NameAgent = req.body.NameAgent;
    let LnameAgent = req.body.LnameAgent;
    let teamPhoneA = req.body.teamPhoneA;
    let teamEmailA = req.body.teamEmailA;
    let teamPic = req.files.teamPic;
    let tnmID = req.body.tnmID[0];
    var teamfile = new Date().getTime() +'_'+teamPic.name;
    teamPic.mv('./assets/team/' + teamfile);

    //ผู้เล่น
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let facultyID = req.body.facultyID;
    let playerIDCard = req.body.playerIDCard;
    let playerStudentID = req.body.playerStudentID;
    
    var values = [];

    var playerFile1 = req.files.playerFile1;

    

    for (var i = 0; i < playerFName.length; i++) {
        var player_photo = null;
        if(playerFile1[i]){
            var name_pfile = new Date().getTime() +'_'+playerFile1[i].name;
            playerFile1[i].mv('./assets/player/' + name_pfile);
            player_photo = name_pfile;
        }

        let checkreg =  new Promise((resolve,reject) =>{
            dbConnection.query('SELECT * FROM player WHERE playerIDCard = ? AND tnmID = ?', [playerIDCard[i], tnmID], (err, rows) => {
                if(err) reject(err)
                resolve(rows);
                console.log(rows)
            });
        });
        if(checkreg.length > 0){
            let  detailDoc = 'สมัครซ้ำ';
            values.push([playerFName[i], playerLName[i], playerGender[i], playerBirthday[i], playerPhone[i],playerEmail[i], facultyID[i], playerIDCard[i], playerStudentID[i], player_photo, detailDoc, tnmID])
        }else{
            let detailDoc = null;
            values.push([playerFName[i], playerLName[i], playerGender[i], playerBirthday[i], playerPhone[i],playerEmail[i], facultyID[i], playerIDCard[i], playerStudentID[i], player_photo, detailDoc, tnmID])
        }
    }
        
    

    var sql_team = "INSERT INTO team (teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA, teamPic, tnmID) VALUES ?";
    var sql_player = "INSERT INTO player (playerFName, playerLName, playerGender, playerBirthday, playerPhone, playerEmail, facultyID, playerIDCard, playerStudentID, playerFile1, detailDoc, tnmID,teamID) VALUES ?";
        
        // insert query db
        dbConnection.query(sql_team,[[[teamName, NameAgent, LnameAgent, teamPhoneA,teamEmailA, teamfile, tnmID]]], (err, result) => {
            if (err) throw err;
            console.log("Number of teams inserted: " + result.affectedRows);
            var teamID = result.insertId;
            for (var i = 0; i < values.length; i++) {
                values[i].push(teamID)
        }
        dbConnection.query(sql_player, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of persons inserted: " + result.affectedRows);
            req.flash('success', 'สมัครเข้าร่วมการแข่งขันแล้ว');
            res.redirect('/tnmdetail/'+tnmID);
                
        })
    })
})


router.post("/fetch_faculty", function(req, res) {
    var uniID = req.body.uniID;
    var fac_query = "SELECT * FROM faculty WHERE uniID = ?";
    dbConnection.query(fac_query, [uniID], function(err, results) {
        if (err) throw err;
        res.send(results);
    });
});


module.exports = router;