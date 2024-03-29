let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

router.post('/search-fac', function(req, res,next) {
    let uniName = req.body.uniName;
    let query = req.body.search;
    let uniID = req.body.uniID;
    if(!query) {
        res.redirect('/faculty/'+uniID);
    } else {
        let sql = 'SELECT u.uniID , f.name AS facName ,u.name AS uniName,f.facultyID FROM  faculty f LEFT JOIN university u ON f.uniID = u.uniID WHERE u.uniID = ? and f.name LIKE ?';
        let data = [uniID,'%' + query + '%'];
        dbConnection.query(sql, data, (err, results) => {
            if(err) throw err;
            res.render('faculty', {data: results,uniID,uniName});
        });
    }
});

// display faculty list
router.get('/(:uniID)', function(req, res, next) {
    let uniID = req.params.uniID;
    dbConnection.query('SELECT u.uniID , f.name AS facName ,u.name AS uniName,f.facultyID FROM  faculty f LEFT JOIN university u ON f.uniID = u.uniID WHERE u.uniID = '+ uniID, (err, rows) => {
        if(req.session.username){
            if(req.session.level === 'เจ้าหน้าที่'){
                res.render('faculty', { data: rows,uniID: uniID});
            }else{
                req.flash('error','ไม่สามารถเข้าถึงได้');
                res.redirect('login');
            }
    }else{
        res.redirect('error404');
    }
    })
})

//display add faculty to list
router.get('/add/(:uniID)', function(req, res, next) {
    let uniID = req.params.uniID;
    dbConnection.query('SELECT uniID FROM university WHERE uniID = '+ uniID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){     
            res.render('faculty/add',{ data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
})
})

// add new faculty to list
router.post('/add', function(req, res, next) {
    let name = req.body.name;
    let uniID = req.body.uniID;
    let errors = false;

    if(name.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอกชื่อคณะ');
        //render to add.ejs with flash message
        res.render('faculty/add/'+uniID, {
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
                res.render('faculty/add/'+uniID, {
                    name: form_data.name,
                    uniID: form_data.uniID
                })
            } else {
                req.flash('success', 'เพิ่มคณะเรียบร้อยแล้ว');
                res.redirect('/faculty/'+ uniID);
            }
        })
    }
})

// display edit faculty to list
router.get('/edit/(:facultyID)', function(req, res, next) {
    let facultyID = req.params.facultyID;
    dbConnection.query('SELECT * FROM faculty WHERE facultyID = ' + facultyID, (err, rows, fields) => {
        if(req.session.level === 'เจ้าหน้าที่'){
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + facultyID)
            res.redirect('/faculty');
        } else {
            res.render('faculty/edit', {
                title: 'แก้ไข มหาวิทยาลัย',
                facultyID: rows[0].facultyID,
                name: rows[0].name,
                uniID: rows[0].uniID
            })
        }}else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    });
})

// update faculty page
router.post('/update/(:facultyID)', function(req, res, next) {
    let facultyID = req.params.facultyID;
    let name = req.body.name;
    let uniID = req.body.uniID;
    let errors = false;

    if (name.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('faculty/edit', {
            uniID: req.params.facultyID,
            name: name,
            uniID: uniID
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
                res.render('faculty/edit', {
                    facultyID: req.params.facultyID,
                    name: form_data.name,
                    uniID: form_data.uniID
                })
            } else {
                req.flash('success', 'คณะ '+name+' ได้รับการแก้ไข');
                res.redirect('/faculty/'+uniID);
            }
        })
    }
})

// delete faculty
router.get('/delete/(:facultyID)', function(req, res, next) {
    let facultyID = req.params.facultyID;
    dbConnection.query('DELETE FROM faculty WHERE facultyID = ' + facultyID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/faculty');
        } else {
            req.flash('success', 'ลบคณะเรียบร้อยแล้ว ' + facultyID);
            res.redirect('/uni');
        }
    })
})

module.exports = router;