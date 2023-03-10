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
     sql = "SELECT t.tnmID, t.tnmName,s.sportName,m.round,m.pDate,m.time,p.placeName FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN matchplay m ON t.tnmID = m.tnmID LEFT JOIN place p ON p.placeID = m.placeID WHERE t.tnmName LIKE ?";
     like = ['%' + query + '%'];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmsave', {data: results});
    });
    }else if(startDate) {
        console.log(startDate)
    sql = "SELECT t.tnmID, t.tnmName,s.sportName,m.round,m.pDate,m.time,p.placeName FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN matchplay m ON t.tnmID = m.tnmID LEFT JOIN place p ON p.placeID = m.placeID WHERE t.tnmStartdate = ?";
    like = [startDate];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmsave', {data: results});
    });
  }
});

// display tnmsave page
router.get('/', function(req, res, next) {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,m.round,m.pDate,m.time,p.placeName,t.tnmTypegame,m.score1,m.score2,m.time,m.timeend FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN matchplay m ON t.tnmID = m.tnmID LEFT JOIN place p ON p.placeID = m.placeID', (err, rows) => {
    if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){ 
        res.render('tnmsave', { data: rows});
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
}else{
    res.redirect('error404');
}
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