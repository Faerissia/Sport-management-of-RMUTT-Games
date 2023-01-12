let express = require('express');
let router = express.Router();
let dbConnection = require('../../util/db');
const path = require('path');


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
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID WHERE t.tnmID = ' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmparticipant', { data: ''});
            
        } else {
            res.render('userside/tnm/tnmparticipant', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
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
    let errors = false;

    var name_pfile = new Date().getTime() +'_'+playerFile1.name;

    playerFile1.mv('./assets/player/' + name_pfile);


    // if no error
    if(!errors) {
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
            playerFile1: name_pfile
        }
        // insert query db
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

router.get('/teamreg/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT u.name, u.uniID,t.tnmID, t.tnmName,s.sportName,s.sportPlaynum FROM tournament t INNER JOIN university u LEFT JOIN sport s ON t.sportID = s.sportID WHERE tnmID = ' +tnmID, (err, rows) => {
                res.render('userside/regform/teamreg', { data: rows,status_login: req.session.loggedin
                 });
    })
})

router.post('/teamreg', (req, res, next) =>{
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
    
    var values = []

    var playerFile1 = req.files.playerFile1;

        for (var i = 0; i < playerFName.length; i++) {
            var player_photo = null;
            if(playerFile1[i]){
                var name_pfile = new Date().getTime() +'_'+playerFile1[i].name;
                playerFile1[i].mv('./assets/player/' + name_pfile);
                player_photo = name_pfile
        }
        console.log(playerFName[i])
        console.log(playerLName[i])
        console.log(playerGender[i])
        console.log(playerBirthday[i])
        console.log(playerPhone[i])
        console.log(playerEmail[i])
        console.log(facultyID[i])
        console.log(playerIDCard[i])
        console.log(playerStudentID[i])
        console.log(player_photo[i])
        console.log(tnmID)
        values.push([playerFName[i], playerLName[i], playerGender[i], playerBirthday[i], playerPhone[i],playerEmail[i], facultyID[i], playerIDCard[i], playerStudentID[i],player_photo, tnmID])
        }
    

    var sql_team = "INSERT INTO team (teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA, teamPic, tnmID) VALUES ?";
    var sql_player = "INSERT INTO player (playerFName, playerLName, playerGender, playerBirthday, playerPhone, playerEmail, facultyID, playerIDCard, playerStudentID, playerFile1, tnmID,teamID) VALUES ?";
        
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
            res.redirect('/');
                
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