let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display uni page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM university ORDER BY uniID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('uni', { data: '' });
        } else {
            res.render('uni', { data: rows });
        }
    })
})

//display add uni page
router.get('/add',(req, res, next) => {
    res.render('uni/add',{
        name:'',
        status:''
    })
})

// add new uni
router.post('/add', (req, res, next) =>{
    let name = req.body.name;
    let status = req.body.status;
    let errors = false;

    if(name.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอก');
        //render to add.ejs with flash message
        res.render('uni/add', {
            name: name,
            status: status
        })
    }

    // if no error
    if(!errors) {
        let form_data = {
            name: name,
            status: status
        }
        // insert query db
        dbConnection.query('INSERT INTO university SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('uni/add', {
                    name: form_data.name,
                    status: form_data.status
                })
            } else {
                req.flash('success', 'uni successfully added');
                res.redirect('/uni');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:uniID)', (req, res, next) => {
    let uniID = req.params.uniID;

    dbConnection.query('SELECT * FROM university WHERE uniID = ' + uniID, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + uniID)
            res.redirect('/uni');
        } else {
            res.render('uni/edit', {
                title: 'แก้ไข มหาวิทยาลัย',
                uniID: rows[0].uniID,
                name: rows[0].name,
                status: rows[0].status
            })
        }
    });
})

// update book page
router.post('/update/:uniID', (req, res, next) => {
    let uniID = req.params.uniID;
    let name = req.body.name;
    let status = req.body.status;
    let errors = false;

    if (name.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('uni/edit', {
            uniID: req.params.uniID,
            name: name,
            status: status
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            status: status
        }
        // update query
        dbConnection.query("UPDATE university SET ? WHERE uniID = " + uniID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('books/edit', {
                    uniID: req.params.uniID,
                    name: form_data.name,
                    status: form_data.status
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/uni')
            }
        })
    }
})

// delete uni
router.get('/delete/(:uniID)', (req, res, next) => {
    let uniID = req.params.uniID;

    dbConnection.query('DELETE FROM university WHERE uniID = ' + uniID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/uni');
        } else {
            req.flash('success', 'Book successfully deleted! ID = ' + uniID);
            res.redirect('/uni');
        }
    })
})

module.exports = router;