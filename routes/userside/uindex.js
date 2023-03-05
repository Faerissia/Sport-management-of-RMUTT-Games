let express = require('express');
let router = express.Router();
let dbConnection = require('../../util/db');
const path = require('path');
const nodemailer = require('nodemailer');
const { resolve } = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thesissportmanage@gmail.com',
      pass: 'vtevtgdhgebnyqog'
    }
  });

// display tnmcheck page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM tournament WHERE CURDATE() BETWEEN Rstartdate AND Renddate ORDER BY Rstartdate DESC LIMIT 4', (err, opening) => {
         if (err) console.log('error',err);
         dbConnection.query('SELECT * FROM tournament WHERE CURDATE() BETWEEN tnmStartdate AND tnmEnddate ORDER BY Rstartdate DESC LIMIT 4',(err,ongoing)=>{
            if (err) console.log('error',err);
            dbConnection.query('SELECT * FROM tournament WHERE st1 IS NOT NULL ORDER BY tnmID DESC LIMIT 4',(err,ending)=>{
                if (err) console.log('error',err);
                res.render('userside/index', { opening,ongoing,ending,status_login: req.session.loggedin});
    })
})
})
})

router.post('/verifysingle', (req, res) => {
    let OTP = req.body.OTP;
    let submitOTP = req.body.submitOTP;
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let facultyID = req.body.facultyID;
    let playerIDCard = req.body.playerIDCard;
    let playerFile1 = req.body.playerFile1;
    let tnmID =req.body.tnmID;

    console.log(submitOTP,OTP)

    if (submitOTP === OTP) {
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
        req.flash('error','รหัส OTP ไม่ถูกต้อง');
        res.render('userside/regform/otpsingle',{
            submitOTP:submitOTP,
            OTP:OTP,
            playerEmail: playerEmail,
            tnmID: tnmID,
            playerFName: playerFName,
            playerLName: playerLName,
            playerGender: playerGender,
            playerBirthday: playerBirthday,
            playerPhone: playerPhone,
            playerEmail: playerEmail,
            facultyID: facultyID,
            playerIDCard: playerIDCard,
            playerFile1: playerFile1,
            status_login: req.session.loggedin
        })
        
    }
});

router.post('/verifyteam', (req, res) => {
    let otp = req.body.otp;
    let teamOTP = req.body.teamOTP;
    let teamName = req.body.teamName;
    let NameAgent = req.body.NameAgent;
    let LnameAgent = req.body.LnameAgent;
    let teamPhoneA = req.body.teamPhoneA;
    let teamEmailA = req.body.teamEmailA;
    let uniID = req.body.uniID;
    let teamfile = req.body.teamfile;
    let tnmID = req.body.tnmID;

    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let facultyID = req.body.facultyID;
    let playerIDCard = req.body.playerIDCard;
    let player_photo = req.body.player_photo;
    let detailDoc = req.body.detailDoc;

    let values = [];

    for (let i = 0; i < playerFName.length; i++) {
    values.push([playerFName[i], playerLName[i], playerGender[i], playerBirthday[i], playerPhone[i],playerEmail[i], facultyID[i], playerIDCard[i], player_photo[i], detailDoc[i], tnmID])
    }


    if(otp === teamOTP){

    let sql_team = "INSERT INTO team (teamName, NameAgent, LnameAgent, uniID, teamPhoneA, teamEmailA, teamPic, tnmID) VALUES ?";
    let sql_player = "INSERT INTO player (playerFName, playerLName, playerGender, playerBirthday, playerPhone, playerEmail, facultyID, playerIDCard, playerFile1, detailDoc, tnmID,teamID) VALUES ?";
        
        // insert query db
        dbConnection.query(sql_team,[[[teamName, NameAgent, LnameAgent, uniID, teamPhoneA,teamEmailA, teamfile, tnmID]]], (err, result) => {
            if (err) throw err;
            console.log("Number of teams inserted: " + result.affectedRows);
            let teamID = result.insertId;
            for (let i = 0; i < values.length; i++) {
                values[i].push(teamID)
        }
        dbConnection.query(sql_player, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of persons inserted: " + result.affectedRows);
            req.flash('success', 'สมัครเข้าร่วมการแข่งขันแล้ว');
            res.redirect('/tnmdetail/'+tnmID);
                
        })
        
    })
}else{
    req.flash('error','รหัส OTP ไม่ถูกต้อง');
    res.render('userside/regform/otpteam',{
        teamOTP: teamOTP,
        tnmID: tnmID,
        teamName: teamName,
        NameAgent: NameAgent,
        LnameAgent: LnameAgent,
        teamPhoneA: teamPhoneA,
        uniID: uniID,
        teamEmailA: teamEmailA,
        teamfile: teamfile,
        values: values,
        status_login: req.session.loggedin,})
}

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
    dbConnection.query('SELECT t.*,s.* FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE tnmID =' + tnmID, (err, rows) => {
        if(rows[0].sportPlaynum === 1){
            if(rows[0].tnmTypegame ==='leaderboard'){
                dbConnection.query('SELECT p.*,t.tnmID,m.score FROM matchplay m LEFT JOIN player p ON p.playerID = m.playerID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
            res.render('userside/tnm/bracket/leaderboard', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
                })
            }else if(rows[0].tnmTypegame ==='roundrobin'){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('userside/tnm/bracket/roundrobin', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                })
            }else if(rows[0].tnmTypegame ==='single'){
                dbConnection.query(`SELECT * FROM player WHERE playerStatus='accept' AND tnmID =`+tnmID,(err,result)=>{
                    if(result.length === 3){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single3', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                    }else if(result.length === 4){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single4', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 5){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single5', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 6){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single6', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 7){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single7', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 8){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single8', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 9){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single9', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 10){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single10', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 11){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single11', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 12){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single12', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 13){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single13', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 14){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single14', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 15){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single15', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else if(result.length === 16){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single16', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }else{
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                            })
                    }
                })
            }else if(rows[0].tnmTypegame ==='roundsingle'){
                dbConnection.query(`SELECT * FROM player WHERE playerStatus ='accept' AND tnmID =`+tnmID,(err,roundsingle)=>{
                    let rsnum = Math.pow(2,Math.floor(Math.log2(roundsingle.length)));
                    if(rsnum === 4){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                            res.render('userside/tnm/bracket/roundsingle/roundsingle4', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                    }else if(rsnum === 8){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                            res.render('userside/tnm/bracket/roundsingle/roundsingle8', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                    }else{
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                            res.render('userside/tnm/bracket/roundsingle/roundsingle', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                    }
                })
            }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID,status_login: req.session.loggedin });
            }
        }else{
            if(rows[0].tnmTypegame ==='leaderboard'){
                dbConnection.query('SELECT team.teamName AS playerFName,t.tnmID,m.score FROM matchplay m LEFT JOIN team team ON team.teamID = m.teamID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
                    res.render('userside/tnm/bracket/leaderboard', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
                        })
            }else if(rows[0].tnmTypegame ==='roundrobin'){

                dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('userside/tnm/bracket/roundrobin', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                })
        }else if(rows[0].tnmTypegame ==='single'){
            dbConnection.query(`SELECT * FROM team WHERE teamStatus ='accept' AND tnmID =`+tnmID,(err,result)=>{
                if(result.length === 3){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                    res.render('userside/tnm/bracket/single/single3', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                    })
                }else if(result.length === 4){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single4', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 5){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single5', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 6){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single6', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 7){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single7', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 8){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single8', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 9){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single9', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 10){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single10', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 11){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single11', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 12){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single12', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 13){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single13', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 14){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single14', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 15){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single15', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else if(result.length === 16){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single16', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }else{
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                        })
                }
            })
        }else if(rows[0].tnmTypegame ==='roundsingle'){
            dbConnection.query(`SELECT * FROM team WHERE teamStatus ='accept' AND tnmID =`+tnmID,(err,roundsingle)=>{
                let rsnum = Math.pow(2,Math.floor(Math.log2(roundsingle.length)));
                if(rsnum === 4){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('userside/tnm/bracket/roundsingle/roundsingle4', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                    })
                }else if(rsnum === 8){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('userside/tnm/bracket/roundsingle/roundsingle8', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                    })
                }else{
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('userside/tnm/bracket/roundsingle/roundsingle', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                    })
                }
            })
        }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID,status_login: req.session.loggedin });
            }

        }
    })
    
})


router.get('/tnmparticipant/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName,f.name AS FacName FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID WHERE t.tnmID = ' + tnmID, (err, rows) => {
        if(rows.length){
        if (rows[0].teamID === null){
            res.render('userside/tnm/tnmparticipant', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        } else {
            dbConnection.query('SELECT * FROM team WHERE tnmID = '+tnmID, (err, rows) => {
            res.render('userside/tnm/tnmparticipant', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
        })
    }
}
else{
    res.render('userside/tnm/tnmparticipant',{tnmID: tnmID,status_login: req.session.loggedin});
}
})
})

router.get('/tnmmatch/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) throw err;
        if(rows[0].sportPlaynum === 1){
            if(rows[0].tnmTypegame === 'leaderboard'){
                dbConnection.query('SELECT p.*,t.tnmID,m.score,m.pDate,m.time,pl.placeName FROM matchplay m LEFT JOIN player p ON p.playerID = m.playerID LEFT JOIN tournament t ON t.tnmID = m.tnmID LEFT JOIN place pl ON pl.placeID = m.placeID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
            res.render('userside/tnm/match/leadersingle', { data: rows,tnmID: tnmID,status_login: req.session.loggedin });
                })
            }else if(rows[0].tnmTypegame === 'roundrobin'){
                dbConnection.query("SELECT p1.playerID AS p1ID,p1.playerFName AS player1_name,p2.playerID AS p2ID, p2.playerFName AS player2_name, m.score1, m.score2,m.pDate,m.time,m.timeend,place.placeName FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                    if(error) throw error;
                    dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                        if(err) throw err;
                        res.render('userside/tnm/match/roundrobin',{place: results,data: rows,tnmID:tnmID,status_login: req.session.loggedin})
                    })
                })
        }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID,status_login: req.session.loggedin });
            }
        }else{
            if(rows[0].tnmTypegame === 'leaderboard'){
                dbConnection.query('SELECT team.*,t.tnmID,m.score,m.pDate,m.time,pl.placeName FROM matchplay m LEFT JOIN team team ON team.teamID = m.teamID LEFT JOIN tournament t ON t.tnmID = m.tnmID LEFT JOIN place pl ON pl.placeID = m.placeID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
                    res.render('userside/tnm/match/leaderteam', {data: rows, tnmID:tnmID,status_login: req.session.loggedin});
                    })
            }else if(rows[0].tnmTypegame === 'roundrobin'){
                dbConnection.query("SELECT t1.teamID AS p1ID,t1.teamName AS player1_name,t2.teamID AS p2ID, t2.teamName AS player2_name, m.score1, m.score2,m.pDate,m.time,m.timeend,place.placeName FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                    if(error) throw error;
                    dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                        if(err) throw err;
                        res.render('userside/tnm/match/roundrobin',{place: results,data: rows,tnmID:tnmID,status_login: req.session.loggedin})
                    })
                })
        }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID,status_login: req.session.loggedin });
            }

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
    dbConnection.query('SELECT u.name, u.uniID,t.tnmID, t.tnmName,t.tnmUrl FROM university u INNER JOIN tournament t WHERE tnmID =' +tnmID, (err, rows) => {
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
    let tnmID =req.body.tnmID;

    let playerFiles = [];
    for(let i =1;i <= 3; i++){
        if(req.files[`playerFile${i}`]){
        let playerFile = req.files[`playerFile${i}`];
        console.log(playerFile)
        let  name_pfile = new Date().getTime() +'_'+playerFile.name;
        playerFile.mv('./assets/player/' + name_pfile);
        playerFiles.push(name_pfile);
    }
    }

    let OTP = Math.floor(1000 + Math.random() * 9000);

    dbConnection.query('SELECT * FROM tournament WHERE tnmID ='+tnmID,(error,tnm)=>{
    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: playerEmail,
        subject: 'รหัส OTP สำหรับการยืนยันอีเมลสมัครเข้าร่วมการแข่งขัน',
        text: '',
        html:`<h1>ยืนยันการลงทะเบียนการแข่งขัน `+tnm[0].tnmName+`</h1>
                <h2>รหัส OTP ของคุณคือ : ` + OTP + `</h2>`
      };

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
            playerFile1: playerFiles.join(',')})
        }
      });
    })
})

router.get('/teamreg/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT u.name, u.uniID,t.tnmID,t.tnmUrl, t.tnmName,s.sportName,s.sportPlaynum FROM tournament t INNER JOIN university u LEFT JOIN sport s ON t.sportID = s.sportID WHERE tnmID = ' +tnmID, (err, rows) => {
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
    let uniID = req.body.university[0];
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
    
    let values = [];

    let playerFileName = '';

    for (let i = 0; i < playerFName.length; i++) {
        
        let playerFiles = [];
        for (let j = 1; j <= 3; j++) {
            if(req.files[`playerFile${j}`] && Array.isArray(req.files[`playerFile${j}`])){
                let playerFile = req.files[`playerFile${j}`][i];
                console.log(playerFile)
                let  name_pfile = new Date().getTime() +'_'+playerFile.name;
                playerFile.mv('./assets/player/' + name_pfile);
                playerFiles.push(name_pfile);
            }
            playerFileName = playerFiles.join(',');
          }

        console.log('join',playerFileName);
        
    let rows = await new Promise((resolve, reject) => {
        dbConnection.query('SELECT * FROM player WHERE playerIDCard = ? AND tnmID = ?', [playerIDCard[i], tnmID], (err, rows) => {
        if(rows.length > 0){
            let  detailDoc = 'สมัครซ้ำ';
            values.push([playerFName[i], playerLName[i], playerGender[i], playerBirthday[i], playerPhone[i],playerEmail[i], facultyID[i], playerIDCard[i],playerFileName, detailDoc, tnmID]);
            resolve(rows);
        }else{
            let detailDoc = null;
            values.push([playerFName[i], playerLName[i], playerGender[i], playerBirthday[i], playerPhone[i],playerEmail[i], facultyID[i], playerIDCard[i],playerFileName, detailDoc, tnmID]);
            resolve(rows);
        }
    });
})

}

console.log(values)

        let teamOTP = Math.floor(1000 + Math.random() * 9000);


        dbConnection.query('SELECT * FROM tournament WHERE tnmID = '+tnmID,(error,tnm)=>{
        let mailOptions = {
            from: 'thesissportmanagement@gmail.com',
            to: teamEmailA,
            subject: 'รหัส OTP สำหรับการยืนยันอีเมลสมัครเข้าร่วมการแข่งขัน',
            text: '',
            html:`<h1>ยืนยันการลงทะเบียนการแข่งขัน `+tnm[0].tnmName+`</h1>
                <h2>รหัส OTP ของคุณคือ : ` + teamOTP + `</h2>`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.render('userside/regform/otpteam',{
                teamOTP: teamOTP,
                tnmID: tnmID,
                values: values,
                uniID: uniID,
                teamName: teamName,
                NameAgent: NameAgent,
                LnameAgent: LnameAgent,
                teamPhoneA: teamPhoneA,
                teamEmailA: teamEmailA,
                teamfile: teamfile,
                status_login: req.session.loggedin
                })
            }
          });
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

router.get('/result', async (req,res,next)=>{
    dbConnection.query('SELECT * FROM university', async (error,results)=>{
      let uniID = 1;
      let team = [];
      let solo = [];
      let uniName = [];
      let counttnm = [];
      for(let i = 0; i < results.length; i++){
        let rows = await new Promise((resolve, reject) => {
          dbConnection.query(`SELECT COUNT(t1.st1) AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM team team left join tournament t1 on t1.st1 = team.teamID left join tournament t2 on t2.nd2 = team.teamID left join tournament t3 on t3.rd3 = team.teamID where team.uniID = ${uniID}`, (error, rows) => {
            if (error) reject(error);
            resolve(rows);
          });
        });

        let single = await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT COUNT(t1.st1)AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM player p left join tournament t1 on t1.st1 = p.playerID left join tournament t2 on t2.nd2 = p.playerID left join tournament t3 on t3.rd3 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID where f.uniID = ${uniID}`, (error, single) => {
              if (error) reject(error);
              resolve(single);
            });
          });

        let tnmcount = await new Promise((resolve,reject)=>{ 
            dbConnection.query(`SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN player p ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.teamID IS NULL AND u.uniID = ${uniID}
          UNION ALL
          SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN team ON team.tnmID = t.tnmID LEFT JOIN university u ON u.uniID = team.uniID WHERE team.uniID =${uniID}`,(err,tnmcount)=>{
         if(error) reject(error);
         tnmcount = tnmcount[0].tnmcount+tnmcount[1].tnmcount;
        resolve(tnmcount);
            })
          })
        uniName.push(results[i].name);
        team.push(rows);
        solo.push(single);
        counttnm.push(tnmcount);
        uniID++;
      }
      let merge = [];
      for( let j = 0;j<team.length;j++){
        let st1 = team[j][0].st1 + solo[j][0].st1;
        let nd2 = team[j][0].nd2 + solo[j][0].nd2;
        let rd3 = team[j][0].rd3 + solo[j][0].rd3;
        let uniID = 1+j;
        let name = uniName[j];
        let tnm = counttnm[j];
        merge.push({ uniID,name, st1,nd2,rd3,tnm});
      }
      merge.sort((a,b) => b.st1 - a.st1);
      res.render('userside/result',{merge,status_login: req.session.loggedin})
    
    });
  });

  router.get('/allrank/(:uniID)',async (req,res,next)=>{
    let uniID = req.params.uniID;
    let merge = [];
        let team = await new Promise((resolve, reject) => {
          dbConnection.query(`SELECT COUNT(t1.st1) AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM team team left join tournament t1 on t1.st1 = team.teamID left join tournament t2 on t2.nd2 = team.teamID left join tournament t3 on t3.rd3 = team.teamID where team.uniID = ${uniID}`, (error, rows) => {
            if (error) reject(error);
            resolve(rows);
          });
        });

        let single = await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT COUNT(t1.st1)AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM player p left join tournament t1 on t1.st1 = p.playerID left join tournament t2 on t2.nd2 = p.playerID left join tournament t3 on t3.rd3 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID where f.uniID = ${uniID}`, (error, single) => {
              if (error) reject(error);
              resolve(single);
            });
          });

          let st1 = team[0].st1 + single[0].st1;
          let nd2 = team[0].nd2 + single[0].nd2;
          let rd3 = team[0].rd3 + single[0].rd3;
          let total = st1 + nd2 +rd3;
          merge.push({st1,nd2,rd3,total});

    dbConnection.query(`SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN player p ON p.tnmID = t.tnmID 
          LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.teamID IS NULL AND u.uniID = `+uniID+`
          UNION ALL
          SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN team ON team.tnmID = t.tnmID LEFT JOIN university u ON u.uniID = team.uniID WHERE team.uniID =`+uniID,(err,tnmsum)=>{

        let totaltnm = tnmsum[0].tnmcount + tnmsum[1].tnmcount;            

    dbConnection.query('SELECT * FROM university WHERE uniID = '+uniID, (error,results)=>{
        dbConnection.query(`SELECT t.tnmID, t.tnmName, p.playerID,t.tnmstartDate,s.sportName, 
        CASE WHEN t.st1 = p.playerID THEN '1st' WHEN t.nd2 = p.playerID THEN '2nd' WHEN t.rd3 = p.playerID THEN '3rd' END AS place
        FROM tournament t 
        LEFT JOIN player p ON p.tnmID = t.tnmID 
        LEFT JOIN faculty f ON f.facultyID = p.facultyID 
        LEFT JOIN university u ON u.uniID = f.uniID
        LEFT JOIN sport s ON t.sportID = s.sportID
        WHERE f.uniID =`+uniID, async (err,rows)=>{

            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results,status_login: req.session.loggedin})

      });
    })
    })
   })


router.get('/gold/(:uniID)',async (req,res,next)=>{
    let uniID = req.params.uniID;
    let merge = [];
        let team = await new Promise((resolve, reject) => {
          dbConnection.query(`SELECT COUNT(t1.st1) AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM team team left join tournament t1 on t1.st1 = team.teamID left join tournament t2 on t2.nd2 = team.teamID left join tournament t3 on t3.rd3 = team.teamID where team.uniID = ${uniID}`, (error, rows) => {
            if (error) reject(error);
            resolve(rows);
          });
        });

        let single = await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT COUNT(t1.st1)AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM player p left join tournament t1 on t1.st1 = p.playerID left join tournament t2 on t2.nd2 = p.playerID left join tournament t3 on t3.rd3 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID where f.uniID = ${uniID}`, (error, single) => {
              if (error) reject(error);
              resolve(single);
            });
          });

          let st1 = team[0].st1 + single[0].st1;
          let nd2 = team[0].nd2 + single[0].nd2;
          let rd3 = team[0].rd3 + single[0].rd3;
          let total = st1 + nd2 +rd3;
          merge.push({st1,nd2,rd3,total});

    dbConnection.query(`SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN player p ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.teamID IS NULL AND u.uniID = `+uniID+`
          UNION ALL
          SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN team ON team.tnmID = t.tnmID LEFT JOIN university u ON u.uniID = team.uniID WHERE team.uniID =`+uniID,(err,tnmsum)=>{

        let totaltnm = tnmsum[0].tnmcount + tnmsum[1].tnmcount;            

    dbConnection.query('SELECT * FROM university WHERE uniID = '+uniID, (error,results)=>{
        dbConnection.query(`SELECT t.tnmID,s.sportName,t.tnmName,t.tnmstartDate,t.st1 FROM team team left join tournament t on t.st1 = team.teamID LEFT JOIN sport s ON s.sportID = t.sportID WHERE team.uniID = `+uniID+` AND t.st1 IS NOT NULL
        UNION
        SELECT t.tnmID,s.sportName,t.tnmName,t.tnmstartDate,t.st1 FROM player p left join tournament t on t.st1 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN sport s ON s.sportID = t.sportID where f.uniID = `+uniID+` AND t.st1 IS NOT NULL ORDER BY sportName;`, async (err,rows)=>{
        
console.log(rows)
            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results,status_login: req.session.loggedin})

      });
    })
    })
   })

   router.get('/silver/(:uniID)',async (req,res,next)=>{
    let uniID = req.params.uniID;
    let merge = [];
        let team = await new Promise((resolve, reject) => {
          dbConnection.query(`SELECT COUNT(t1.st1) AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM team team left join tournament t1 on t1.st1 = team.teamID left join tournament t2 on t2.nd2 = team.teamID left join tournament t3 on t3.rd3 = team.teamID where team.uniID = ${uniID}`, (error, rows) => {
            if (error) reject(error);
            resolve(rows);
          });
        });

        let single = await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT COUNT(t1.st1)AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM player p left join tournament t1 on t1.st1 = p.playerID left join tournament t2 on t2.nd2 = p.playerID left join tournament t3 on t3.rd3 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID where f.uniID = ${uniID}`, (error, single) => {
              if (error) reject(error);
              resolve(single);
            });
          });

          let st1 = team[0].st1 + single[0].st1;
          let nd2 = team[0].nd2 + single[0].nd2;
          let rd3 = team[0].rd3 + single[0].rd3;
          let total = st1 + nd2 +rd3;
          merge.push({st1,nd2,rd3,total});

    dbConnection.query(`SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN player p ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.teamID IS NULL AND u.uniID = `+uniID+`
          UNION ALL
          SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN team ON team.tnmID = t.tnmID LEFT JOIN university u ON u.uniID = team.uniID WHERE team.uniID =`+uniID,(err,tnmsum)=>{

        let totaltnm = tnmsum[0].tnmcount + tnmsum[1].tnmcount;            

    dbConnection.query('SELECT * FROM university WHERE uniID = '+uniID, (error,results)=>{
        dbConnection.query(`SELECT t.tnmID,s.sportName,t.tnmName,t.tnmstartDate,t.nd2 FROM team team left join tournament t on t.nd2 = team.teamID LEFT JOIN sport s ON s.sportID = t.sportID WHERE team.uniID = `+uniID+` AND t.nd2 IS NOT NULL
        UNION
        SELECT t.tnmID,s.sportName,t.tnmName,t.tnmstartDate,t.nd2 FROM player p left join tournament t on t.nd2 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN sport s ON s.sportID = t.sportID where f.uniID = `+uniID+` AND t.nd2 IS NOT NULL ORDER BY sportName;`, async (err,rows)=>{
        

            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results,status_login: req.session.loggedin})

      });
    })
    })
   })

   router.get('/bronze/(:uniID)',async (req,res,next)=>{
    let uniID = req.params.uniID;
    let merge = [];
        let team = await new Promise((resolve, reject) => {
          dbConnection.query(`SELECT COUNT(t1.st1) AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM team team left join tournament t1 on t1.st1 = team.teamID left join tournament t2 on t2.nd2 = team.teamID left join tournament t3 on t3.rd3 = team.teamID where team.uniID = ${uniID}`, (error, rows) => {
            if (error) reject(error);
            resolve(rows);
          });
        });

        let single = await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT COUNT(t1.st1)AS st1,COUNT(t2.nd2) AS nd2,COUNT(t3.rd3) AS rd3 FROM player p left join tournament t1 on t1.st1 = p.playerID left join tournament t2 on t2.nd2 = p.playerID left join tournament t3 on t3.rd3 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID where f.uniID = ${uniID}`, (error, single) => {
              if (error) reject(error);
              resolve(single);
            });
          });

          let st1 = team[0].st1 + single[0].st1;
          let nd2 = team[0].nd2 + single[0].nd2;
          let rd3 = team[0].rd3 + single[0].rd3;
          let total = st1 + nd2 +rd3;
          merge.push({st1,nd2,rd3,total});

    dbConnection.query(`SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN player p ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.teamID IS NULL AND u.uniID = `+uniID+`
          UNION ALL
          SELECT COUNT(t.tnmID) AS tnmcount FROM tournament t LEFT JOIN team ON team.tnmID = t.tnmID LEFT JOIN university u ON u.uniID = team.uniID WHERE team.uniID =`+uniID,(err,tnmsum)=>{

        let totaltnm = tnmsum[0].tnmcount + tnmsum[1].tnmcount;            

    dbConnection.query('SELECT * FROM university WHERE uniID = '+uniID, (error,results)=>{
        dbConnection.query(`SELECT t.tnmID,s.sportName,t.tnmName,t.tnmstartDate,t.rd3 FROM team team left join tournament t on t.rd3 = team.teamID LEFT JOIN sport s ON s.sportID = t.sportID WHERE team.uniID = `+uniID+` AND t.rd3 IS NOT NULL
        UNION
        SELECT t.tnmID,s.sportName,t.tnmName,t.tnmstartDate,t.rd3 FROM player p left join tournament t on t.rd3 = p.playerID LEFT JOIN faculty f ON p.facultyID = f.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN sport s ON s.sportID = t.sportID where f.uniID = `+uniID+` AND t.rd3 IS NOT NULL ORDER BY sportName;`, async (err,rows)=>{
        

            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results,status_login: req.session.loggedin})

      });
    })
    })
   })

   router.get('/opening',(req,res,next)=>{
    dbConnection.query('SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.Rstartdate >= CURRENT_DATE() OR t.Renddate <= CURRENT_DATE() GROUP BY t.tnmID;',(error,results)=>{
       res.render('userside/status/opening',{data:results,status_login: req.session.loggedin})
    })
   })

   router.get('/ongoing',(req,res,next)=>{
    dbConnection.query('SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmStartdate >= CURRENT_DATE() OR t.tnmEnddate <= CURRENT_DATE() GROUP BY t.tnmID;',(error,results)=>{
       res.render('userside/status/ongoing',{data:results,status_login: req.session.loggedin})
    })
   })

   router.get('/ending',(req,res,next)=>{
    dbConnection.query('SELECT * FROM tournament WHERE st1 IS NOT NULL',(error,results)=>{
       res.render('userside/status/ending',{data:results,status_login: req.session.loggedin})
    })
   })

   router.get('/search',(req,res,next)=>{
    dbConnection.query('SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID GROUP BY t.tnmID;',(error,results)=>{
       res.render('userside/status/search',{data:results,status_login: req.session.loggedin})
    })
   })

   router.post('/search-result',(req,res,next)=>{
    let query = req.body.search;
    let sport = req.body.sport;
    let status = req.body.status;

    if(!query && !sport && !status){
        res.redirect('/search');
    }
    
    let sql;
    let like;
    
     if(query){
     sql = "SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmName LIKE ? GROUP BY t.tnmID;";
     like = ['%' + query + '%'];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('userside/status/search', {data: results,status_login: req.session.loggedin});
    });
    }else if(sport){ 
     sql = "SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE s.sportID LIKE ? GROUP BY t.tnmID;";
     like = ['%' + sport + '%'];
        dbConnection.query(sql, like, (err, results) => {
            if(err) throw err;
            res.render('userside/status/search', {data: results,status_login: req.session.loggedin});
        });
    }else if(status) {
        if(status === 'opening'){
    sql = "SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.Rstartdate >= CURRENT_DATE() OR t.Renddate <= CURRENT_DATE() GROUP BY t.tnmID;";
    like = [status];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('userside/status/search', {data: results,status_login: req.session.loggedin});
    });
        }else if(status === 'ongoing'){
            sql = "SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmStartdate >= CURRENT_DATE() OR t.tnmEnddate <= CURRENT_DATE() GROUP BY t.tnmID;";
            like = [status];
            dbConnection.query(sql, like, (err, results) => {
                if(err) throw err;
                res.render('userside/status/search', {data: results,status_login: req.session.loggedin});
            });
        }else if(status === 'ending'){
            sql = "SELECT * FROM tournament WHERE st1 IS NOT NULL";
            dbConnection.query(sql,(err, results) => {
                if(err) throw err;
                res.render('userside/status/search', {data: results,status_login: req.session.loggedin});
            });
        }
  }

   })

   router.get('/mosingle/(:playerID)',(req,res)=>{
    let playerID = req.params.playerID;
    dbConnection.query('SELECT * FROM player WHERE playerID ='+playerID,(error,result)=>{
    if(result.length && result[0].playerStatus === 'edit'){
        res.render('userside/email/singlereg',{data: result,status_login: req.session.loggedin});
    }else{
        res.redirect('/');
    }
    })
   })


   router.post('/editemailsingle/(:playerID)',(req,res)=>{
    let playerID = req.params.playerID;
    dbConnection.query('SELECT * FROM player WHERE playerID ='+playerID,(error,result)=>{
        
    if(result.length && result[0].playerStatus === 'edit'){
        res.render('userside/email/singlereg',{data: result,status_login: req.session.loggedin});
    }else{
        res.redirect('/');
    }
    })
   })

module.exports = router;