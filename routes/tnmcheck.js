let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display tnmcheck page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.Renddate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
    if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tnmcheck', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

//display add tnmcheck page
router.get('/add', (req, res, next) => {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/add', { data: rows,
                    tnmName:'',
                    sportID:'',
                    Rstartdate:'',
                    Renddate:'',
                    tnmStartdate:'',
                    tnmEnddate:'',
                    tnmUrl:'',
                    tnmDetail:'',
                    tnmPicture:''
                });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

// delete tnmcheck
router.get('/delete/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;

    dbConnection.query('DELETE FROM tournament WHERE tnmID = ' + tnmID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/tnmcheck');
        } else {
            req.flash('success', 'tnmcheck successfully deleted! ID = ' + tnmID);
            res.redirect('/tnmcheck');
        }
    })
})

// display tnmcheck page
router.get('/candidate/(:tnmID)', (req, res, next) => {
    let thistnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.teamID,t.tnmID,t.tnmName FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID WHERE t.tnmID ='+thistnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../login');
        }
    }else{
        res.redirect('error404');
    }
        })
})

router.get('/player/(:playerID)', (req, res, next) => {
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT p.playerID,p.playerIDCard,p.playerStudentID,p.playerFName,p.playerLName,p.playerGender,p.playerBirthday,p.playerPhone,p.playerEmail,p.facultyID,p.playerFile1,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID ='+thisplayerID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/player', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

module.exports = router;