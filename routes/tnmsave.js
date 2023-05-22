let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/search-tnmsave', function(req, res, next) {
    let query = req.body.search;
    let startDate = req.body.startDate;

    if(!query && !startDate){
        res.redirect('/tnmsave');
    }
    
    let sql;
    let like;
    
     if(query){
     sql = "SELECT t.tnmID, t.tnmName,s.sportName,m.round,m.matchID,m.pDate,m.time,p.placeName FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN matchplay m ON t.tnmID = m.tnmID LEFT JOIN place p ON p.placeID = m.placeID WHERE t.tnmName LIKE ?";
     like = ['%' + query + '%'];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmsave', {data: results});
    });
    }else if(startDate) {
        console.log(startDate)
    sql = "SELECT t.tnmID, t.tnmName,s.sportName,m.round,m.matchID,m.pDate,m.time,p.placeName FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN matchplay m ON t.tnmID = m.tnmID LEFT JOIN place p ON p.placeID = m.placeID WHERE m.pDate = ?";
    like = [startDate];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmsave', {data: results});
    });
  }
});

// display tnmsave page
router.get('/', function(req, res, next) {
    dbConnection.query(`SELECT t.tnmID, t.tnmName,s.sportPlaynum, s.sportName, m.round,m.seed, m.matchID, m.pDate, p.placeID,p.placeName, t.tnmTypegame, m.score, m.score1, m.score2, m.time, m.timeend 
    FROM tournament t 
    LEFT JOIN sport s ON t.sportID = s.sportID 
    LEFT JOIN matchplay m ON t.tnmID = m.tnmID 
    LEFT JOIN place p ON p.placeID = m.placeID 
    WHERE m.pDate AND m.time AND m.timeend AND p.placeName IS NOT NULL AND m.score1 IS NULL AND m.score2 IS NULL AND m.score IS NULL AND t.tnmTypegame != 'leaderboard'
    UNION
    SELECT t.tnmID, t.tnmName,s.sportPlaynum, s.sportName, m.round,m.seed, m.matchID, m.pDate,p.placeID, p.placeName, t.tnmTypegame, m.score, m.score1, m.score2, m.time, m.timeend 
    FROM tournament t 
    LEFT JOIN sport s ON t.sportID = s.sportID 
    LEFT JOIN matchplay m ON t.tnmID = m.tnmID 
    LEFT JOIN place p ON p.placeID = m.placeID 
    WHERE m.pDate AND m.time AND m.timeend AND p.placeName IS NOT NULL AND m.score1 IS NULL AND m.score2 IS NULL AND m.score IS NULL AND t.tnmTypegame = 'leaderboard' 
    GROUP BY t.tnmID
    ORDER BY tnmID;
    `, (err, rows) => {
    dbConnection.query(`SELECT m.*,p1.playerFName as p1FName,p1.playerLName as p1LName,p2.playerFName as p2FName,p2.playerLName as p2LName FROM matchplay m LEFT JOIN player p1 ON m.participant1 = p1.playerID LEFT JOIN player p2 ON m.participant2 = p2.playerID WHERE p1.playerFName IS NOT NULL AND p2.playerFName IS NOT NULL;`,(err,player)=>{
    dbConnection.query(`SELECT m.*,t1.teamName as t1Name,t2.teamName as t2Name FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE t1.teamName IS NOT NULL AND t2.teamName IS NOT NULL;`,(err,team)=>{
    dbConnection.query(`SELECT * FROM team t LEFT JOIN matchplay m ON m.teamID = t.teamID WHERE t.teamStatus = 'accept' AND m.matchID IS NOT NULL;`,(err,teamlead)=>{
    dbConnection.query(`SELECT * FROM player p LEFT JOIN matchplay m ON p.playerID = m.playerID WHERE p.playerStatus = 'accept' AND m.matchID IS NOT NULL AND p.teamID IS NULL;`,(err,singlelead)=>{
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){ 
        res.render('tnmsave', {
        data: rows,
        player:player,
        team:team,
        teamlead:teamlead,
        singlelead:singlelead
    });
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
}else{
    res.redirect('error404');
}
    })
})
})
})
})
})

//display add tnmsave page
router.get('/add', function(req, res, next) {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
    if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('tournament/add', { 
                data: rows,
                tnmName:'',
                sportID:'',
                Rstartdate:'',
                Renddate:'',
                tnmStartdate:'',
                tnmEnddate:'',
                tnmUrl:'',
                tnmDetail:'',
                tnmPicture:''
            });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

// delete tnmsave
router.get('/delete/(:tnmID)', function(req, res, next) {
    let tnmID = req.params.tnmID;

    dbConnection.query('DELETE FROM tournament WHERE tnmID = ' + tnmID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/tnmsave');
        } else {
            req.flash('success', 'tnmsave successfully deleted! ID = ' + tnmID);
            res.redirect('/tnmsave');
        }
    })
})


module.exports = router;