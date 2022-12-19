let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// const multer = require('multer');
// const path = require('path');

// let storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null, 'assets/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({ storage: storage})
// const multiple = upload.fields([{ name: 'tnmPicture'}, {name: 'tnmFile1', maxCount: 3}])

// display tournament page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT t.tnmName,s.sportName,t.tnmStartdate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('tournament', { data: '' });
        } else {
            res.render('tournament', { data: rows });
        }
    })
})

//display add tournament page
router.get('/add', (req, res, next) => {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('tournament/add', { data: '' });
        } else {
            res.render('tournament/add', { data: rows,
            tnmName:'',
            sportID:'',
            tnmUrl:'',
            tnmDetail:''
        });
            
        }
    })
})


// add new tournament
router.post('/add', (req, res, next) =>{
    let tnmName = req.body.tnmName;
    let sportID = req.body.sportID;
    let tnmUrl = req.body.tnmUrl;
    let tnmDetail = req.body.tnmDetail;
    let errors = false;
    console.log(tnmName);
    console.log(sportID);
    console.log(tnmUrl);
    console.log(tnmDetail);
    if(tnmName.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอก');
        //render to add.ejs with flash message
        res.render('tournament/add', {
            tnmName: tnmName,
            sportID: sportID,
            tnmUrl: tnmUrl,
            tnmDetail: tnmDetail
        })
    }
    // if no error
    if(!errors) {
        let form_data = {
            tnmName: tnmName,
            sportID: sportID,
            tnmUrl: tnmUrl,
            tnmDetail: tnmDetail
        }
        // insert query db
        dbConnection.query('INSERT INTO tournament SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('tournament/add', {
                    tnmName: form_data.tnmName,
                    sportID: form_data.sportID,
                    tnmUrl: form_data.tnmUrl,
                    tnmDetail: form_data.tnmDetail
                })
            } else {
                req.flash('success', 'tournament successfully added');
                res.redirect('/tournament');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:tournamentID)', (req, res, next) => {
    let tournamentID = req.params.tournamentID;

    dbConnection.query('SELECT * FROM tournament WHERE tournamentID = ' + tournamentID, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + tournamentID)
            res.redirect('/tournament');
        } else {
            res.render('tournament/edit', {
                title: 'แก้ไข กีฬา',
                tournamentID: rows[0].tournamentID,
                tournamentName: rows[0].tournamentName,
                tournamentPlaynum: rows[0].tournamentPlaynum,
                type: rows[0].type
            })
        }
    });
})

// update book page
router.post('/update/:tournamentID', (req, res, next) => {
    let tournamentID = req.params.tournamentID;
    let tournamentName = req.body.tournamentName;
    let tournamentPlaynum = req.body.tournamentPlaynum;
    let type = req.body.type;
    let errors = false;

    if (tournamentName.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('tournament/edit', {
            tournamentID: req.params.tournamentID,
            tournamentName: tournamentName,
            tournamentPlaynum: tournamentPlaynum,
            type: type
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            tournamentName:  tournamentName,
            tournamentPlaynum: tournamentPlaynum,
            type: type
        }
        // update query
        dbConnection.query("UPDATE tournament SET ? WHERE tournamentID = " + tournamentID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('tournament/edit', {
                    tournamentID: req.params.tournamentID,
                    tournamentName: form_data.tournamentName,
                    tournamentPlaynum: form_data.tournamentPlaynum,
                    type: form_data.type
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
            req.flash('error', err),
            res.redirect('/tournament');
        } else {
            req.flash('success', 'tournament successfully deleted! ID = ' + tnmID);
            res.redirect('/tournament');
        }
    })
})

module.exports = router;