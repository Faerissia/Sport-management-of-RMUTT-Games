let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');


router.post('/search-placetable', (req, res) => {
    let query = req.body.search;
    if(!query) {
        res.redirect('/placetable');
    } else {
        let sql = 'SELECT * FROM place WHERE placeName LIKE ?';
        let data = ['%' + query + '%'];
        dbConnection.query(sql, data, (err, results) => {
            if(err) throw err;
            res.render('placetable', {data: results,status_login: req.session.loggedin,user: user});
        });
    }
});

// display place page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM place ORDER BY placeID asc', (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('placetable', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
        })
})

module.exports = router;