let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

// display tnmsave page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('tnmsave', { data: '' });
        } else {
            res.render('tnmsave', { data: rows });
        }
    })
})

//display add tnmsave page
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

// delete tnmsave
router.get('/delete/(:tnmID)', (req, res, next) => {
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