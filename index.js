const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const {
    body,
    validationResult
} = require('express-validator');

const app = express();
app.use(express.urlencoded({
    extended: false
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000 // 1hr อายุของ cookie
}))

//Declaring Custom Middleware
const ifNotLoggedIn = (req, res, next) =>{
    if (!req.session.isLoggedIn){
        return res.render('login');
    }
    next();
}

//root rage
app.get('/', ifNotLoggedIn, (req, res, next)=>{
    dbConnection.execute("SELECT email FROM account WHERE id =?",[req.session.userID])
    .then(([rows]) =>{
        req.render('home',{
            email:rows[0].email
        })
    })
})

app.listen(3000, () => console.log("Server is running..."))