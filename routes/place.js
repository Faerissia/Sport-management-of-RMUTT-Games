let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display place page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM place ORDER BY placeID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('place', { data: '' });
        } else {
            res.render('place', { data: rows });
        }
    })
})

//display add place page
router.get('/add',(req, res, next) => {
    res.render('place/add',{
        placeName:'',
        sportID:'',
        placeUrl:'',
        placeFile:'',
        placeDetail:''
    })
})

// add new place
router.post('/add', (req, res, next) =>{
    let placeName = req.body.placeName;
    let sportID = req.body.sportID;
    let placeUrl = req.body.placeUrl;
    let placeFile = req.body.placeFile;
    let placeDetail = req.body.placeDetail;
    let errors = false;

    if(placeName.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอก');
        //render to add.ejs with flash message
        res.render('place/add', {
            placeName: placeName,
            sportID: sportID,
            placeUrl:placeUrl,
            placeFile:placeFile,
            placeDetail:placeDetail
        })
    }

    // if no error
    if(!errors) {
        let form_data = {
            placeName: placeName,
            sportID: sportID,
            placeUrl:placeUrl,
            placeFile:placeFile,
            placeDetail:placeDetail
        }
        // insert query db
        dbConnection.query('INSERT INTO place SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('place/add', {
                    placeName: form_data.placeName,
                    sportID: form_data.sportID,
                    placeUrl: form_data.placeUrl,
                    placeFile: form_data.placeFile,
                    placeDetail: form_data. placeDetail
                })
            } else {
                req.flash('success', 'place successfully added');
                res.redirect('/place');
            }
        })
    }
})

// display edit place page
router.get('/edit/(:placeID)', (req, res, next) => {
    let placeID = req.params.placeID;

    dbConnection.query('SELECT * FROM place WHERE placeID = ' + placeID, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'place not found with id = ' + placeID)
            res.redirect('/place');
        } else {
            res.render('place/edit', {
                title: 'แก้ไข กีฬา',
                placeID: rows[0].placetID,
                placeName: rows[0].placeName,
                sportID: rows[0].sportID,
                placeUrl: rows[0].placeUrl,
                placeFile: rows[0].placeFile,
                placeDetail: rows[0].placeDetail
            })
        }
    });
})

// update place page
router.post('/update/:placeID', (req, res, next) => {
    let placeID = req.params.placeID;
    let placeName = req.body.placeName;
    let sportID = req.body.sportID;
    let placeUrl = req.body.placeUrl;
    let placeFile = req.body.placeFile;
    let placeDetail = req.body.placeDetail;
    let errors = false;

    if (placeName.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('place/edit', {
            placeID: req.params.placeID,
            placeName: placeName,
            sportID: sportID,
            placeUrl: placeUrl,
            placeFile: placeFile,
            placeDetail: placeDetail
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            placeName: placeName,
            sportID: sportID,
            placeUrl: placeUrl,
            placeFile: placeFile,
            placeDetail: placeDetail
        }
        // update query
        dbConnection.query("UPDATE place SET ? WHERE placeID = " + placeID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('place/edit', {
                    placeID: req.params.placeID,
                    placeName: form_data.placeName,
                    sportID: form_data.sportID,
                    placeUrl: form_data.placeUrl,
                    placeFile: form_data.placeFile,
                    placeDetail: form_data.placeDetail
                })
            } else {
                req.flash('success', 'place successfully updated');
                res.redirect('/place')
            }
        })
    }
})

// delete place
router.get('/delete/(:placeID)', (req, res, next) => {
    let placeID = req.params.placeID;

    dbConnection.query('DELETE FROM place WHERE placeID = ' + placeID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/place');
        } else {
            req.flash('success', 'place successfully deleted! ID = ' + placeID);
            res.redirect('/place');
        }
    })
})

module.exports = router;