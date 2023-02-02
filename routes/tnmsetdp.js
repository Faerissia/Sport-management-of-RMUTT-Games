let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/search-tnmsetdp', (req, res) => {
    let query = req.body.search;
    if(!query){
        res.redirect('/tnmsetdp');
    }else{ 
        sql = "SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate,SUM(CASE WHEN m.matchID IS NULL THEN 0 ELSE 1 END) AS totalmatch,SUM(CASE WHEN m.pDate IS NULL THEN 1 ELSE 0 END) AS notset,t.tnmTypegame FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN matchplay m ON t.tnmID = m.tnmID WHERE t.tnmName LIKE ? GROUP BY t.tnmID";
        let like =['%' + query + '%'];
    
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmsetdp', {data: results,status_login: req.session.loggedin,user: user});
    });
}
});

// display tnmsetdp page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate,SUM(CASE WHEN m.matchID IS NULL THEN 0 ELSE 1 END) AS totalmatch,SUM(CASE WHEN m.pDate IS NULL THEN 1 ELSE 0 END) AS notset,t.tnmTypegame FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN matchplay m ON t.tnmID = m.tnmID GROUP BY t.tnmID', (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tnmsetdp', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
    }
}else{
    res.redirect('error404');
}
    })
})

//display add tnmsetdp page
router.get('/add', (req, res, next) => {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/add', { data: rows,
                    tnmName:'',
                    sportID:'',
                    Rstartdate:'',
                    Renddate:'',
                    tnmStartdate:'',
                    tnmEnddate:'',
                    tnmUrl:'',
                    tnmDetail:'',
                    tnmPicture:''});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
        })
})

// delete tnmsetdp
router.get('/delete/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;

    dbConnection.query('DELETE FROM tournament WHERE tnmID = ' + tnmID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/tnmsetdp');
        } else {
            req.flash('success', 'tnmsetdp successfully deleted! ID = ' + tnmID);
            res.redirect('/tnmsetdp');
        }
    })
})


module.exports = router;