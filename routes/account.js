let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display account page
router.get('/', (req, res, next) => {
        dbConnection.query('SELECT * FROM account ORDER BY accountID asc', (err, rows) => {
            if(role === 'ผู้ดูแลระบบ'){
                    res.render('account', { data: rows ,status_login: req.session.loggedin,user: user});
            }else{
                req.flash('error','ไม่สามารถเข้าถึงได้');
                res.redirect('login');
            }
        })
    })

//display add account page
router.get('/add',(req, res, next) => {
    res.render('account/add',{
        email:'',
        password:'',
        name:'',
        lname:'',
        phone:'',
        cpassword:'',
        level:'',status_login: req.session.loggedin,user: user});
})


// add new account
router.post('/add', (req, res, next) =>{
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.password;
    let name = req.body.name;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let level = req.body.level;
    let errors = false;

    if(email.length === 0 || password.legnth === 0 || name.length === 0 || lname.length === 0 || phone === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอกข้อมูล *');
        //render to add.ejs with flash message
        res.render('account/add', {
            email: email,
            password: password,
            name: name,
            lname: lname,
            phone: phone,
            level: level,status_login: req.session.loggedin
        })
    }

    if(cpassword != password) {
        errors = true;
        req.flash('error', 'password ไม่ตรงกัน');
        res.render('account/add', {
            email: email,
            password: password,
            name: name,
            lname: lname,
            phone: phone,
            level: level
        })
    }

    // if no error
    if(!errors) {
        let form_data = {
            email: email,
            password: password,
            name: name,
            lname: lname,
            phone: phone,
            level: level
        }
        // insert query db
        dbConnection.query('INSERT INTO account SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('account/add', {
                    email: form_data.email,
                    password: form_data.password,
                    name: form_data.name,
                    lname: form_data.lname,
                    phone: form_data.phone,
                    level: form_data.level,
                    status: form_data.status
                })
            } else {
                req.flash('success', 'account successfully added');
                res.redirect('/account');
            }
        })
    }
})

// display edit account page
router.get('/edit/(:accountID)', (req, res, next) => {
    let accountID = req.params.accountID;
    dbConnection.query('SELECT * FROM account WHERE accountID = ' + accountID, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + accountID)
            res.redirect('/account');
        } else {
            res.render('account/edit', {
                title: 'แก้ไข บัญชี',
                accountID: rows[0].accountID,
                email: rows[0].email,
                password: rows[0].password,
                name: rows[0].name,
                lname: rows[0].lname,
                phone: rows[0].phone,
                level: rows[0].level,
                status: rows[0].status,status_login: req.session.loggedin
            })
        }
    });
})

// update account page
router.post('/update/:accountID', (req, res, next) => {
    let accountID = req.params.accountID;
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let level = req.body.level;
    let status = req.body.status;
    let errors = false;

    if (email.length === 0 && password.legnth === 0 && name.length === 0 && lname.length === 0 && phone === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('account/edit', {
            accountID: req.params.accountID,
            email: email,
            password: password,
            name: name,
            lname: lname,
            phone: phone,
            level: level,
            status: status
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            email: email,
            password: password,
            name: name,
            lname: lname,
            phone: phone,
            level: level,
            status: status
        }
        // update query
        dbConnection.query("UPDATE account SET ? WHERE accountID = " + accountID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('account/edit', {
                    accountID: req.params.accountID,
                    email: form_data.email,
                    password: form_data.password,
                    name: form_data.name,
                    lname: form_data.lname,
                    phone: form_data.phone,
                    level: form_data.level,
                    status: form_data.status
                })
            } else {
                req.flash('success', 'account successfully updated');
                res.redirect('/account')
            }
        })
    }
})

// delete account
router.get('/delete/(:accountID)', (req, res, next) => {
    let accountID = req.params.accountID;

    dbConnection.query('DELETE FROM account WHERE accountID = ' + accountID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/account');
        } else {
            req.flash('success', 'account successfully deleted! ID = ' + accountID);
            res.redirect('/account');
        }
    })
})

module.exports = router;