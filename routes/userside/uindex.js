let express = require('express');
let router = express.Router();
let dbConnection = require('../../util/db');
let bodyParser=require("body-parser");
const path = require('path');

// display tnmcheck page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
         if (err) {
            req.flash('error', err);
            res.render('userside/index', { data: '' });
        } else {
            res.render('userside/index', { data: rows,status_login: req.session.loggedin});
        }
    })
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
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
            res.render('userside/tnm/tnmdetail', { data: rows,status_login: req.session.loggedin });
    })
})

router.get('/tnmbracket/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmbracket', { data: '' });
        } else {
            res.render('userside/tnm/tnmbracket', { data: rows,status_login: req.session.loggedin });
        }
    })
})

router.get('/tnmparticipant/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID WHERE t.tnmID = ' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmparticipant', { data: '' });
        } else {
            res.render('userside/tnm/tnmparticipant', { data: rows,status_login: req.session.loggedin });
        }
    })
})

router.get('/tnmmatch/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmmatch', { data: '' });
        } else {
            res.render('userside/tnm/tnmmatch', { data: rows,status_login: req.session.loggedin });
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
            res.render('userside/tnm/tnmrank', { data: rows,status_login: req.session.loggedin });
        }
    })
})

router.get('/tnmhighlight/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmhighlight', { data: '' });
        } else {
            res.render('userside/tnm/tnmhighlight', { data: rows,status_login: req.session.loggedin });
        }
    })
})

router.get('/singlereg/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT u.name, u.uniID,t.tnmID, t.tnmName FROM university u INNER JOIN tournament t WHERE tnmID =' +tnmID, (err, rows) => {
                res.render('userside/regform/singlereg', { data: rows,status_login: req.session.loggedin
                 });
    })
})

router.post('/singlereg', (req, res, next) =>{
    let tnmID = req.body.tnmID;
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let facultyID = req.body.facultyID;
    let playerIDCard = req.body.playerIDCard;
    let playerStudentID = req.body.playerStudentID;
    let playerFile1 = req.files.playerFile1;
    let errors = false;

    var name_pfile = new Date().getTime() +'_'+playerFile1.name;

    playerFile1.mv('./assets/player/' + name_pfile);


    // if no error
    if(!errors) {
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
            playerStudentID: playerStudentID,
            playerFile1: name_pfile
        }
        // insert query db
        dbConnection.query('INSERT INTO player SET ?', form_data, (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
                req.flash('error', err)
                res.redirect('/')
            } else {
                req.flash('success', 'สมัครเข้าร่วมการแข่งขันแล้ว');
                res.redirect('/');
            }
        })
    }
})



router.post('/get-faculty', function(req, res) {
    dbConnection.query('SELECT * FROM faculty WHERE uniID = " ' + req.body.uniID + ' "',
    function(err, rows, fields) {
    if (err) {
        res.json({ msg: 'error' });
    } else {
        res.json({ msg: 'success', facu: rows});

    }
});
});


module.exports = router;