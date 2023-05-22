let express = require('express');
let router = express.Router();
let dbConnection = require('../../util/db');
const path = require('path');
const nodemailer = require('nodemailer');
const { resolve } = require('path');
const url = require('url');
const querystring = require('querystring');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thesissportmanage@gmail.com',
      pass: 'vtevtgdhgebnyqog'
    }
  });

// display tnmcheck page
router.get('/', function(req, res, next){
    dbConnection.query(`SELECT t.*,s.sportPlaynum,COUNT(p.playerID) as nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON p.tnmID = t.tnmID WHERE CURRENT_DATE() BETWEEN t.Rstartdate AND t.Renddate GROUP BY t.tnmID ORDER BY t.Rstartdate DESC LIMIT 4`, (err, opening) => {
         if (err) console.log('error',err);
         dbConnection.query(`SELECT t.*,s.sportPlaynum,COUNT(p.playerID) as nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON p.tnmID = t.tnmID WHERE CURRENT_DATE() BETWEEN t.tnmStartdate AND t.tnmEnddate GROUP BY t.tnmID ORDER BY t.tnmStartdate DESC LIMIT 4`,(err,ongoing)=>{
            if (err) console.log('error',err);
            dbConnection.query(`SELECT t.*,s.sportPlaynum,COUNT(p.playerID) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON p.tnmID = t.tnmID WHERE t.st1 IS NOT NULL GROUP BY t.tnmID ORDER BY t.tnmEnddate DESC LIMIT 4`,(err,ending)=>{
                if (err) console.log('error',err);
                res.render('userside/index', { opening,ongoing,ending});
    })
})
})
})

router.post('/verifysingle', function(req, res, next) {
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
            playerFile1: playerFile1
        })
        
    }
});

router.post('/verifyteam', function(req, res, next) {
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
        values: values})
}

})


router.get('/showall', function(req, res, next) {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/showall', { data: '' });
        } else {
            res.render('userside/showall', { data: rows });
        }
    })
})

router.get('/tnmdetail/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament LEFT JOIN sport ON tournament.sportID = sport.sportID WHERE tnmID = ' + tnmID, (err, rows) => {
        res.render('userside/tnm/tnmdetail', { data: rows,tnmID: tnmID});
    })
})

router.get('/tnmbracket/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.*,s.* FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE tnmID =' + tnmID, (err, rows) => {
        if(rows[0].sportPlaynum === 1){
            if(rows[0].tnmTypegame ==='leaderboard'){
                dbConnection.query('SELECT p.*,t.tnmID,m.score FROM matchplay m LEFT JOIN player p ON p.playerID = m.playerID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
            res.render('userside/tnm/bracket/leaderboard', { data: rows,tnmID: tnmID });
                })
            }else if(rows[0].tnmTypegame ==='roundrobin'){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('userside/tnm/bracket/roundrobin', {data: rows, tnmID:tnmID});
                })
            }else if(rows[0].tnmTypegame ==='single'){
                dbConnection.query(`SELECT * FROM player WHERE playerStatus='accept' AND tnmID =`+tnmID,(err,result)=>{
                    if(result.length === 3){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single3', {data: rows, tnmID:tnmID});
                        })
                    }else if(result.length === 4){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single4', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 5){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single5', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 6){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single6', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 7){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single7', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 8){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single8', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 9){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single9', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 10){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single10', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 11){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single11', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 12){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single12', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 13){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single13', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 14){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single14', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 15){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single15', {data: rows, tnmID:tnmID});
                            })
                    }else if(result.length === 16){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single16', {data: rows, tnmID:tnmID});
                            })
                    }else{
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(err,rows)=>{
                            res.render('userside/tnm/bracket/single/single', {data: rows, tnmID:tnmID});
                            })
                    }
                })
            }else if(rows[0].tnmTypegame ==='roundsingle'){
                dbConnection.query(`SELECT * FROM player WHERE playerStatus ='accept' AND tnmID =`+tnmID,(err,roundsingle)=>{
                    let rsnum = Math.pow(2,Math.floor(Math.log2(roundsingle.length)));
                    if(rsnum === 4){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2,m.seed FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                            res.render('userside/tnm/bracket/roundsingle/roundsingle4', {data: rows, tnmID:tnmID});
                        })
                    }else if(rsnum === 8){
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2,m.seed FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                            res.render('userside/tnm/bracket/roundsingle/roundsingle8', {data: rows, tnmID:tnmID});
                        })
                    }else{
                        dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2,m.seed FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                            res.render('userside/tnm/bracket/roundsingle/roundsingle', {data: rows, tnmID:tnmID});
                        })
                    }
                })
            }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID});
            }
        }else{
            if(rows[0].tnmTypegame ==='leaderboard'){
                dbConnection.query('SELECT team.teamName AS playerFName,t.tnmID,m.score FROM matchplay m LEFT JOIN team team ON team.teamID = m.teamID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
                    res.render('userside/tnm/bracket/leaderboard', { data: rows,tnmID: tnmID });
                        })
            }else if(rows[0].tnmTypegame ==='roundrobin'){

                dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('userside/tnm/bracket/roundrobin', {data: rows, tnmID:tnmID});
                })
        }else if(rows[0].tnmTypegame ==='single'){
            dbConnection.query(`SELECT * FROM team WHERE teamStatus ='accept' AND tnmID =`+tnmID,(err,result)=>{
                if(result.length === 3){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                    res.render('userside/tnm/bracket/single/single3', {data: rows, tnmID:tnmID});
                    })
                }else if(result.length === 4){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single4', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 5){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single5', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 6){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single6', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 7){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single7', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 8){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single8', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 9){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single9', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 10){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single10', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 11){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single11', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 12){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single12', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 13){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single13', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 14){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single14', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 15){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single15', {data: rows, tnmID:tnmID});
                        })
                }else if(result.length === 16){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single16', {data: rows, tnmID:tnmID});
                        })
                }else{
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID = `+tnmID,(err,rows)=>{
                        res.render('userside/tnm/bracket/single/single', {data: rows, tnmID:tnmID});
                        })
                }
            })
        }else if(rows[0].tnmTypegame ==='roundsingle'){
            dbConnection.query(`SELECT * FROM team WHERE teamStatus ='accept' AND tnmID =`+tnmID,(err,roundsingle)=>{
                let rsnum = Math.pow(2,Math.floor(Math.log2(roundsingle.length)));
                if(rsnum === 4){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2,m.seed,t1.teamPic as pic1,t2.teamPic as pic2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('userside/tnm/bracket/roundsingle/roundsingle4', {data: rows, tnmID:tnmID});
                    })
                }else if(rsnum === 8){
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2,m.seed FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('userside/tnm/bracket/roundsingle/roundsingle8', {data: rows, tnmID:tnmID});
                    })
                }else{
                    dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2,m.seed FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('userside/tnm/bracket/roundsingle/roundsingle', {data: rows, tnmID:tnmID});
                    })
                }
            })
        }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID});
            }

        }
    })
    
})


router.get('/tnmparticipant/(:tnmID)',function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query(`SELECT * FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID =`+tnmID,(err,result)=>{
        
        if (result[0].sportPlaynum === 1){
            dbConnection.query(`SELECT *,f.name AS facName,u.name AS uniName,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age FROM player p LEFT JOIN faculty f ON p.facultyID = f.facultyID 
            LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerStatus ='accept' AND p.tnmID = `+tnmID,(err,rows)=>{
                res.render('userside/tnm/participant/singleparticipant', { data: rows,tnmID: tnmID});
        })
        }else{
            dbConnection.query(`SELECT * FROM team WHERE teamStatus ='accept' AND tnmID = `+tnmID,(err,rows)=>{
            dbConnection.query(`SELECT *,f.name AS facName,u.name AS uniName,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age FROM player p LEFT JOIN faculty f ON p.facultyID = f.facultyID 
            LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerStatus ='accept' AND p.tnmID = `+tnmID,(err,player)=>{
            res.render('userside/tnm/participant/teamparticipant', { player,data: rows,tnmID: tnmID});
            })
            })
        }

    })

})

router.get('/tnmmatch/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) throw err;
        if(rows[0].sportPlaynum === 1){
            if(rows[0].tnmTypegame === 'leaderboard'){
                dbConnection.query('SELECT p.*,t.tnmID,m.score,m.pDate,m.time,pl.placeName,pl.placeID FROM matchplay m LEFT JOIN player p ON p.playerID = m.playerID LEFT JOIN tournament t ON t.tnmID = m.tnmID LEFT JOIN place pl ON pl.placeID = m.placeID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
            res.render('userside/tnm/match/leadersingle', { data: rows,tnmID: tnmID });
                })
            }else if(rows[0].tnmTypegame === 'roundrobin'){
                dbConnection.query("SELECT p1.playerID AS p1ID,p1.playerFName AS player1_name,p2.playerID AS p2ID, p2.playerFName AS player2_name,m.matchID,m.round, m.score1,m.matchfile, m.score2,m.pDate, DATE_FORMAT(m.time, '%H:%i') as time,m.timeend,place.placeName,place.placeID,m.seed FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID ="+tnmID, (error, rows) => {
                    if(error) throw error;
                    dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                        if(err) throw err;
                        res.render('userside/tnm/match/match',{place: results,data: rows,tnmID:tnmID})
                    })
                })
        }else if(rows[0].tnmTypegame === 'single'){
            dbConnection.query("SELECT p1.playerID AS p1ID,p1.playerFName AS player1_name,p2.playerID AS p2ID, p2.playerFName AS player2_name,m.matchID,m.round, m.score1,m.matchfile, m.score2,m.pDate, DATE_FORMAT(m.time, '%H:%i') as time,m.timeend,place.placeName,place.placeID,m.seed FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID ="+tnmID, (error, rows) => {
                if(error) throw error;
                dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                    if(err) throw err;
                    res.render('userside/tnm/match/match',{place: results,data: rows,tnmID:tnmID})
                })
            })
        }else if(rows[0].tnmTypegame === 'roundsingle'){
            dbConnection.query("SELECT p1.playerID AS p1ID,p1.playerFName AS player1_name,p2.playerID AS p2ID, p2.playerFName AS player2_name,m.matchID,m.round, m.score1,m.matchfile, m.score2,m.pDate, DATE_FORMAT(m.time, '%H:%i') as time,m.timeend,place.placeName,place.placeID,m.seed FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID ="+tnmID, (error, rows) => {
                if(error) throw error;
                dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                    if(err) throw err;
                    res.render('userside/tnm/match/match',{place: results,data: rows,tnmID:tnmID})
                })
            })
        }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID});
            }
        }else{
            if(rows[0].tnmTypegame === 'leaderboard'){
                dbConnection.query('SELECT team.*,t.tnmID,m.score,m.pDate,m.time,pl.placeName,pl.placeID FROM matchplay m LEFT JOIN team team ON team.teamID = m.teamID LEFT JOIN tournament t ON t.tnmID = m.tnmID LEFT JOIN place pl ON pl.placeID = m.placeID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
                    res.render('userside/tnm/match/leaderteam', {data: rows, tnmID:tnmID});
                    })
            }else if(rows[0].tnmTypegame === 'roundrobin'){
                dbConnection.query("SELECT t1.teamID AS p1ID,t1.teamName AS player1_name,t2.teamID AS p2ID, t2.teamName AS player2_name, m.score1, m.score2,m.pDate,m.time,m.timeend,place.placeName FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                    if(error) throw error;
                    dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                        if(err) throw err;
                        res.render('userside/tnm/match/match',{place: results,data: rows,tnmID:tnmID})
                    })
                })
        }else if(rows[0].tnmTypegame === 'single'){
            dbConnection.query("SELECT t1.teamID AS p1ID,t1.teamName AS player1_name,t2.teamID AS p2ID, t2.teamName AS player2_name, m.score1, m.score2,m.pDate,m.time,m.timeend,place.placeName,place.placeID FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                if(error) throw error;
                dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                    if(err) throw err;
                    res.render('userside/tnm/match/match',{place: results,data: rows,tnmID:tnmID})
                })
            })
        }else if(rows[0].tnmTypegame === 'roundsingle'){
            dbConnection.query("SELECT t1.teamID AS p1ID,t1.teamName AS player1_name,t2.teamID AS p2ID, t2.teamName AS player2_name, m.score1, m.score2,m.pDate,m.time,m.timeend,place.placeName,place.placeID FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                if(error) throw error;
                dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                    if(err) throw err;
                    res.render('userside/tnm/match/match',{place: results,data: rows,tnmID:tnmID})
                })
            })
        }else{
                res.render('userside/tnm/blankpage',{tnmID: tnmID });
            }

        }

    })
})

router.get('/tnmrank/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmrank', { data: '' });
        } else {
            res.render('userside/tnm/tnmrank', { data: rows,tnmID: tnmID});
        }
    })
})

router.get('/tnmhighlight/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM highlight h LEFT JOIN tournament t ON t.tnmID = h.tnmID WHERE h.tnmID = ' + tnmID, (err, rows) => {
            res.render('userside/tnm/tnmhighlight', { data: rows,tnmID: tnmID});
    })
})

router.get('/tnmplace/(:placeID)', function (req, res, next){
    let placeID = req.params.placeID;
    dbConnection.query(`SELECT * FROM place WHERE placeID = `+placeID , async (err,rows) =>{
        
        res.render('userside/tnm/tnmplace',{data:rows,URL:rows[0].placeUrl});
    })
    

})

router.get('/singlereg/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID = ?',tnmID, (err, rows) => {
        dbConnection.query('SELECT * FROM university',(err, uni)=>{
            dbConnection.query('SELECT * FROM faculty',(err, fac)=>{
                res.render('userside/regform/singlereg', { data: rows,tnmID: tnmID,uni:uni,fac:fac });
            })
        })
    })
})

router.post('/singlereg', function(req, res, next) {

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

router.get('/teamreg/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT u.name, u.uniID,t.tnmID,t.tnmUrl, t.tnmName,s.sportName,s.sportPlaynum FROM tournament t INNER JOIN university u LEFT JOIN sport s ON t.sportID = s.sportID WHERE tnmID = ' +tnmID, (err, rows) => {
                res.render('userside/regform/teamreg', { data: rows,});
    })
})

router.post('/teamreg', async function(req, res, next){
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

    console.log(req.body);
    console.log(req.files);
    
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
                teamfile: teamfile
                })
            }
          });
        })
})


router.post("/fetch_faculty", function(req, res, next) {
    var uniID = req.body.uniID;
    var fac_query = "SELECT * FROM faculty WHERE uniID = ?";
    dbConnection.query(fac_query, [uniID], function(err, results) {
        if (err) throw err;
        res.send(results);
    });
});

router.get('/result', async function(req,res,next){
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
      res.render('userside/result',{merge})
    
    });
  });

  router.get('/allrank/(:uniID)',async function(req,res,next) {
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

            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results})

      });
    })
    })
   })


router.get('/gold/(:uniID)',async function(req,res,next){
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
            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results})

      });
    })
    })
   })

   router.get('/silver/(:uniID)',async function(req,res,next){
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
        

            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results})

      });
    })
    })
   })

   router.get('/bronze/(:uniID)',async function(req,res,next){
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
        

            res.render('userside/uniresult',{totaltnm,merge,data:rows,uni:results})

      });
    })
    })
   })

   router.get('/opening', function(req,res,next){
    dbConnection.query(`SELECT t.*,s.sportPlaynum,COUNT(p.playerID) as nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON p.tnmID = t.tnmID WHERE CURRENT_DATE() BETWEEN t.Rstartdate AND t.Renddate GROUP BY t.tnmID ORDER BY t.Rstartdate DESC`,(error,results)=>{
        res.render('userside/status/opening',{data:results})
    })
   })

   router.get('/ongoing', function(req,res,next){
    dbConnection.query(`SELECT t.*,s.sportPlaynum,COUNT(p.playerID) as nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON p.tnmID = t.tnmID WHERE CURRENT_DATE() BETWEEN t.tnmStartdate AND t.tnmEnddate GROUP BY t.tnmID ORDER BY t.tnmStartdate DESC`,(error,results)=>{
        res.render('userside/status/ongoing',{data:results})
    })
   })

   router.get('/ending', function(req,res,next){
    dbConnection.query(`SELECT t.*,s.sportPlaynum,COUNT(p.playerID) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON p.tnmID = t.tnmID WHERE t.st1 IS NOT NULL GROUP BY t.tnmID ORDER BY t.tnmEnddate DESC`,(error,results)=>{
       res.render('userside/status/ending',{data:results})
    })
   })

   router.get('/search', function(req,res,next){
    dbConnection.query('SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID  GROUP BY t.tnmID ORDER BY t.tnmStartdate DESC;',(error,results)=>{
        dbConnection.query(`SELECT * FROM sport ORDER BY sportID ASC`,(error,rows)=>{
       res.render('userside/status/search',{data:results,sport:rows})
    })
    })
   })

   router.post('/search-result', function(req,res,next){
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
        res.render('userside/status/search', {data: results});
    });
    }else if(sport){ 
     sql = "SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE s.sportID LIKE ? GROUP BY t.tnmID;";
     like = ['%' + sport + '%'];
        dbConnection.query(sql, like, (err, results) => {
            if(err) throw err;
            res.render('userside/status/search', {data: results});
        });
    }else if(status) {
        if(status === 'opening'){
    sql = "SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.Rstartdate >= CURRENT_DATE() OR t.Renddate <= CURRENT_DATE()  GROUP BY t.tnmID;";
    like = [status];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        results.filter(item => item.st1 === null);
        res.render('userside/status/search', {data: results});
    });
        }else if(status === 'ongoing'){
            sql = "SELECT t.*,s.*,count(p.playerFName) AS nop FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmStartdate >= CURRENT_DATE() OR t.tnmEnddate <= CURRENT_DATE() GROUP BY t.tnmID;";
            like = [status];
            dbConnection.query(sql, like, (err, results) => {
                if(err) throw err;
                results.filter(item => item.st1 === null);
                res.render('userside/status/search', {data: results});
            });
        }else if(status === 'ending'){
            sql = "SELECT * FROM tournament WHERE st1 IS NOT NULL";
            dbConnection.query(sql,(err, results) => {
                if(err) throw err;
                res.render('userside/status/search', {data: results});
            });
        }
  }

   })

   router.get('/mosingle/(:playerID)', function(req,res,next){
    let playerID = req.params.playerID;
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,t.tnmUrl,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+playerID,(error,result)=>{
    if(result.length && result[0].playerStatus === 'edit'){
        res.render('userside/email/singlereg',{data: result});
    }else{
        res.redirect('/');
    }
    })
   })
   
    router.get('/moteam/(:teamID)', function(req, res, next) {
    let thisteamID = req.params.teamID;
    dbConnection.query('SELECT t.*, p.*, f.name AS facName, u.name AS uniName, tn.tnmName FROM team t JOIN player p ON t.teamID = p.teamID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN tournament tn ON tn.tnmID = t.tnmID WHERE t.teamID ='+thisteamID, (err, rows) => {
        if(rows.length && rows[0].teamStatus === 'edit'){
            res.render('userside/email/teamreg',{data: rows});
        }else{
            res.redirect('/');
        }
    })
})


   router.post('/editemailsingle/(:playerID)', function(req,res,next){
    let thisplayerID = req.params.playerID;
    let playerID = req.body.playerID;
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let playerIDCard = req.body.playerIDCard;
    let detailDoc =req.body.playerdetailDoc;
    let tnmID =req.body.tnmID;
    console.log(req.body);
    let form_data = {
    tnmID: tnmID,
    playerFName: playerFName,
    playerLName: playerLName,
    playerGender: playerGender,
    playerBirthday: playerBirthday,
    playerPhone: playerPhone,
    playerEmail: playerEmail,
    playerIDCard: playerIDCard,
    detailDoc: detailDoc,
    }
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID, form_data, (err, result) => {
        if (err) {
            console.log(JSON.stringify(err));
            req.flash('error', err)
            res.redirect('')
        } else {
            req.flash('success', 'แก้ไขข้อมูลสำเร็จ');
            res.redirect('/email/check/player/'+playerID);
        }
    })

   
   })
   router.post('/editemailteam/(:teamID)', function(req,res,next){
    let thisteamID = req.params.teamID;
    let teamID = req.params.teamID;
    
    let teamName = req.body.teamName;
    let NameAgent = req.body.NameAgent;
    let LnameAgent = req.body.LnameAgent;
    let teamPhoneA = req.body.teamPhoneA;
    let teamEmailA = req.body.teamEmailA;
    
    let tnmID = req.body.tnmID;

    let playerID = req.body.playerID;
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let playerIDCard = req.body.playerIDCard;
    let detailDoc = req.body.detailDoc;

    console.log(req.body);
    let values = [];

    for (let i = 0; i < playerFName.length; i++) {
    values.push({playerFName:playerFName[i], playerLName:playerLName[i], playerGender:playerGender[i], playerBirthday:playerBirthday[i], playerPhone:playerPhone[i],playerEmail:playerEmail[i], playerIDCard:playerIDCard[i], detailDoc:detailDoc[i],playerID:playerID[i]})
    }


    let sql_team = "UPDATE team SET teamName  =?, NameAgent =?, LnameAgent =?, teamPhoneA =?, teamEmailA =? WHERE teamID =?";
    let sql_player = "UPDATE player SET playerFName  =?, playerLName =?, playerGender =?, playerBirthday =?, playerPhone =?, playerEmail =?, playerIDCard =?, detailDoc =? WHERE playerID =?";
   
        // insert query db
        dbConnection.query(sql_team ,[teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA  ,thisteamID], (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
                        req.flash('error', err)
                        res.redirect('/')
                throw err
            };
            console.log("Number of teams inserted: " + result.affectedRows);


            for (let i = 0; i < playerFName.length; i++) {
                dbConnection.query(sql_player , [values[i].playerFName  , values[i].playerLName , values[i].playerGender , values[i].playerBirthday , values[i].playerPhone , values[i].playerEmail , values[i].playerIDCard , values[i].detailDoc  ,values[i].playerID ], function (err, result) {
                    if (err) {
                        console.log(JSON.stringify(err));
                                
                                req.flash('error', err)
                                res.redirect('/')
                        throw err
                    }; 
                })
                
                }
                console.log("Number of persons inserted: " + result.affectedRows);
                    req.flash('success', 'แก้ไขข้อมูลสำเร็จ');
                    res.redirect('/email/check/team/'+teamID);
    })
    
    
   })

   router.get('/email/check/player/(:playerID)', function(req, res, next) {

    let thisplayerID = req.params.playerID;

    let playerID = req.body.playerID;
    
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+thisplayerID, (err, rows) => {
        if (err) throw err;
        if(rows.length && rows[0].playerStatus === 'edit'){
            res.render('userside/email/check/player',{data: rows});
        }else{
            res.redirect('/');
        }
    })
})
   router.get('/email/check/team/(:teamID)', function(req, res, next) {
    
    let thisteamID = req.params.teamID;
    dbConnection.query('SELECT t.*, p.*, f.name AS facName, u.name AS uniName, tn.tnmName FROM team t JOIN player p ON t.teamID = p.teamID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN tournament tn ON t.tnmID = tn.tnmID  WHERE t.teamID = '+thisteamID, (err, rows) => {
        if(rows.length && rows[0].playerStatus === 'edit'){
            res.render('userside/email/check/team',{data: rows});
        }else{
            res.redirect('/');
        }
})
})
   

module.exports = router;