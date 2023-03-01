let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
let bodyParser = require("body-parser");
const path = require('path');
    
router.post('/search-tournament', (req, res) => {
    let query = req.body.search;
    if(!query) {
        res.redirect('/tournament');
    } else {
        let sql = 'SELECT t.tnmID, t.tnmName,s.sportName,t.tnmStartdate,s.sportPlaynum,t.tnmTypegame, SUM(CASE p.playerStatus WHEN "accept" THEN 1 ELSE 0 END) AS accept_count FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmTypegame IS NULL AND t.tnmName LIKE ? GROUP BY t.tnmID';
        let like = ['%' + query + '%'];
        dbConnection.query(sql, like, (err, results) => {
            if(err) throw err;
            res.render('tournament', {data: results,status_login: req.session.loggedin,user: user});
        });
    }
});

// display tournament page
router.get('/', (req, res, next) => {
    sql = "SELECT t.tnmID, t.tnmName,s.sportName,t.tnmStartdate,s.sportPlaynum,t.tnmTypegame, SUM(CASE p.playerStatus WHEN 'accept' THEN 1 ELSE 0 END) AS accept_count FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmTypegame IS NULL GROUP BY t.tnmID;";

    dbConnection.query(sql, (err, rows) => {
    if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('/error404');
    }
        })
})

//display add tournament page
router.get('/add', (req, res, next) => {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/add', { data: rows,status_login: req.session.loggedin,user: user});
            }else{
                req.flash('error','ไม่สามารถเข้าถึงได้');
                res.redirect('login');
            }
    })
})


// add new tournament
router.post('/add', (req, res, next) =>{
    let tnmName = req.body.tnmName;
    let sportID = req.body.sportID;
    let Rstartdate = req.body.Rstartdate;
    let Renddate = req.body.Renddate;
    let tnmStartdate = req.body.tnmStartdate;
    let tnmEnddate = req.body.tnmEnddate;
    let tnmUrl = req.body.tnmUrl;
    let tnmDetail = req.body.tnmDetail;
    let errors = false;

    let tnmPicture = req.files.tnmPicture;
    let tnmFile1 = req.files.tnmFile1;

    let name_tnmPicture = new Date().getTime() +'_'+tnmPicture.name;
    let name_tnmFile1 = new Date().getTime() +'_'+tnmFile1.name;

    tnmPicture.mv('./assets/images/' + name_tnmPicture);
    tnmFile1.mv('./assets/doc/' + name_tnmFile1);
    


    // if no error
    if(!errors) {

        let form_data = {
            tnmName: tnmName,
            sportID: sportID,
            Rstartdate: Rstartdate,
            Renddate: Renddate,
            tnmStartdate: tnmStartdate,
            tnmEnddate:tnmEnddate,
            tnmUrl: tnmUrl,
            tnmDetail: tnmDetail,
            tnmPicture: name_tnmPicture,
            tnmFile1: name_tnmFile1
        }

        // insert query db
        dbConnection.query('INSERT INTO tournament SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('tournament/add', {
                    tnmName: form_data.tnmName,
                    sportID: form_data.sportID,
                    Rstartdate: form_data.Rstartdate,
                    Renddate: form_data.Renddate,
                    tnmStartdate: form_data.tnmStartdate,
                    tnmEnddate: form_data.tnmEnddate,
                    tnmUrl: form_data.tnmUrl,
                    tnmDetail: form_data.tnmDetail,
                    tnmPicture: form_data.name_tnmPicture,
                    tnmFile1: form_data.name_tnmFile1
                })
            } else {
                req.flash('success', 'tournament successfully added');
                res.redirect('/tournament');
            }
        })
    }
})

// display edit tournament page
router.get('/edit/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportID,s.sportName,t.Rstartdate,t.Renddate,t.tnmStartdate,t.tnmEnddate,t.tnmDetail,t.tnmPicture,t.tnmFile1 FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID =  ' + tnmID, (err, rows, fields) => {
        if(role === 'เจ้าหน้าที่'){
        if (rows.length <= 0) {
            req.flash('error', 'tournament not found with id = ' + tnmID)
            res.redirect('/tournament');
        } else  {
            res.render('tournament/edit', { data:rows,
                title: 'แก้ไข การแข่งขัน',
                tnmID: rows[0].tnmID,
                tnmName: rows[0].tnmName,
                sportID: rows[0].sportID,
                tnmUrl: rows[0].tnmUrl,
                Rstartdate: rows[0].Rstartdate,
                Renddate: rows[0].Renddate,
                tnmStartdate: rows[0].tnmStartdate,
                tnmEnddate: rows[0].tnmEnddate,
                tnmDetail: rows[0].tnmDetail,
                tnmPicture: rows[0].tnmPicture,
                tnmFile1: rows[0].tnmFile1,status_login: req.session.loggedin,user: user
            })
        }
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
    });
})

// update book page
router.post('/update/:tnmID', (req, res, next) => {
    let tnmID = req.params.tnmID;
    let tnmName = req.body.tnmName;
    let sportID = req.body.sportID;
    let tnmUrl = req.body.tnmUrl;
    let Rstartdate = req.body.Rstartdate;
    let Renddate = req.body.Renddate;
    let tnmStartdate = req.body.tnmStartdate;
    let tnmEnddate = req.body.tnmEnddate;
    let tnmDetail = req.body.tnmDetail;
    let tnmPicture = req.files.tnmPicture;
    let tnmFile1 = req.files.tnmFile1;
    let errors = false;

    let name_tnmPicture = new Date().getTime() +'_'+tnmPicture.name;
    let name_tnmFile1 = new Date().getTime() +'_'+tnmFile1.name;

    tnmPicture.mv('./assets/images/' + name_tnmPicture);
    tnmFile1.mv('./assets/doc/' + name_tnmFile1);


    // if no error
    if (!errors) {
        let form_data = {
            tnmName:  tnmName,
            sportID: sportID,
            tnmUrl: tnmUrl,
            Rstartdate: Rstartdate,
            Renddate: Renddate,
            tnmStartdate: tnmStartdate,
            tnmEnddate:tnmEnddate,
            tnmDetail: tnmDetail,
            tnmPicture: name_tnmPicture,
            tnmFile1: name_tnmFile1
        }
        // update query
        dbConnection.query("UPDATE tournament SET ? WHERE tnmID = " + tnmID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('tournament/edit', {
                    tnmID: req.params.tnmID,
                    tnmName: form_data.tnmName,
                    sportID: form_data.sportID,
                    Rstartdate: form_data.Rstartdate,
                    Renddate: form_data.Renddate,
                    tnmStartdate: form_data.tnmStartdate,
                    tnmEnddate: form_data.tnmEnddate,
                    tnmUrl: form_data.tnmUrl,
                    tnmDetail: form_data.tnmDetail,
                    tnmPicture: form_data.name_tnmPicture,
                    tnmFile1: form_data.name_tnmFile1
                })
            } else {
                req.flash('success', 'tournament successfully updated');
                res.redirect('/tournament')
            }
        })
    }
})

// delete tournament
router.get('/delete/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('DELETE FROM tournament WHERE tnmID = ' + tnmID, (err, result) => {
        if (err) {
            req.flash('error','ไม่สามารถลบการแข่งขันได้'),
            res.redirect('/tournament');
        } else {
            req.flash('success', 'tournament successfully deleted! ID = ' + tnmID);
            res.redirect('/tournament');
        }
    })
})

router.get('/detail/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.*,s.* FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID = ' + tnmID, (err, rows, fields) => {
        if(req.session.loggedin){
            if(role === 'เจ้าหน้าที่'){
                tournamentName = rows[0].tnmName;
                res.render('tournament/detail', { tournamentName,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
            }else{
                req.flash('error','ไม่สามารถเข้าถึงได้');
                res.redirect('login');
        }
    }else{
        res.redirect('/error404');
    }
        })
    })

//หน้าจัดสาย
router.get('/bracket/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.*,s.sportPlaynum FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID =  '+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            tournamentName = rows[0].tnmName;
            if(rows[0].sportPlaynum === 1){
                dbConnection.query('SELECT p.*,t.tnmTypegame FROM tournament t LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmID = '+tnmID, (err, rows) => {
                if(!rows[0].tnmTypegame){
                    res.render('tournament/bracket/createbracket', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                }else if(rows[0].tnmTypegame === 'leaderboard'){
                    dbConnection.query('SELECT p.*,t.tnmID,m.score FROM matchplay m LEFT JOIN player p ON p.playerID = m.playerID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
                    res.render('tournament/bracket/leaderboard', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                    })
                }else if(rows[0].tnmTypegame === 'roundrobin'){
                    dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('tournament/bracket/roundrobin', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                    })
                }else if(rows[0].tnmTypegame === 'single'){
                    dbConnection.query('SELECT * FROM player WHERE tnmID ='+tnmID,(err,result)=>{
                        numplayer = result.length;
                        if(numplayer === 4){
                    dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                        res.render('tournament/bracket/single/single4', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                    })
                }else if(numplayer === 3){
                  dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('tournament/bracket/single/single3', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                })
                }else if(numplayer === 5){
                  dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('tournament/bracket/single/single5', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                })
                }else if(numplayer === 6){
                  dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('tournament/bracket/single/single6', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                })
                }else if(numplayer === 7){
                  dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('tournament/bracket/single/single7', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                })
                }else if(numplayer === 8){
                  dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                      res.render('tournament/bracket/single/single8', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                  })
              }else if(numplayer === 9){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single9', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else if(numplayer === 10){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single10', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else if(numplayer === 11){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single11', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else if(numplayer === 12){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single12', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else if(numplayer === 13){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single13', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else if(numplayer === 14){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single14', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else if(numplayer === 15){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single15', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else if(numplayer === 16){
                dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                  res.render('tournament/bracket/single/single16', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              })
              }else{
                res.render('tournament/bracket/single/single4', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
              }



                
                })
                    
                }else if(rows[0].tnmTypegame === 'roundsingle'){
                  dbConnection.query(`SELECT p1.playerFName AS team1, p2.playerFName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                    res.render('tournament/bracket/roundrobin', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                })
                }else{
                    res.render('tournament/bracket/bracket', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});

                }
            })
            }else{
                dbConnection.query('SELECT team.*,t.* FROM tournament t LEFT JOIN team team ON t.tnmID = team.tnmID WHERE t.tnmID ='+tnmID, (err, rows) => {
                    if(!rows[0].tnmTypegame){
                        res.render('tournament/bracket/createbracket', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                    }else if(rows[0].tnmTypegame === 'leaderboard'){
                        dbConnection.query('SELECT team.*,t.tnmID,m.score FROM matchplay m LEFT JOIN team team ON team.teamID = m.teamID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows) => {
                        res.render('tournament/bracket/teamleaderboard', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                        })
                    }else if(rows[0].tnmTypegame === 'roundrobin'){
                        dbConnection.query(`SELECT t1.teamName AS team1, t2.teamName AS team2, m.score1, m.score2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.tnmID =`+tnmID,(error, rows)=> {
                            res.render('tournament/bracket/roundrobin', {tournamentName,data: rows, tnmID:tnmID,status_login: req.session.loggedin,user: user});
                        })

                    }else{

                    }
                })
            }
            
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
    }
}else{
    res.redirect('/error404');
}
    })
})


//หน้าผู้เข้าร่วม
router.get('/participant/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,t.tnmName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID = '+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            if(rows.length > 0){

            res.render('tournament/participant', {tournamentName, data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
        }else{
                dbConnection.query('SELECT * FROM team WHERE tnmID = '+tnmID, (err, rows) => {
                    res.render('tournament/participant', {tournamentName, data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
                })
            }
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
    }
}else{
    res.redirect('/error404');
}
    })
})

//หน้าแมทช์การแข่งขัน
router.get('/match/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmID ='+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            tournamentName = rows[0].tnmName;
            if(rows[0].sportPlaynum === 1){
                if(rows[0].tnmTypegame === 'leaderboard'){
                    dbConnection.query("SELECT p.*,t.tnmID,m.score,m.matchID,m.pDate,DATE_FORMAT(m.time, '%H:%i') AS time,pl.placeName FROM matchplay m LEFT JOIN player p ON p.playerID = m.playerID LEFT JOIN tournament t ON t.tnmID = m.tnmID LEFT JOIN place pl ON pl.placeID = m.placeID WHERE t.tnmID = ? ORDER BY score desc",tnmID, (err, rows) => {
                        if(err) throw err;
                        dbConnection.query('SELECT * FROM place ORDER BY placeID asc',(error,result)=>{
                            if(error) throw error;
                            res.render('tournament/match/singleleaderboard',{ tournamentName,place: result,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user})
                        })
                        
                    })
                }else if(rows[0].tnmTypegame === 'roundrobin'){
                    dbConnection.query("SELECT p1.playerID AS p1ID,p1.playerFName AS player1_name,p2.playerID AS p2ID, p2.playerFName AS player2_name, m.score1, m.score2,m.pDate, DATE_FORMAT(m.time, '%H:%i') as time,m.timeend,place.placeName FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                        if(error) throw error;
                        dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                            if(err) throw err;
                            res.render('tournament/match/match',{tournamentName,place: results,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user})
                        })
                    })

                }else if(rows[0].tnmTypegame === 'single'){
                    dbConnection.query("SELECT m.round,m.matchID,p1.playerID AS p1ID,p1.playerFName AS player1_name,p2.playerID AS p2ID, p2.playerFName AS player2_name, m.score1, m.score2,m.pDate, DATE_FORMAT(m.time, '%H:%i') as time,m.timeend,place.placeName,m.seed FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                        if(error) throw error;
                        dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                            if(err) throw err;
                            res.render('tournament/match/match',{tournamentName,place: results,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user})
                        })
                    })
            }else{
                    let rows = [];
                        res.render('tournament/match/match',{tournamentName,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user})
            }
            }else{
                if(rows[0].tnmTypegame === 'leaderboard'){
                dbConnection.query("SELECT team.*,t.tnmID,m.score,m.matchID,m.pDate,DATE_FORMAT(m.time, '%H:%i') AS time FROM matchplay m LEFT JOIN team team ON team.teamID = m.teamID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc",tnmID, (err, rows) => {
                    if(err) throw err;
                    dbConnection.query('SELECT * FROM place ORDER BY placeID asc',(error,result)=>{
                        if(error) throw error;
                        res.render('tournament/match/teamleaderboard',{tournamentName, place: result,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user})
                    })
                })
            }else if(rows[0].tnmTypegame === 'roundrobin'){
                dbConnection.query("SELECT t1.teamID AS p1ID,t1.teamName AS player1_name,t2.teamID AS p2ID, t2.teamName AS player2_name, m.score1, m.score2,m.pDate,m.time,m.timeend,place.placeName FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 LEFT JOIN place ON place.placeID = m.placeID WHERE m.tnmID = "+tnmID, (error, rows) => {
                    if(error) throw error;
                    dbConnection.query('SELECT p.placeID,p.placeName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID LEFT JOIN sport_type st ON st.typeID = s.typeID LEFT JOIN place p ON p.typeID = st.typeID WHERE tnmID = '+tnmID ,(err,results)=>{
                        if(err) throw err;
                        res.render('tournament/match/match',{tournamentName,place: results,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user})
                    })
                })
        }else{
                let rows = [];
                    res.render('tournament/match/match',{tournamentName,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user})
            }
        }
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
    }
    }
})
})



//หน้าไฮไลท์
router.get('/highlight/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID,t.tnmName,h.tnmID,h.linkvid,h.filePic,h.date,h.description FROM tournament t LEFT JOIN highlight h ON t.tnmID = h.tnmID WHERE t.tnmID = '+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            tournamentName = rows[0].tnmName;
            res.render('tournament/highlight', {tournamentName, data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
    }else{
    res.redirect('/error404');
    }
    })
})

router.get('/highlight/add/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID,t.tnmName,h.tnmID,h.linkvid,h.filePic,h.date,h.description FROM tournament t LEFT JOIN highlight h ON t.tnmID = h.tnmID WHERE t.tnmID = '+tnmID, (err, rows) => {
    if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            tournamentName = rows[0].tnmName;
            res.render('tournament/addhl', { tournamentName,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
    }else{
    res.redirect('/error404');
    }
    })
})

router.post('/highlight/add/(:tnmID)', (req, res, next)=> {
    if (req.files) {
        let tnmID = req.params.tnmID;
        let date = req.body.date;
        let description = req.body.description;
        let filePic = req.files.filePic;

        let name_filePic = new Date().getTime() +'_'+filePic.name;
        filePic.mv('./assets/images/' + name_filePic);

        let form_data = {
            tnmID: tnmID,
            filePic: name_filePic,
            date: date,
            description: description
        }
        dbConnection.query("INSERT INTO highlight SET ?",form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('tournament/addhl', {
                    data: req.params.tnmID,
                    filePic: req.files.name_filePic,
                    date: req.body.date,
                    description: req.body.description,
                    status_login: req.session.loggedin,
                    user: user

                })
            } else {
                req.flash('success', 'เพิ่ม Highlight เรียบร้อยแล้ว');
                res.redirect('/tournament/highlight/'+tnmID)
            }
        })
    }else{
        let tnmID = req.params.tnmID;
        let linkvid = req.body.linkvid;
        let date = req.body.date;
        let description = req.body.description;
        let videoId = linkvid.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

        let form_data = {
            tnmID: tnmID,
            linkvid: linkvid,
            date: date,
            description: description
    }
    dbConnection.query("INSERT INTO highlight SET ?",form_data, (err, result) => {
        if (err) {
            req.flash('error', err);
            res.render('tournament/addhl', {
                data: req.params.tnmID,
                linkvid: linkvid,
                date: date,
                description: description,
                status_login: req.session.loggedin,
                user: user

            })
        } else {
            req.flash('success', 'เพิ่ม Highlight เรียบร้อยแล้ว');
            res.redirect('/tournament/highlight/'+tnmID)
        }
    })

    }

})

router.get('/participant/team/(:teamID)', (req, res, next) => {
    let thisteamID = req.params.teamID;
    dbConnection.query('SELECT t.*, p.*,f.name AS facName,u.name AS uniName FROM team t JOIN player p ON t.teamID = p.teamID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE t.teamID = '+thisteamID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tournament/participant/team', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('/error404');
    }
    })
})

router.get('/participant/player/(:playerID)', (req, res, next) => {
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT p.playerID,p.playerIDCard,p.playerFName,p.playerLName,p.playerGender,p.playerBirthday,p.playerPhone,p.playerEmail,p.facultyID,p.playerFile1,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID ='+thisplayerID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tournament/participant/player', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('/error404');
    }
    })
})

router.post('/createbracket/:tnmID',(req, res, next) => {
    let tnmTypegame = req.body.tnmTypegame;
    let updatetype = {tnmTypegame: tnmTypegame}
    let automan = req.body.automan;
    let tnmID = req.params.tnmID;
    let byename = req.body.byename;
    let otherteam = req.body.otherteam;

    let round;


    dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,updatetype,(err, rows) =>{
        if (err) throw err;
        console.log('อัพเดท วิธีการแข่งขันแล้ว')
    })

    dbConnection.query('SELECT t.*,s.* FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE tnmID ='+tnmID,(err,rows) =>{
    if(rows[0].sportPlaynum === 1){
        if(tnmTypegame === 'single'){
            if(automan === 'auto'){
            dbConnection.query("SELECT * FROM player WHERE playerStatus = 'accept' AND tnmID ="+tnmID ,(err, rows) => {

                player = [];

                rows.forEach(rows =>{
                    player.push(rows.playerID);
                })

                round = Math.ceil(Math.log2(player.length));
                bye = Math.pow(2, Math.ceil(Math.log2(player.length))) - player.length;

                if(bye === 0){
                    let seed = 1;
                  for(let i=0; i<player.length;i+=2){
                    
                    let values = [player[i],player[i+1],1,seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)',values,(errors,rows)=>{
                      if(errors) throw errors;
                      console.log('success insert matches no bye');
                    })
                  }
                }else if(bye > 2){
                  let seed = 1;
                  let byeTeams = player.slice(player.length - bye);
                  let matches = [];
                  
                  for (let i = 0; i < player.length - bye; i += 2) {
                    let values = [player[i], player[i + 1], 1, seed, tnmID];
                    matches.push(values);
                    seed++;
                  }
                  
                  for (let i = 0; i < byeTeams.length; i += 2) {
                    if (byeTeams[i + 1] === undefined) {
                      let values = [byeTeams[i], null, 2, seed, tnmID];
                      matches.push(values);
                      seed++;
                    } else {
                      let values = [byeTeams[i], byeTeams[i + 1], 2, seed, tnmID];
                      matches.push(values);
                      seed++;
                    }
                  }
                  
                  for (let i = 0; i < matches.length; i++) {
                    let values = matches[i];
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)', values, (errors, rows) => {
                      if (errors) throw errors;
                      console.log('success insert matches bye > 2');
                    });
                  }
                }else{
                  let seed = 1;
                  for (let i = 0; i < player.length - bye; i += 2) {
                    let values = [player[i], player[i + 1], 1, seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)', values, (errors, rows) => {
                      if (errors) throw errors;
                      console.log('success insert matches else');
                    });
                  }
                  
                  for (let i = player.length - bye; i < player.length; i++) {
                    let values = [player[i], null, 2, seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)', values, (errors, rows) => {
                      if (errors) throw errors;
                      console.log('success insert bye matches');
                    });
                  }
                }


            })
            res.redirect('/tournament/bracket/'+tnmID);
        }else{

          player = byename.concat(otherteam);

                round = Math.ceil(Math.log2(player.length));
                bye = Math.pow(2, Math.ceil(Math.log2(player.length))) - player.length;

                if(bye === 0){
                    let seed = 1;
                  for(let i=0; i<player.length;i+=2){
                    
                    let values = [player[i],player[i+1],1,seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)',values,(errors,rows)=>{
                      if(errors) throw errors;
                      console.log('success insert matches no bye');
                    })
                  }
                }else if(bye > 2){
                  let seed = 1;
                  let byeTeams = player.slice(player.length - bye);
                  for (let i = 0; i < player.length - bye; i += 2) {
                    let values = [player[i], player[i + 1], 1, seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)', values, (errors, rows) => {
                      if (errors) throw errors;
                      console.log('success insert matches bye > 2');
                    });
                  }
                
                  for (let i = 0; i < byeTeams.length; i += 2) {
                    let values = [byeTeams[i], byeTeams[i + 1], 2, seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)', values, (errors, rows) => {
                      if (errors) throw errors;
                      console.log('success insert bye matches');
                    });
                  }
                }else{
                  let seed = 1;
                  for (let i = 0; i < player.length - bye; i += 2) {
                    let values = [player[i], player[i + 1], 1, seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)', values, (errors, rows) => {
                      if (errors) throw errors;
                      console.log('success insert matches else');
                    });
                  }
                  
                  for (let i = player.length - bye; i < player.length; i++) {
                    let values = [player[i], null, 2, seed,tnmID];
                    seed++;
                    dbConnection.query('INSERT INTO matchplay (participant1,participant2,round,seed,tnmID) VALUES (?,?,?,?,?)', values, (errors, rows) => {
                      if (errors) throw errors;
                      console.log('success insert bye matches');
                    });
                  }
                }

          res.redirect('/tournament/bracket/'+tnmID);
        }
            }else if(tnmTypegame === 'leaderboard'){
                dbConnection.query("SELECT * FROM player WHERE playerStatus = 'accept' AND tnmID ="+tnmID ,(err, rows) => {
                    let values = [];
                    for(let i=0; i< rows.length;i++){
                        let playerID = rows[i].playerID;
                        values.push([playerID,tnmID])
                    }
        
                    dbConnection.query('INSERT INTO matchplay (playerID, tnmID) VALUES ?',[values], function (err, rows){
                        if (err) throw err;
                        console.log("Number of persons inserted: " + rows.affectedRows);
                        res.redirect('/tournament/bracket/'+tnmID);
                    })
                })   
            }
            else if(tnmTypegame === 'roundrobin'){
                let teams = [];
                dbConnection.query("SELECT playerID, playerFName FROM player WHERE playerStatus = 'accept' AND tnmID = "+tnmID,(error,results)=>{
                    if(error) throw error;
                    results.forEach(player => {
                        teams.push(player.playerID);
                      });
                  
                      function generateRoundRobin(teams) {
                        let schedule = [];
                        for (let i = 0; i < teams.length - 1; i++) {
                          for (let j = i + 1; j < teams.length; j++) {
                            schedule.push([teams[i], teams[j]]);
                          }
                        }
                        return schedule;
                      }
                  
                      const schedule = generateRoundRobin(teams);
                  
                      schedule.forEach(match => {
                        const sql = `INSERT INTO matchplay (participant1, participant2,tnmID) VALUES (?, ?, ?)`;
                        const values = [match[0], match[1], tnmID];
                  
                        dbConnection.query(sql, values, function(err, result) {
                          if (err) throw err;
                          console.log(
                            `Match between ${match[0]} and ${match[1]} inserted into the database with ID: `,
                            result.insertId
                          );
                        });
                      });
                  
                    res.redirect('/tournament/bracket/'+tnmID);

                })

            }else{

            }

            
    }else{
        
        if(tnmTypegame === 'leaderboard'){
            dbConnection.query("SELECT * FROM team WHERE teamStatus ='accept' AND tnmID ="+tnmID ,(err, rows) => {
                let values = [];
                    for(let i=0; i< rows.length;i++){
                        let teamID = rows[i].teamID;
                        values.push([teamID,tnmID])
                    }
        
                    dbConnection.query('INSERT INTO matchplay (teamID, tnmID) VALUES ?',[values], function (err, rows){
                        if (err) throw err;
                        console.log("Number of persons inserted: " + rows.affectedRows);
                        res.redirect('/tournament/bracket/'+tnmID);
                    })
            })
        }else if(tnmTypegame === 'roundrobin'){
            let teams = [];
            dbConnection.query("SELECT teamID AS playerID,teamName AS playerFName FROM team WHERE teamStatus = 'accept' AND tnmID = "+tnmID,(error,results)=>{
                if(error) throw error;
                results.forEach(player => {
                    teams.push(player.playerID);
                  });
              
                  function generateRoundRobin(teams) {
                    let schedule = [];
                    for (let i = 0; i < teams.length - 1; i++) {
                      for (let j = i + 1; j < teams.length; j++) {
                        schedule.push([teams[i], teams[j]]);
                      }
                    }
                    return schedule;
                  }
              
                  const schedule = generateRoundRobin(teams);
              
                  schedule.forEach(match => {
                    const sql = `INSERT INTO matchplay (participant1, participant2,tnmID) VALUES (?, ?, ?)`;
                    const values = [match[0], match[1], tnmID];
              
                    dbConnection.query(sql, values, function(err, result) {
                      if (err) throw err;
                      console.log(
                        `Match between ${match[0]} and ${match[1]} inserted into the database with ID: `,
                        result.insertId
                      );
                    });
                  });
              
                res.redirect('/tournament/bracket/'+tnmID);

            })

        }else{

        }
    }

    })

})

router.post('/matchedit/(:tnmID)', async (req,res,next) =>{
    let tnmID = req.params.tnmID;
    let matchID = req.body.matchID;
    let pDate = req.body.pDate;
    let placeID = req.body.placeID;
    let time = req.body.time;
    let Endtime = req.body.Endtime;
    let participant1 = req.body.participant1;
    let participant2 = req.body.participant2;
    let score1 = req.body.score1;
    let score2 = req.body.score2;
    let round = req.body.round;
    let formseed = req.body.seed;

    let minusseed = formseed-1;

    const daysOfWeek = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const today = new Date(pDate);
    const currentDay = daysOfWeek[today.getDay()];

    dbConnection.query('SELECT * FROM place_opening WHERE day = ? AND placeID ='+placeID,currentDay,(error,placeopen)=>{
      console.log('วันที่',placeopen);
    dbConnection.query('SELECT * FROM matchplay WHERE pDate = ? AND ? BETWEEN time AND timeend AND ? BETWEEN time and timeend AND placeID = ?;',[pDate,time,Endtime,placeID],(err,checkmatch)=>{
      if(checkmatch.length){
        req.flash('error','สถานที่เลือกถูกใช้งานโดยการแข่งขันอื่นแล้ว');
        res.redirect('/tournament/match/'+tnmID);

      }else if(time < placeopen[0].timeOpen || Endtime > placeopen[0].timeClose || time > placeopen[0].timeClose || Endtime < placeopen[0].timeOpen || time > Endtime){
        req.flash('error','เวลาที่เลือกไม่ถูกต้อง');
        res.redirect('/tournament/match/'+tnmID);
      }else if(!checkmatch.length){
    dbConnection.query('SELECT * FROM tournament WHERE tnmID = '+tnmID,(error,typeoftour)=>{
       
        if(typeoftour[0].tnmTypegame === 'single'){

        dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? AND seed = ? ',[tnmID,minusseed],(error,less)=>{

          if(less.length && !less[0].score1 && !less[0].score2){
            req.flash('error','กรุณาบันทึกการแข่งขันก่อนหน้า');
            res.redirect('/tournament/match/'+tnmID);
          }else{
          if(score1 && score2){
            let form_data={score1:score1,score2:score2,placeID:placeID,time:time,timeend:Endtime,pDate:pDate}
            dbConnection.query('UPDATE matchplay SET ? WHERE matchID ='+matchID,form_data,(error,rows)=>{
                if(error) throw error;
            })
          
            
            dbConnection.query(`SELECT * FROM player WHERE playerStatus = 'accept' AND tnmID =`+tnmID,(error,rows)=>{
              const numteam = rows.length;
              let checkseed = numteam -1 ;
            dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? AND seed = ? ',[tnmID,checkseed],(error,seedcheck)=>{
                if(error) throw error;
                let numbye = Math.pow(2, Math.ceil(Math.log2(rows.length))) - rows.length;

                 if(!seedcheck.length || seedcheck[0].participant1 === null || seedcheck[0].participant2 === null){
                if(numbye === 0){
                    let nextround = parseInt(round) + 1;
                    if(score1 > score2){
                        dbConnection.query('SELECT * FROM matchplay WHERE round = ? AND tnmID = ? ORDER BY seed DESC LIMIT 1',[nextround,tnmID],(error,result)=>{ 
                          if(error) throw error;
                          if(result.length){
                            let dataid = result[0].matchID;
                            if(result[0].participant1 && result[0].participant2){
                              dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC LIMIT 1',tnmID,(error,rows)=>{
                                if(error) throw error;
                                let thisseed = rows[0].seed +1;
                              
                              let nextmatch = {
                                tnmID:tnmID,
                                participant1:participant1,
                                seed:thisseed,
                                round:nextround
                              }
                              dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                                if(error) throw error;
                              })
                            })
                      
                            }else if(result[0].participant1){
                              let nextmatch = { participant2:participant1}
                              dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                                if(err) throw err;
                              })
                      
                            }else{
                              let nextmatch = { participant1:participant1}
                              dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                                if(err) throw err;
                              })
                            }
                          }else{
                            console.log('ไม่มี data')
                            dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC LIMIT 1',tnmID,(error,rows)=>{
                              if(error) throw error;
                              let thisseed = rows[0].seed +1;
                            
                            let nextmatch = {
                              tnmID:tnmID,
                              participant1:participant1,
                              seed:thisseed,
                              round:nextround
                            }
                            dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                              if(error) throw error;
                            })
                          })
                      
                        
                          }
                      
                         })
                      }else{
                        dbConnection.query('SELECT * FROM matchplay WHERE round = ? AND tnmID = ? ORDER BY seed DESC LIMIT 1',[nextround,tnmID],(error,result)=>{ 
                          if(error) throw error;
                          if(result.length){
                            let dataid = result[0].matchID;
                            if(result[0].participant1 && result[0].participant2){
                              dbConnection.query('SELECT * FROM matchplay ORDER BY seed DESC LIMIT 1',(error,rows)=>{
                                if(error) throw error;
                                let thisseed = rows[0].seed +1;
                              
                              let nextmatch = {
                                tnmID:tnmID,
                                participant1:participant1,
                                seed:thisseed,
                                round:nextround
                              }
                              dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                                if(error) throw error;
                              })
                            })
                      
                            }else if(result[0].participant1){
                              let nextmatch = { participant2:participant2}
                              dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                                if(err) throw err;
                              })
                      
                            }else{
                              let nextmatch = { participant1:participant2}
                              dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                                if(err) throw err;
                              })
                            }
                          }else{
                            dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC LIMIT 1',tnmID,(error,rows)=>{
                              if(error) throw error;
                              let thisseed = rows[0].seed +1;
                            
                            let nextmatch = {
                              tnmID:tnmID,
                              participant1:participant2,
                              seed:thisseed,
                              round:nextround
                            }
                            dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                              if(error) throw error;
                            })
                          })
                        
                          }
                      
                         })
                      }
                      // มีบาย > 0
                }else{
                    let nextround = parseInt(round) + 1;
                    // ทีม 1 ชนะ ทีม 2
                    if(score1 > score2){
                      dbConnection.query('SELECT * FROM matchplay WHERE round = ? AND tnmID = ? ORDER BY seed DESC',[nextround,tnmID],(error,result)=>{ 
                        if(error) throw error;
                        if(result.length){
                         for(i=0;i<result.length;i++){
                          console.log('รอบลูป',i)
                          console.log('ผลลัพธ์',result.length)
                          let dataid = result[i].matchID;
                        if(result[i].participant1 && result[i].participant2 && numteam < 8 && nextround === 2 && result.length < 2){  
                          console.log('numteam < 8 && thisround === 2 && result.length < 2')
                            dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                              if(error) throw error;
                              let thisseed = rows[0].seed +1;
                            
                            let nextmatch = {
                              tnmID:tnmID,
                              participant1:participant1,
                              seed:thisseed,
                              round:nextround
                            }
                            dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                              if(error) throw error;
                            })
                          })
                          break;
                        }else if(result[i].participant1 && result[i].participant2 && numteam > 8 && numteam < 16 && nextround === 2 && result.length < 4){
                          console.log('numteam > 8 && numteam < 16 && thisround === 2 && result.length < 4')
                          dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                            if(error) throw error;
                            let thisseed = rows[0].seed +1;
                          let nextmatch = {
                            tnmID:tnmID,
                            participant1:participant1,
                            seed:thisseed,
                            round:nextround
                          }
                          dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                            if(error) throw error;
                          })
                        })
                        break;
                        }else if(result[i].participant1 && result[i].participant2 && numteam > 8 && numteam < 16 && nextround === 3 && result.length < 2){
                          console.log('numteam > 8 && numteam < 16 && thisround === 3 && result.length < 2')
                          dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                            if(error) throw error;
                            let thisseed = rows[0].seed +1;
                          
                          let nextmatch = {
                            tnmID:tnmID,
                            participant1:participant1,
                            seed:thisseed,
                            round:nextround
                          }
                          dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                            if(error) throw error;
                          })
                        })
                        break;
                        }else if(result[i].participant1 && !result[i].participant2){
                          console.log('เข้า 1')
                            let nextmatch = { participant2:participant1}
                            dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                              if(err) throw err;
                            })
                            break;
                          }else if(result[i].participant2 && !result[i].participant1){
                            console.log('เข้า2')
                            let nextmatch = { participant1:participant1}
                            dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                              if(err) throw err;
                            })
                            break;
                          }else{
                            console.log('ไม่เข้า')
                          }
                        }
                        }else{
                          dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                            if(error) throw error;
                            let thisseed = rows[0].seed +1;
                          let nextmatch = {
                            tnmID:tnmID,
                            participant1:participant1,
                            seed:thisseed,
                            round:nextround
                          }
                          dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                            if(error) throw error;
                          })
                        })
                        }
                       })
                      
                      // ทีม 2 ชนะ ทีม 1
                    }else{
                      dbConnection.query('SELECT * FROM matchplay WHERE round = ? AND tnmID = ? ORDER BY seed DESC',[nextround,tnmID],(error,result)=>{ 
                        if(error) throw error;
                        if(result.length){
                          
                         for(i=0;i<result.length;i++){
                          console.log('รอบลูป',i)
                          console.log('ผลลัพธ์',result.length)
                          let dataid = result[i].matchID;
                        if(result[i].participant1 && result[i].participant2 && numteam < 8 && nextround === 2 && result.length < 2){  
                          console.log('numteam < 8 && thisround === 2 && result.length < 2')
                            dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                              if(error) throw error;
                              let thisseed = rows[0].seed +1;
                            
                            let nextmatch = {
                              tnmID:tnmID,
                              participant1:participant2,
                              seed:thisseed,
                              round:nextround
                            }
                            dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                              if(error) throw error;
                            })
                          })
                          break;
                        }else if(result[i].participant1 && result[i].participant2 && numteam > 8 && numteam < 16 && nextround === 2 && result.length < 4){
                          console.log('numteam > 8 && numteam < 16 && thisround === 2 && result.length < 4')
                          dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                            if(error) throw error;
                            let thisseed = rows[0].seed +1;
                          let nextmatch = {
                            tnmID:tnmID,
                            participant1:participant2,
                            seed:thisseed,
                            round:nextround
                          }
                          dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                            if(error) throw error;
                          })
                        })
                        break;
                        }else if(result[i].participant1 && result[i].participant2 && numteam > 8 && numteam < 16 && nextround === 3 && result.length < 2){
                          console.log('numteam > 8 && numteam < 16 && thisround === 3 && result.length < 2')
                          dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                            if(error) throw error;
                            let thisseed = rows[0].seed +1;
                          
                          let nextmatch = {
                            tnmID:tnmID,
                            participant1:participant2,
                            seed:thisseed,
                            round:nextround
                          }
                          dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                            if(error) throw error;
                          })
                        })
                        break;
                        }else if(result[i].participant1 && !result[i].participant2){
                          console.log('เข้า 1')
                            let nextmatch = { participant2:participant2}
                            dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                              if(err) throw err;
                            })
                            break;
                          }else if(result[i].participant2 && !result[i].participant1){
                            console.log('เข้า2')
                            let nextmatch = { participant1:participant2}
                            dbConnection.query('UPDATE matchplay SET ? WHERE matchID = '+dataid,nextmatch,(err,rows)=>{
                              if(err) throw err;
                            })
                            break;
                          }else{
                            console.log('ไม่เข้า')
                          }
                        }
                        }else{
                          dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rows)=>{
                            if(error) throw error;
                            let thisseed = rows[0].seed +1;
                          let nextmatch = {
                            tnmID:tnmID,
                            participant1:participant2,
                            seed:thisseed,
                            round:nextround
                          }
                          dbConnection.query('INSERT INTO matchplay SET ?',nextmatch,(error,rows)=>{
                            if(error) throw error;
                          })
                        })
                        }
                       })
                    }
                  }
                }else{
                  console.log('ครบจำนวนการแข่งขันแล้ว');

                dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY seed DESC',tnmID,(error,rank)=>{

                  //หาที่ 1
                      if(rank[0].score1 > rank[0].score2){
                        let st1 = {st1: rank[0].participant1}
                        check1 = rank[0].participant1;
                        dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,st1,(error,st1)=>{
                          console.log('เพิ่มที่ 1 เรียบร้อย');
                        })
                      }else{
                        let st1 = {st1:rank[0].participant2}
                        check1 = rank[0].participant2;
                        dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,st1,(error,st1)=>{
                          console.log('เพิ่มที่ 1 เรียบร้อย');
                        })
                      }

                      //หาที่ 2
                      if(check1 != rank[1].participant1){
                        let nd2 = {nd2:rank[1].participant1}
                        check2 = rank[1].participant1;
                        dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,nd2,(error,nd2)=>{
                          console.log('เพิ่มที่ 2 เรียบร้อย');
                        })
                      }else{
                        let nd2 = {nd2:rank[1].participant2}
                        check2 = rank[1].participant2;
                        dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,nd2,(error,nd2)=>{
                          console.log('เพิ่มที่ 2 เรียบร้อย');
                        })
                      }

                      //หาที่ 3
                      if(check1 != rank[2].participant1 && check2 != rank[2].participant1){
                        let rd3 = {rd3:rank[2].participant1}
                        dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,rd3,(error,rd3)=>{
                          console.log('เพิ่มที่ 3 เรียบร้อย');
                        })
                      }else{
                        let rd3 ={rd3:rank[2].participant2}
                        dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,rd3,(error,rd3)=>{
                          console.log('เพิ่มที่ 3 เรียบร้อย');
                        })
                      }
          



                })

                }
                  res.redirect('/tournament/match/'+tnmID);
            })
          })

          }else{
            let form_data ={
              pDate: pDate,
              placeID: placeID,
              time: time,
              timeend: Endtime
          }
          dbConnection.query("UPDATE matchplay SET ? WHERE tnmID = ? AND participant1 = ? AND participant2 = ?",[form_data,tnmID,participant1,participant2],(error,rows)=> {
            res.redirect('/tournament/match/'+tnmID);
        })
          }
        }
        })
        }else{
            let form_data ={
                pDate: pDate,
                placeID: placeID,
                time: time,
                timeend: Endtime,
                score1: score1,
                score2: score2
            }
            console.log(form_data)
            dbConnection.query("UPDATE matchplay SET ? WHERE tnmID = ? AND participant1 = ? AND participant2 = ?",[form_data,tnmID,participant1,participant2],(error,rows)=> {
                res.redirect('/tournament/match/'+tnmID);
            })
        }
    })

  }
})
})


})



router.get("/roundrobinsave/(:tnmID)", (req, res) => {
    let tnmID = req.params.tnmID;
    const selectQuery = "SELECT participant1, participant2, score1, score2 FROM matchplay WHERE tnmID = "+tnmID;
    dbConnection.query(selectQuery, (err, result) => {
        if (err) throw err;
    let wins = {};
    let losses = {};
    result.forEach(match => {
      if (match.score1 > match.score2) {
        if (wins[match.participant1]) {
          wins[match.participant1]++;
        } else {
          wins[match.participant1] = 1;
        }
        if (losses[match.participant2]) {
          losses[match.participant2]++;
        } else {
          losses[match.participant2] = 1;
        }
      } else {
        if (wins[match.participant2]) {
          wins[match.participant2]++;
        } else {
          wins[match.participant2] = 1;
        }
        if (losses[match.participant1]) {
          losses[match.participant1]++;
        } else {
          losses[match.participant1] = 1;
        }
      }
    });
    let participants = Object.keys(wins);
    let output = [];
    let count = 1;
    participants.sort((a, b) => {
      if (wins[b] !== wins[a]) {
        return wins[b] - wins[a];
      } else {
        return losses[a] - losses[b];
      }
    });
    for (let i = 0; i < participants.length; i++) {
      output.push(participants[i]);
      count++;
      if (count > 3) {
        break;
      }
    }
    let st = output[0];
    let nd = output[1];
    let rd = output[2];
    form_set={
        st1:st,
        nd2:nd,
        rd3:rd
    }
    dbConnection.query('UPDATE tournament SET ? WHERE tnmID = '+tnmID,form_set,(error,rows)=>{
        res.redirect('/tournament/bracket/'+tnmID);
    })
    
    });
  });


router.get('/editsingleleader/(:tnmID)',(req,res,next)=>{
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT p.*,t.tnmID,m.score,m.matchID FROM matchplay m LEFT JOIN player p ON p.playerID = m.playerID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows)=>{
    res.render('tournament/match/editsingleleader',{ tournamentName,data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user });
    })
})

router.get('/editteamleader/(:tnmID)',(req,res,next)=>{
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT team.*,t.tnmID,m.score,m.matchID FROM matchplay m LEFT JOIN team team ON team.teamID = m.teamID LEFT JOIN tournament t ON t.tnmID = m.tnmID WHERE t.tnmID = ? ORDER BY score desc',tnmID, (err, rows)=>{
    res.render('tournament/match/editteamleader',{tournamentName, data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user });
    })
})

router.post('/editsingleleader/(:tnmID)',(req,res,next)=>{
    let tnmID = req.params.tnmID;
    let mlID = req.body.mlID;
    let score = req.body.score;

    for(let i = 0; i < mlID.length; i++) {
    dbConnection.query('UPDATE matchplay SET score = '+score[i]+' WHERE mlID = '+mlID[i], function (error, rows) {
        if (error) throw error;

        dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY score desc LIMIT 3',tnmID,(error,rows)=>{
            let st = rows[0].playerID;
            let nd = rows[1].playerID;
            let rd = rows[2].playerID;
        dbConnection.query("UPDATE tournament SET st1 = '"+st+"',nd2 = '"+nd+"',rd3 ='"+rd+"' WHERE tnmID =  '"+tnmID+"'",(error,rows)=>{
            if(error) throw error;
            })
        })
    });
}
res.redirect('/tournament/match/'+tnmID);
})

router.post('/editteamleader/(:tnmID)',(req,res,next)=>{
    let tnmID = req.params.tnmID;
    let mlID = req.body.mlID;
    let score = req.body.score;

    for(let i = 0; i < mlID.length; i++) {
    dbConnection.query('UPDATE match SET score = '+score[i]+' WHERE mlID = '+mlID[i], function (error, rows) {
        if (error) throw error;
        dbConnection.query('SELECT * FROM matchplay WHERE tnmID = ? ORDER BY score desc LIMIT 3',tnmID,(error,rows)=>{
            let st = rows[0].teamID;
            let nd = rows[1].teamID;
            let rd = rows[2].teamID;
        dbConnection.query("UPDATE tournament SET st1 = '"+st+"',nd2 = '"+nd+"',rd3 ='"+rd+"' WHERE tnmID =  '"+tnmID+"'",(error,rows)=>{
            if(error) throw error;
            })
        })
    });
}
res.redirect('/tournament/match/'+tnmID);
})

router.post('/datetime',(req,res,next)=>{
    let date = req.body.date;
    let time = req.body.time;
    let placeID = req.body.placeID;
    let tnmID = req.body.tnmID;
    dbConnection.query('SELECT t.*,s.sportPlaynum,s.sportName FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE tnmID ='+tnmID,(error,rows)=>{
        if(rows[0].sportPlaynum === 1){
            if(rows[0].tnmTypegame === 'leaderboard'){
                dbConnection.query("UPDATE matchplay SET pDate = '"+date+"', time = '"+time+"', placeID = '"+placeID+"' WHERE tnmID = '"+tnmID+"'",(error,rows)=>{
                    if(error) throw error;
                        res.redirect('/tournament/match/'+tnmID);
                })
            }else{

            }
        }else{
            if(rows[0].tnmTypegame === 'leaderboard'){
                dbConnection.query("UPDATE matchplay SET pDate = '"+date+"', time = '"+time+"', placeID = '"+placeID+"' WHERE tnmID = '"+tnmID+"'",(error,rows)=>{
                    if(error) throw error;
                        res.redirect('/tournament/match/'+tnmID);
                })
            }else{

            }
        }

    })
})


module.exports = router;