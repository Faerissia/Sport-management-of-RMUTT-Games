const { query } = require('express');
let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');


router.post('/search-placetable', (req, res) => {
    let place = req.body.place;
    let sporttype = req.body.sporttype;
    let date = req.body.date;
    if(!place && !sporttype && !date) {
        res.redirect('/placetable');
    }else if(place){
        let sql = 'SELECT * FROM place WHERE placeName LIKE ?';
        let data = ['%' + place + '%'];
        dbConnection.query(sql,data,(err,place)=>{
        dbConnection.query('SELECT * FROM matchplay WHERE pDate AND time AND timeend AND placeID IS NOT NULL',(err,match)=>{
        dbConnection.query('SELECT * FROM place_opening',(err,opening)=>{
        dbConnection.query('SELECT * FROM sport_type',(err,sporttype)=>{
            let thisDate = new Date().toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'});
            const daysOfWeek = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
            const today = new Date();
            const currentDay = daysOfWeek[today.getDay()];
        res.render('placetable',{sporttype,thisDate,currentDay,opening,match,place,status_login: req.session.loggedin,user: user});
    })
    })
    })
    })
    }else if(sporttype){
        let sql = 'SELECT * FROM place LEFT JOIN sport_type ON place.typeID = sport_type.typeID WHERE sport_type.typeID = ?';
        dbConnection.query(sql,sporttype,(err,place)=>{
        dbConnection.query('SELECT * FROM matchplay WHERE pDate AND time AND timeend AND placeID IS NOT NULL',(err,match)=>{
        dbConnection.query('SELECT * FROM place_opening',(err,opening)=>{
        dbConnection.query('SELECT * FROM sport_type',(err,sporttype)=>{
            let thisDate = new Date().toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'});
            const daysOfWeek = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
            const today = new Date();
            const currentDay = daysOfWeek[today.getDay()];
        res.render('placetable',{sporttype,thisDate,currentDay,opening,match,place,status_login: req.session.loggedin,user: user});
    })
    })
    })
    })
    }else if(date){
        let sql = 'SELECT * FROM matchplay WHERE pDate AND time AND timeend AND placeID IS NOT NULL AND pDate = ?';
        dbConnection.query('SELECT * FROM place',(err,place)=>{
        dbConnection.query(sql,date,(err,match)=>{
        dbConnection.query('SELECT * FROM place_opening',(err,opening)=>{
        dbConnection.query('SELECT * FROM sport_type',(err,sporttype)=>{
            let thisDate = new Date(date).toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'});
            const daysOfWeek = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
            const today = new Date(date);
            const currentDay = daysOfWeek[today.getDay()];
        res.render('placetable',{sporttype,thisDate,currentDay,opening,match,place,status_login: req.session.loggedin,user: user});
    })
    })
    })
    })
    }else if(place && sporttype){

    }else if(place && date){

    }else if(sporttype && date){

    }else {
        
    }
});

// display place page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM place', (err, place) => {
        dbConnection.query('SELECT * FROM matchplay WHERE pDate AND time AND timeend AND placeID IS NOT NULL',(err,match)=>{
            dbConnection.query('SELECT * FROM place_opening',(err,opening)=>{
                dbConnection.query('SELECT * FROM sport_type',(err,sporttype)=>{    
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            let thisDate = new Date().toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'});
            const daysOfWeek = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
            let today = new Date();
            const currentDay = daysOfWeek[today.getDay()];
            res.render('placetable', { sporttype,currentDay,thisDate,opening,match,place,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
        })
    })
})
})
})
module.exports = router;