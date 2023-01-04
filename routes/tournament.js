let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

// display tournament page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportName,t.tnmStartdate FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID', (err, rows) => {
        if (req.session.loggedin) {
            res.render('tournament', { data: rows,status_login: req.session.loggedin,user: user });
        }else if(err){
            req.flash('error', err);
            res.render('tournament', { data: '' });
        } else {
            res.render('login',{status_login: req.session.loggedin,user: user});
        }
    })
})

//display add tournament page
router.get('/add', (req, res, next) => {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('tournament/add', { data: '' });
        } else {
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
            
        }
    })
})


// add new tournament
router.post('/add', (req, res, next) =>{
    let tnmName = req.body.tnmName;
    let sportID = req.body.sportID;
    let Rstartdate = req.body.Rstartdate;
    let Renddate = req.body.Renddate;
    let tnmStartdate = req.body.tnmStartdate;
    let tnmEnddate = req.body.tnmEnddate;
    let tnmUrl = req.body.tnmUrl;
    let tnmDetail = req.body.tnmDetail;
    let errors = false;

    let tnmPicture = req.files.tnmPicture;
    let tnmFile1 = req.files.tnmFile1;

    tnmPicture.mv('./assets/' + tnmPicture.name);
    tnmFile1.mv('./assets/' + tnmFile1.name);

    // if no error
    if(!errors) {
        let form_data = {
            tnmName: tnmName,
            sportID: sportID,
            Rstartdate: Rstartdate,
            Renddate: Renddate,
            tnmStartdate: tnmStartdate,
            tnmEnddate:tnmEnddate,
            tnmUrl: tnmUrl,
            tnmDetail: tnmDetail,
            tnmPicture: tnmPicture.name,
            tnmFile1: tnmFile1.name
        }
        // insert query db
        dbConnection.query('INSERT INTO tournament SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('tournament/add', {
                    tnmName: form_data.tnmName,
                    sportID: form_data.sportID,
                    Rstartdate: form_data.Rstartdate,
                    Renddate: form_data.Renddate,
                    tnmStartdate: form_data.tnmStartdate,
                    tnmEnddate: form_data.tnmEnddate,
                    tnmUrl: form_data.tnmUrl,
                    tnmDetail: form_data.tnmDetail,
                    tnmPicture: form_data.tnmPicture,
                    tnmFile1: form_data.tnmFile1
                })
            } else {
                req.flash('success', 'tournament successfully added');
                res.redirect('/tournament');
            }
        })
    }
})

// display edit tournament page
router.get('/edit/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID, t.tnmName,s.sportID,s.sportName,t.Rstartdate,t.Renddate,t.tnmStartdate,t.tnmEnddate,t.tnmDetail,t.tnmPicture,t.tnmFile1 FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID =  ' + tnmID, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'tournament not found with id = ' + tnmID)
            res.redirect('/tournament');
        } else {
            res.render('tournament/edit', { data:rows,
                title: 'แก้ไข การแข่งขัน',
                tnmID: rows[0].tnmID,
                tnmName: rows[0].tnmName,
                sportID: rows[0].sportID,
                tnmUrl: rows[0].tnmUrl,
                Rstartdate: rows[0].Rstartdate,
                Renddate: rows[0].Renddate,
                tnmStartdate: rows[0].tnmStartdate,
                tnmEnddate: rows[0].tnmEnddate,
                tnmDetail: rows[0].tnmDetail,
                tnmPicture: rows[0].tnmPicture,
                tnmFile1: rows[0].tnmFile1
            })
        }
    });
})

// update book page
router.post('/update/:tnmID', (req, res, next) => {
    let tnmID = req.params.tnmID;
    let tnmName = req.body.tnmName;
    let sportID = req.body.sportID;
    let tnmUrl = req.body.tnmUrl;
    let Rstartdate = req.body.Rstartdate;
    let Renddate = req.body.Renddate;
    let tnmStartdate = req.body.tnmStartdate;
    let tnmEnddate = req.body.tnmEnddate;
    let tnmDetail = req.body.tnmDetail;
    let tnmPicture = req.body.tnmPicture;
    let tnmFile1 = req.body.tnmFile1;
    let errors = false;

    // if no error
    if (!errors) {
        let form_data = {
            tnmName:  tnmName,
            sportID: sportID,
            tnmUrl: tnmUrl,
            Rstartdate: Rstartdate,
            Renddate: Renddate,
            tnmStartdate: tnmStartdate,
            tnmEnddate:tnmEnddate,
            tnmDetail: tnmDetail,
            tnmPicture: tnmPicture,
            tnmFile1: tnmFile1
        }
        // update query
        dbConnection.query("UPDATE tournament SET ? WHERE tnmID = " + tnmID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('tournament/edit', {
                    tnmID: req.params.tnmID,
                    tnmName: form_data.tnmName,
                    sportID: form_data.sportID,
                    Rstartdate: form_data.Rstartdate,
                    Renddate: form_data.Renddate,
                    tnmStartdate: form_data.tnmStartdate,
                    tnmEnddate: form_data.tnmEnddate,
                    tnmUrl: form_data.tnmUrl,
                    tnmDetail: form_data.tnmDetail,
                    tnmPicture: form_data.tnmPicture,
                    tnmFile1: form_data.tnmFile1
                })
            } else {
                req.flash('success', 'tournament successfully updated');
                res.redirect('/tournament')
            }
        })
    }
})

// delete tournament
router.get('/delete/(:tnmID)', (req, res, next) => {
    let tnmID = req.params.tnmID;

    dbConnection.query('DELETE FROM tournament WHERE tnmID = ' + tnmID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/tournament');
        } else {
            req.flash('success', 'tournament successfully deleted! ID = ' + tnmID);
            res.redirect('/tournament');
        }
    })
})

//หน้าจัดสาย
router.get('/bracket/(:tnmID)', (req, res, next)=> {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.redirect('/tournament');
        } else {
            res.render('tournament/bracket', { data: rows,});
    }
    })
})

//หน้าผู้เข้าร่วม
router.get('/participant/(:tnmID)', (req, res, next)=> {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.redirect('/tournament');
        } else {
            res.render('tournament/participant', { data: rows,});
    }
    })
})

//หน้าแมทช์การแข่งขัน
router.get('/match/(:tnmID)', (req, res, next)=> {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.redirect('/tournament');
        } else {
            res.render('tournament/match', { data: rows,});
    }
    })
})

//หน้าไฮไลท์
router.get('/highlight/(:tnmID)', (req, res, next)=> {
    dbConnection.query('SELECT * FROM tournament ORDER BY tnmID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.redirect('/tournament');
        } else {
            res.render('tournament/highlight', { data: rows,});
    }
    })
})

module.exports = router;