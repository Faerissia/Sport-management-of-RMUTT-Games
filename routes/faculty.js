let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display faculty list
router.get('/(:uniID)', (req, res, next) => {
    let uniID = req.params.uniID;
    dbConnection.query('SELECT u.uniID , f.name AS facName ,u.name AS uniName,f.facultyID FROM faculty f LEFT JOIN university u ON f.uniID = u.uniID WHERE u.uniID = '+ uniID, (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('faculty', { data: rows });
        } else {
            res.render('faculty', { data: rows });
        }
      })
})

//display add faculty to list
router.get('/add/(:uniID)',(req, res, next) => {
    let uniID = req.params.uniID;
    dbConnection.query('SELECT uniID FROM faculty WHERE uniID =  '+ uniID, (err, rows) => {
    res.render('faculty/add',{ data: rows });
})
})

// add new faculty to list
router.post('/add', (req, res, next) =>{
    let name = req.body.name;
    let uniID = req.body.uniID;
    let errors = false;
    console.log(uniID)

    if(name.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอกชื่อคณะ');
        //render to add.ejs with flash message
        res.render('faculty/add', {
            name: name,
            uniID: uniID
        })
    }

    // if no error
    if(!errors) {
        let form_data = {
            name: name,
            uniID: uniID
        }
        // insert query db
        dbConnection.query('INSERT INTO faculty SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('faculty/add', {
                    name: form_data.name,
                    uniID: form_data.uniID
                })
            } else {
                req.flash('success', 'เพิ่มคณะเรียบร้อยแล้ว');
                res.redirect('/uni');
            }
        })
    }
})

// display edit faculty to list
router.get('/edit/(:facultyID)', (req, res, next) => {
    let facultyID = req.params.facultyID;

    dbConnection.query('SELECT * FROM faculty WHERE facultyID = ' + facultyID, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + facultyID)
            res.redirect('/faculty');
        } else {
            res.render('faculty/edit', {
                title: 'แก้ไข มหาวิทยาลัย',
                facultyID: rows[0].facultyID,
                name: rows[0].name,
            })
        }
    });
})

// update faculty page
router.post('/update/(:facultyID)', (req, res, next) => {
    let facultyID = req.params.facultyID;
    let name = req.body.name;
    let errors = false;

    if (name.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('faculty/edit', {
            uniID: req.params.facultyID,
            name: name
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            name: name
        }
        // update query
        dbConnection.query("UPDATE faculty SET ? WHERE facultyID = " + facultyID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('books/edit', {
                    facultyID: req.params.facultyID,
                    name: form_data.name
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/uni')
            }
        })
    }
})

// delete faculty
router.get('/delete/(:facultyID)', (req, res, next) => {
    let facultyID = req.params.facultyID;
    console.log(facultyID)
    dbConnection.query('DELETE FROM faculty WHERE facultyID = ' + facultyID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/uni');
        } else {
            req.flash('success', 'Book successfully deleted! ID = ' + facultyID);
            res.redirect('/uni');
        }
    })
})

module.exports = router;