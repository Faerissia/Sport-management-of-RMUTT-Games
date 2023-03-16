const e = require('express');
let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');


router.post('/search-place', function(req, res, next) {
    let query = req.body.search;
    if(!query) {
        res.redirect('/place');
    } else {
        let sql = 'SELECT * FROM place WHERE placeName LIKE ?';
        let data = ['%' + query + '%'];
        dbConnection.query(sql, data, (err, results) => {
            if(err) throw err;
            res.render('place', {data: results});
        });
    }
});

// display place page
router.get('/', function(req, res, next) {
    dbConnection.query('SELECT * FROM place ORDER BY placeID asc', (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('place', { data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
        })
})

//display add place page
router.get('/add', function(req, res, next) {
    dbConnection.query('SELECT typeID,nameType FROM sport_type ORDER BY typeID asc', (err, rows) => {
        if(req.session.username){    
        if(req.session.level === 'เจ้าหน้าที่'){
                res.render('place/add',{data: rows})
            }else{
                req.flash('error','ไม่มีสิทธิ์เข้าถึง')
                res.redirect('dashboard');
            }
        }else{
            res.redirect('error404');
        }
})
})

// add new place
router.post('/add', function(req, res, next) {
    let placeName = req.body.placeName;
    let typeID = req.body.typeID;
    let placeUrl = req.body.placeUrl;
    let placeFile = req.files.placeFile;
    let placeDetail = req.body.placeDetail;

    var name_placefile = new Date().getTime() +'_'+placeFile.name;
    placeFile.mv('./assets/place/' + name_placefile);

    var values = []

    let day = req.body.day;
    let timeOpen = req.body.timeOpen;
    let timeClose = req.body.timeClose;

    var sql_place = "INSERT INTO place (placeName,typeID,placeUrl,placeFile,placeDetail) VALUES ?";
    var sql_day = "INSERT INTO place_opening (day,timeOpen,timeClose,placeID) VALUES ?";

        // insert query db
        dbConnection.query(sql_place,[[[placeName, typeID, placeUrl, name_placefile, placeDetail]]], (err, result) => {
            if (err) throw err;
            var placeID = result.insertId;
            

        if(Array.isArray(day)){
            console.log('array')
                for (var i = 0; i < day.length; i++) {
                values.push([day[i], timeOpen[i], timeClose[i], placeID])
                }
                dbConnection.query(sql_day,[values], function (err, result){
                    if(err) throw err;
                    console.log("number of day inserted: "+ result.affectedRows);
                    
                })
                }else if(day){
                    console.log('not')
                    open = timeOpen.filter(Boolean);
                    close = timeClose.filter(Boolean);
                    let set_form={
                        placeID: placeID,
                        day: day,
                        timeOpen:open,
                        timeClose:close
                    }
                    dbConnection.query("INSERT INTO place_opening SET ?",set_form, (err, result)=>{
                        if(err) throw err;
                        console.log('success')
                    })
                }
                res.redirect('/place');
        })
    }
)

// display edit place page
router.get('/edit/(:placeID)', function(req, res, next) {
    let placeID = req.params.placeID;
    dbConnection.query('SELECT s.*,p.* FROM place p LEFT JOIN sport_type s ON s.typeID = p.typeID WHERE placeID = ' + placeID, (err, rows, fields) => {
        if(req.session.level === 'เจ้าหน้าที่'){
        if (rows.length <= 0) {
            req.flash('error', 'place not found with id = ' + placeID)
            res.redirect('/place');
        } else {
            res.render('place/edit', {
                title: 'แก้ไข กีฬา',
                data: rows,
                placeID: rows[0].placeID,
                placeName: rows[0].placeName,
                typeID: rows[0].typeID,
                placeUrl: rows[0].placeUrl,
                placeFile: rows[0].placeFile,
                placeDetail: rows[0].placeDetail
            })
        }
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
    });
})

// update place page
router.post('/update/(:placeID)', function(req, res, next) {
    let placeID = req.params.placeID;
    let placeName = req.body.placeName;
    let typeID = req.body.typeID;
    let placeUrl = req.body.placeUrl;
    let placeDetail = req.body.placeDetail;
    let placeFile = req.files.placeFile;
    let errors = false;
    var name_placefile = new Date().getTime() +'_'+placeFile.name;
    placeFile.mv('./assets/place/' + name_placefile);

    console.log(placeID)

    // if no error
    if (!errors) {
        let form_data = {
            placeName: placeName,
            typeID: typeID,
            placeUrl: placeUrl,
            placeFile:name_placefile,
            placeDetail: placeDetail,
        }
        // update query
        dbConnection.query("UPDATE place SET ? WHERE placeID = " + placeID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('place/edit', {
                    placeID: req.params.placeID,
                    placeName: form_data.placeName,
                    typeID: form_data.typeID,
                    placeUrl: form_data.placeUrl,
                    placeFile: form_data.placeFile,
                    placeDetail: form_data.placeDetail,
              
                })
            } else {
                req.flash('success', 'place successfully updated');
                res.redirect('/place')
            }
        })
    }
})

// delete place
router.get('/delete/(:placeID)', function(req, res, next) {
    let placeID = req.params.placeID;

    dbConnection.query('DELETE FROM place WHERE placeID = ' + placeID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/place');
        } else {
            req.flash('success', 'place successfully deleted! ID = ' + placeID);
            res.redirect('/place');
        }
    })
})

router.get('/page/(:placeID)', function(req, res, next) {
    let placeID = req.params.placeID;
    dbConnection.query('SELECT p.*,s.* FROM place p LEFT JOIN sport_type s ON p.typeID = s.typeID WHERE placeID =' + placeID, (err, rows) => {
        if(req.session.level === 'เจ้าหน้าที่'){
        if (rows.length <= 0) {
            req.flash('error', 'ไม่พบสถานที่แข่งขัน ' + placeID)
            res.redirect('/place');
        } else {
            res.render('place/page', { data: rows})
        }
    }else{
        req.flash('error','ไม่สามารถเข้าถึงได้');
        res.redirect('login');
    }
    });
})

module.exports = router;