let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display tnmcheck page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
        if (req.session.loggedin) {
            res.render('tnmcheck', { data: rows,status_login: req.session.loggedin,user: user });
        }else if(err){
            req.flash('error', err);
            res.render('tnmcheck', { data: '' });
        } else {
            res.render('login',{status_login: req.session.loggedin,user: user});
        }
    })
})

//display add tnmcheck page
router.get('/add', (req, res, next) => {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('tournament/add', { data: '' });
        } else {
            res.render('tournament/add', { data: rows,
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
            
        }
    })
})

// delete tnmcheck
router.get('/delete/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;

    dbConnection.query('DELETE FROM tournament WHERE tnmID = ' + tnmID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/tnmcheck');
        } else {
            req.flash('success', 'tnmcheck successfully deleted! ID = ' + tnmID);
            res.redirect('/tnmcheck');
        }
    })
})

// display tnmcheck page
router.get('/candidate', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
        if (err) {
            res.render('./tnmcheck/candidate', { data: '' });
        } else {
            res.render('./tnmcheck/candidate', { data: rows });
        }
    })
})

router.get('/candidate/page', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
        if (err) {
            res.render('./tnmcheck/candidate/page', { data: '' });
        } else {
            res.render('./tnmcheck/candidate/page', { data: rows });
        }
    })
})

module.exports = router;