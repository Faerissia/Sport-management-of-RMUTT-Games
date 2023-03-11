let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

router.post('/search-account', (req, res) => {
    let query = req.body.search;
    if(!query){
        res.redirect('/account');
    }else{ 
        sql = 'SELECT * FROM account WHERE name LIKE ? OR lname LIKE ?';
        let like = ['%' + query + '%','%' + query +'%'];
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('account', {data: results,status_login: req.session.loggedin,user: user});
    });
}
});

// display account page
router.get('/', (req, res, next) => {
        dbConnection.query('SELECT * FROM account ORDER BY accountID asc', (err, rows) => {
            if(req.session.loggedin){
                if(role === 'ผู้ดูแลระบบ'){
                    res.render('account', { data: rows ,status_login: req.session.loggedin,user: user});
                }else{
                    req.flash('error','ไม่สามารถเข้าถึงได้');
                    res.redirect('login');
                }
            }else{
                res.redirect('error404');
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
    let cpassword = req.body.cpassword;
    let name = req.body.name;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let level = req.body.level;
    let errors = false;
    console.log("🚀 ~ file: account.js:59 ~ router.post ~ cpassword:", cpassword)
    console.log("🚀 ~ file: account.js:61 ~ router.post ~ password:", password)


    if(cpassword !== password) {
        errors = true;
        req.flash('error', 'รหัสผ่าน ไม่ตรงกัน');
        res.render('account/add', {
            email: email,
            password: password,
            name: name,
            lname: lname,
            phone: phone,
            level: level,
            status_login: req.session.loggedin,
            user: user
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
                    status: form_data.status,
                    status_login: req.session.loggedin,
                    user: user
                })
            } else {
                req.flash('success', 'เพิ่มบัญชีผู้ใช้งานเรียบร้อยแล้ว!');
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
                status: rows[0].status,
                status_login: req.session.loggedin,
                user: user
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
            status: status,
            status_login: req.session.loggedin,
            user: user
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
                    status: form_data.status,
                    status_login: req.session.loggedin,
                    user: user
                })
            } else {
                req.flash('success', 'แก้ไขข้อมูลบัญชีผู้ใช้งานเรียบร้อยแล้ว');
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
            req.flash('success', 'ได้ทำการลบบัญชีผู้ใช้งานเรียบร้อยแล้ว' + accountID);
            res.redirect('/account');
        }
    })
})

router.get('/page/(:accountID)',(req, res, next) => {
    let accountID = req.params.accountID;
    dbConnection.query('SELECT * FROM account WHERE accountID = ' + accountID, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'ไม่พบบัญชี id = ' + accountID)
            res.redirect('/account');
        } else {
            res.render('account/page', {
                accountID: rows[0].accountID,
                email: rows[0].email,
                password: rows[0].password,
                name: rows[0].name,
                lname: rows[0].lname,
                phone: rows[0].phone,
                level: rows[0].level,
                status: rows[0].status,
                status_login: req.session.loggedin,
                user: user
            })
        }
    });
})

module.exports = router;