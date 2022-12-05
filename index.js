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

const ifLoggedIn =(req, res, next)=>{
    if (!req.session.isLoggedIn){
        return res.rendirect('/dashboard');
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

//register page
app.post('/register', ifLoggedIn,[
    body('user_email', 'Invalid Email Address!').isEmail().custom((value) =>{
        return dbConnection.execute('SELECT email FROM users WHERE email = ?',[value])
        .then(([rows]) => {
            if(rows.length>0){
                return Promise.reject('This email already in use!');
            }
            return true;  
        })
    }),
    body('user_name', 'Username os empty!').trim().not().isEmpty(),
    body('User_pass', 'The password must be of minimun length 6 characters').trim().isLength({ min:6}),
],//end of post data validation

)


app.listen(3000, () => console.log("Server is running..."))