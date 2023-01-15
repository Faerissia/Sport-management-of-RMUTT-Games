let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
let bodyParser = require("body-parser");
const path = require('path');

    

// display tournament page
router.get('/', (req, res, next) => {
    sql ="SELECT t.tnmID, t.tnmName,s.sportName,t.tnmStartdate,t.tnmTypegame,SUM(CASE p.playerStatus WHEN 'accept' THEN 1 ELSE 0 END) AS accept_count FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN player p ON t.tnmID = p.tnmID WHERE t.tnmTypegame IS NULL GROUP BY t.tnmID;";

    dbConnection.query(sql, (err, rows) => {
    if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
        })
})

//display add tournament page
router.get('/add', (req, res, next) => {
    dbConnection.query('SELECT sportID,sportName FROM sport ORDER BY sportID asc', (err, rows) => {
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/add', { data: rows,status_login: req.session.loggedin,user: user});
            }else{
                req.flash('error','ไม่สามารถเข้าถึงได้');
                res.redirect('login');
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

    let name_tnmPicture = new Date().getTime() +'_'+tnmPicture.name;
    let name_tnmFile1 = new Date().getTime() +'_'+tnmFile1.name;

    tnmPicture.mv('./assets/images/' + name_tnmPicture);
    tnmFile1.mv('./assets/doc/' + name_tnmFile1);
    


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
            tnmPicture: name_tnmPicture,
            tnmFile1: name_tnmFile1
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
                    tnmPicture: form_data.name_tnmPicture,
                    tnmFile1: form_data.name_tnmFile1
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
        if(role === 'เจ้าหน้าที่'){
        if (rows.length <= 0) {
            req.flash('error', 'tournament not found with id = ' + tnmID)
            res.redirect('/tournament');
        } else  {
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
                tnmFile1: rows[0].tnmFile1,status_login: req.session.loggedin,user: user
            })
        }
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
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
    let tnmPicture = req.files.tnmPicture;
    let tnmFile1 = req.files.tnmFile1;
    let errors = false;

    let name_tnmPicture = new Date().getTime() +'_'+tnmPicture.name;
    let name_tnmFile1 = new Date().getTime() +'_'+tnmFile1.name;

    tnmPicture.mv('./assets/images/' + name_tnmPicture);
    tnmFile1.mv('./assets/doc/' + name_tnmFile1);


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
            tnmPicture: name_tnmPicture,
            tnmFile1: name_tnmFile1
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
                    tnmPicture: form_data.name_tnmPicture,
                    tnmFile1: form_data.name_tnmFile1
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
            req.flash('error','ไม่สามารถลบการแข่งขันได้'),
            res.redirect('/tournament');
        } else {
            req.flash('success', 'tournament successfully deleted! ID = ' + tnmID);
            res.redirect('/tournament');
        }
    })
})

//หน้าจัดสาย
router.get('/bracket/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID ='+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/bracket', { data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
    }
}else{
    res.redirect('error404');
}
    })
})

//หน้าผู้เข้าร่วม
router.get('/participant/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID WHERE t.tnmID = '+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            if(rows[0].teamID === null){
            res.render('tournament/participant', { data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
        }else{
            dbConnection.query('SELECT team.*,t.* FROM team team LEFT JOIN tournament t ON team.tnmID = t.tnmID WHERE t.tnmID = '+tnmID,(err, rows) => {
                res.render('tournament/participant', { data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
            })
        }
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
    }
}else{
    res.redirect('error404');
}
    })
})

//หน้าแมทช์การแข่งขัน
router.get('/match/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT * FROM tournament WHERE tnmID ='+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/match', { data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

//หน้าไฮไลท์
router.get('/highlight/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID,t.tnmName,h.tnmID,h.linkvid,h.filePic,h.date,h.description FROM tournament t LEFT JOIN highlight h ON t.tnmID = h.tnmID WHERE t.tnmID = '+tnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/highlight', { data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
    }else{
    res.redirect('error404');
    }
    })
})

router.get('/highlight/add/(:tnmID)', (req, res, next)=> {
    let tnmID = req.params.tnmID;
    dbConnection.query('SELECT t.tnmID,t.tnmName,h.tnmID,h.linkvid,h.filePic,h.date,h.description FROM tournament t LEFT JOIN highlight h ON t.tnmID = h.tnmID WHERE t.tnmID = '+tnmID, (err, rows) => {
    if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('tournament/addhl', { data: rows,tnmID:tnmID,status_login: req.session.loggedin,user: user});
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
    }else{
    res.redirect('error404');
    }
    })
})

router.post('/highlight/add/(:tnmID)', (req, res, next)=> {
    if (req.files) {
        let tnmID = req.params.tnmID;
        let date = req.body.date;
        let description = req.body.description;
        let filePic = req.files.filePic;

        let name_filePic = new Date().getTime() +'_'+filePic.name;
        filePic.mv('./assets/images/' + name_filePic);

        let form_data = {
            tnmID: tnmID,
            filePic: name_filePic,
            date: date,
            description: description
        }
        dbConnection.query("INSERT INTO highlight SET ?",form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('tournament/addhl', {
                    data: req.params.tnmID,
                    filePic: req.files.name_filePic,
                    date: req.body.date,
                    description: req.body.description,
                    status_login: req.session.loggedin,
                    user: user

                })
            } else {
                req.flash('success', 'เพิ่ม Highlight เรียบร้อยแล้ว');
                res.redirect('/tournament')
            }
        })
    }else{
        let tnmID = req.params.tnmID;
        let linkvid = req.body.linkvid;
        let date = req.body.date;
        let description = req.body.description;

        let form_data = {
            tnmID: tnmID,
            linkvid: linkvid,
            date: date,
            description: description
    }
    dbConnection.query("INSERT INTO highlight SET ?",form_data, (err, result) => {
        if (err) {
            req.flash('error', err);
            res.render('tournament/addhl', {
                data: req.params.tnmID,
                linkvid: linkvid,
                date: date,
                description: description,
                status_login: req.session.loggedin,
                user: user

            })
        } else {
            req.flash('success', 'เพิ่ม Highlight เรียบร้อยแล้ว');
            res.redirect('/tournament/bracket/'+tnmID)
        }
    })

    }

})





module.exports = router;