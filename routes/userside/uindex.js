let express = require('express');
let router = express.Router();
let dbConnection = require('../../util/db');

// display tnmcheck page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/index', { data: '' });
        } else {
            res.render('userside/index', { data: rows });
        }
    })
})

router.get('/showall', (req, res, next) => {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/showall', { data: '' });
        } else {
            res.render('userside/showall', { data: rows });
        }
    })
})

router.get('/tnmdetail/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmdetail', { data: '' });
        } else {
            res.render('userside/tnm/tnmdetail', { data: rows });
        }
    })
})

router.get('/tnmbracket/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmbracket', { data: '' });
        } else {
            res.render('userside/tnm/tnmbracket', { data: rows });
        }
    })
})

router.get('/tnmparticipant/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/tnm/tnmparticipant', { data: '' });
        } else {
            res.render('userside/tnm/tnmparticipant', { data: rows });
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
            res.render('userside/tnm/tnmmatch', { data: rows });
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
            res.render('userside/tnm/tnmrank', { data: rows });
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
            res.render('userside/tnm/tnmhighlight', { data: rows });
        }
    })
})

router.get('/singlereg/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID, t.tnmName, u.uniID, u.name AS uniName,f.facultyID,f.name AS facName FROM tournament t LEFT JOIN university u LEFT JOIN faculty f ON f.uniID = u.uniID ON t.tnmID =' + tnmID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('userside/regform/singlereg', { data: '' });
        } else {
            res.render('userside/regform/singlereg', { data: rows,
                uniID: '',
                facultyID: ''
             });
        }
    })
})

router.post('/singlereg', (req, res, next) =>{
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let detailDoc = req.body.detailDoc;
    let uniID = req.body.uniID;
    let facultyID = req.body.facultyID;
    let playerIDCard = req.body.playerIDCard;
    let playerFile1 = req.body.playerFile1;
    let errors = false;

    if(sportName.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอก');
        //render to add.ejs with flash message
        res.render('userside/regform/singlereg', {
            playerFName: playerFName,
            playerLName: playerLName,
            playerGender: playerGender,
            playerBirthday: playerBirthday,
            playerPhone: playerPhone,
            playerEmail: playerEmail,
            detailDoc: detailDoc,
            uniID: uniID,
            facultyID: facultyID,
            playerIDCard: playerIDCard,
            playerFile1: playerFile1
        })
    }

    // if no error
    if(!errors) {
        let form_data = {
            playerFName: playerFName,
            playerLName: playerLName,
            playerGender: playerGender,
            playerBirthday: playerBirthday,
            playerPhone: playerPhone,
            playerEmail: playerEmail,
            detailDoc: detailDoc,
            uniID: uniID,
            facultyID: facultyID,
            playerIDCard: playerIDCard,
            playerFile1: playerFile1
        }
        // insert query db
        dbConnection.query('INSERT INTO sport SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('userside/regform/singlereg', {
                    playerFName: form_data.playerFName,
                    playerLName: form_data.playerLName,
                    playerGender: form_data.playerGender,
                    playerBirthday: form_data.playerBirthday,
                    playerPhone: form_data.playerPhone,
                    playerEmail: form_data.playerEmail,
                    detailDoc: form_data.detailDoc,
                    uniID: form_data.uniID,
                    facultyID: form_data.facultyID,
                    playerIDCard: form_data.playerIDCard,
                    playerFile1: form_data.playerFile1
                })
            } else {
                req.flash('success', 'sport successfully added');
                res.redirect('/tnmdetail/:uniID');
            }
        })
    }
})

module.exports = router;