let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

// display tnmsetdp page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
        if (req.session.loggedin) {
            res.render('tnmsetdp', { data: rows,status_login: req.session.loggedin,user: user });
        }else if(err){
            req.flash('error', err);
            res.render('tnmsetdp', { data: '' });
        } else {
            res.render('login',{status_login: req.session.loggedin,user: user});
        }
    })
})

//display add tnmsetdp page
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