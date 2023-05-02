let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fs = require('fs');

// display sport page
router.get('/', function(req, res, next) {

        dbConnection.query(`SELECT * FROM sport_type`,(error,results)=>{
                res.render('scoresheet', {data:results});
    })
})

router.get('/view/(:typeID)', function(req, res, next){
    let typeID = req.params.typeID;
    if(typeID == 1){
    res.render('scoresheet/sporttype/batminton');
    }else if(typeID == 2){
    res.render('scoresheet/sporttype/volleyball');
    }else if(typeID == 3){
        res.render('scoresheet/sporttype/basketball');
    }else if(typeID == 4){
        res.render('scoresheet/sporttype/Petanque');
        }

})

router.get('/download/(:typeID)', async function(req, res, next){
    let typeID = req.params.typeID;

})

//display add sport page
router.get('/add', function(req, res, next) {
    if(req.session.username){
    if(req.session.level === 'เจ้าหน้าที่'){
        res.render('sport/add',{
            sportName:'',
            sportPlaynum:'',
            type:''
    })
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้')
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
})

// add new sport
router.post('/add', function(req, res, next) {
    let sportName = req.body.sportName;
    let sportPlaynum = req.body.sportPlaynum;
    let type = req.body.type;
    let errors = false;

    if(sportName.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอก');
        //render to add.ejs with flash message
        res.render('sport/add', {
            sportName: sportName,
            sportPlaynum: sportPlaynum,
            type:type
        })
    }

    // if no error
    if(!errors) {
        let form_data = {
            sportName: sportName,
            sportPlaynum: sportPlaynum,
            type:type
        }
        // insert query db
        dbConnection.query('INSERT INTO sport SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('sport/add', {
                    sportName: form_data.sportName,
                    sportPlaynum: form_data.sportPlaynum,
                    type: form_data.type
                })
            } else {
                req.flash('success', 'sport successfully added');
                res.redirect('/sport');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:sportID)', function(req, res, next) {
    let sportID = req.params.sportID;
    dbConnection.query('SELECT * FROM sport WHERE sportID = ' + sportID, (err, rows, fields) => {
        if(req.session.level === 'เจ้าหน้าที่'){
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + sportID)
            res.redirect('/sport');
        } else {
            res.render('sport/edit', {
                title: 'แก้ไข กีฬา',
                sportID: rows[0].sportID,
                sportName: rows[0].sportName,
                sportPlaynum: rows[0].sportPlaynum,
                type: rows[0].type
            })
        }
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    });
})

// update book page
router.post('/update/:sportID', function(req, res, next) {
    let sportID = req.params.sportID;
    let sportName = req.body.sportName;
    let sportPlaynum = req.body.sportPlaynum;
    let type = req.body.type;
    let errors = false;

    if (sportName.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('sport/edit', {
            sportID: req.params.sportID,
            sportName: sportName,
            sportPlaynum: sportPlaynum,
            type: type
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            sportName:  sportName,
            sportPlaynum: sportPlaynum,
            type: type
        }
        // update query
        dbConnection.query("UPDATE sport SET ? WHERE sportID = " + sportID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('sport/edit', {
                    sportID: req.params.sportID,
                    sportName: form_data.sportName,
                    sportPlaynum: form_data.sportPlaynum,
                    type: form_data.type
                })
            } else {
                req.flash('success', 'sport successfully updated');
                res.redirect('/sport')
            }
        })
    }
})

// delete sport
router.get('/delete/(:sportID)', function(req, res, next) {
    let sportID = req.params.sportID;

    dbConnection.query('DELETE FROM sport WHERE sportID = ' + sportID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/sport');
        } else {
            req.flash('success', 'sport successfully deleted! ID = ' + sportID);
            res.redirect('/sport');
        }
    })
})

module.exports = router;