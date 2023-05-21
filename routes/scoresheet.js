let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fs = require('fs');
const pdf = require('html-pdf');
const ejs = require('ejs');

// display sport page
router.get('/', function(req, res, next) {

        dbConnection.query(`SELECT * FROM sport_type`,(error,results)=>{
                res.render('scoresheet', {data:results});
    })
})

router.get('/scoresheettnmsave/(:matchID)', function(req, res, next){
    const matchID = req.params.matchID;

    dbConnection.query('SELECT * FROM matchplay m LEFT JOIN place p ON p.placeID = m.placeID WHERE m.matchID = ?',matchID,(err,matchplace)=>{
        const tnmID = matchplace[0].tnmID;
        dbConnection.query('SELECT * FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE t.tnmID = ?',tnmID,(err,tnm)=>{
            const sportID = tnm[0].sportID;
            console.log(sportID);

            const data ={name:tnm[0].tnmName,
                place:matchplace[0].placeName,
                date:matchplace[0].pDate.toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'}),
                tstart:matchplace[0].time.slice(0, 5),
                tend:matchplace[0].timeend.slice(0, 5)};
            


            if(sportID == 1){

                dbConnection.query(`SELECT p1.playerFName as Fnamep1,p1.playerLName as Lnamep1,p2.playerFName as Fnamep2,p2.playerLName as Lnamep2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2  WHERE m.matchID = ?`,matchplace[0].matchID,(err,player)=>{
                const data1 ={
                    name:tnm[0].tnmName,
                    place:matchplace[0].placeName,
                    date:matchplace[0].pDate.toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'}),
                    tstart:matchplace[0].time.slice(0, 5),
                    tend:matchplace[0].timeend.slice(0, 5),
                    p1:player[0].Fnamep1 +'  '+ player[0].Lnamep1,
                    p3:player[0].Fnamep2 +'  '+ player[0].Lnamep2,
                };
                const template = fs.readFileSync('./views/scoresheet/sporttype/batminton.ejs', 'utf8');
                const html = ejs.render(template,{data:data1});
                const options = { 
                    format: 'A4',
                    orientation: 'landscape',
                    border: {
                        top: '1cm',
                        right: '1cm',
                        bottom: '1cm',
                        left: '1cm'
                    },
                    page: {
                        width: '210mm',
                        height: '297mm'
                    }
                };
                pdf.create(html,options).toFile(`./assets/scoresheet/tnmsave/ใบลงคะแนนแบดมินตัน_${tnm[0].tnmName}.pdf`, function(err, check) {
                  if (err) return console.log(err);
                  console.log(check);
                  res.download(`./assets/scoresheet/tnmsave/ใบลงคะแนนแบดมินตัน_${tnm[0].tnmName}.pdf`);
                });
            })
            
                }else if(sportID == 2){
                dbConnection.query('SELECT t1.teamName as t1Name,t1.teamID as team1,t2.teamName as t2Name, t2.teamID as team2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.matchID = ?',matchplace[0].matchID,(err,team)=>{
                dbConnection.query('SELECT * FROM player p LEFT JOIN team t1 ON t1.teamID = p.teamID WHERE p.teamID = ?',team[0].team1,(err,t1)=>{
                dbConnection.query('SELECT * FROM player p LEFT JOIN team t1 ON t1.teamID = p.teamID WHERE p.teamID = ?',team[0].team2,(err,t2)=>{
                const data1 ={
                    name:tnm[0].tnmName,
                    place:matchplace[0].placeName,
                    date:matchplace[0].pDate.toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'}),
                    tstart:matchplace[0].time.slice(0, 5),
                    tend:matchplace[0].timeend.slice(0, 5),
                    team1:team[0].t1Name,
                    team2:team[0].t2Name,
                    p1:t1[0].playerFName +'  '+ t1[0].playerLName,
                    p2:t1[1].playerFName +'  '+ t1[1].playerLName,
                    p3:t2[0].playerFName +'  '+ t2[0].playerLName,
                    p4:t2[1].playerFName +'  '+ t2[1].playerLName,

                };
                const template = fs.readFileSync('./views/scoresheet/sporttype/batminton.ejs', 'utf8');
                const html = ejs.render(template,{data:data1});
                const options = { 
                    format: 'A4',
                    orientation: 'landscape',
                    border: {
                        top: '1cm',
                        right: '1cm',
                        bottom: '1cm',
                        left: '1cm'
                    },
                    page: {
                        width: '210mm',
                        height: '297mm'
                    }
                };
                pdf.create(html,options).toFile(`./assets/scoresheet/tnmsave/ใบลงคะแนนแบดมินตัน_${tnm[0].tnmName}.pdf`, function(err, check) {
                    if (err) return console.log(err);
                    console.log(check);
                    res.download(`./assets/scoresheet/tnmsave/ใบลงคะแนนแบดมินตัน_${tnm[0].tnmName}.pdf`);
                  });
            })
            })
        })
                }else if(sportID == 3){
                    dbConnection.query('SELECT t1.teamName as t1Name,t1.teamID as team1,t2.teamName as t2Name, t2.teamID as team2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.matchID = ?',matchplace[0].matchID,(err,team)=>{
                    const data1 ={
                        name:tnm[0].tnmName,
                        place:matchplace[0].placeName,
                        date:matchplace[0].pDate.toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'}),
                        tstart:matchplace[0].time.slice(0, 5),
                        tend:matchplace[0].timeend.slice(0, 5),
                        team1:team[0].t1Name,
                        team2:team[0].t2Name,
    
                    };
                    const template = fs.readFileSync('./views/scoresheet/sporttype/volleyball.ejs', 'utf8');
                const html = ejs.render(template,{data:data1});
                const options = { 
                    format: 'A4',
                    orientation: 'landscape',
                    border: {
                        top: '1cm',
                        right: '1cm',
                        bottom: '1cm',
                        left: '1cm'
                    },
                    page: {
                        width: '210mm',
                        height: '297mm'
                    }
                };
                pdf.create(html,options).toFile(`./assets/scoresheet/tnmsave/ใบลงคะแนนวอลเลย์บอล_${tnm[0].tnmName}.pdf`, function(err, check) {
                if (err) return console.log(err);
                console.log(check);
                    res.download(`./assets/scoresheet/tnmsave/ใบลงคะแนนวอลเลย์บอล_${tnm[0].tnmName}.pdf`);
                });
            })
                }else if(sportID == 4){
                    dbConnection.query('SELECT t1.teamName as t1Name,t1.teamID as team1,t2.teamName as t2Name, t2.teamID as team2 FROM matchplay m LEFT JOIN team t1 ON t1.teamID = m.participant1 LEFT JOIN team t2 ON t2.teamID = m.participant2 WHERE m.matchID = ?',matchplace[0].matchID,(err,team)=>{
                        dbConnection.query('SELECT * FROM player p LEFT JOIN team t1 ON t1.teamID = p.teamID WHERE p.teamID = ?',team[0].team1,(err,t1)=>{
                        dbConnection.query('SELECT * FROM player p LEFT JOIN team t1 ON t1.teamID = p.teamID WHERE p.teamID = ?',team[0].team2,(err,t2)=>{
                const data1 ={
                    name:tnm[0].tnmName,
                    place:matchplace[0].placeName,
                    date:matchplace[0].pDate.toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'}),
                    tstart:matchplace[0].time.slice(0, 5),
                    tend:matchplace[0].timeend.slice(0, 5),
                    team1:team[0].t1Name,
                    team2:team[0].t2Name,
                    p1:t1[0].playerFName +'  '+ t1[0].playerLName,
                    p2:t1[1].playerFName +'  '+ t1[1].playerLName,
                    p3:t1[2].playerFName +'  '+ t1[2].playerLName,
                    p4:t1[3].playerFName +'  '+ t1[3].playerLName,
                    p5:t1[4].playerFName +'  '+ t1[4].playerLName,
                    p6:t2[0].playerFName +'  '+ t2[0].playerLName,
                    p7:t2[1].playerFName +'  '+ t2[1].playerLName,
                    p8:t2[2].playerFName +'  '+ t2[2].playerLName,
                    p9:t2[3].playerFName +'  '+ t2[3].playerLName,
                    p10:t2[4].playerFName +'  '+ t2[4].playerLName,

                };
                const template = fs.readFileSync('./views/scoresheet/sporttype/basketball.ejs', 'utf8');
                const html = ejs.render(template,{data:data1});
                const options = { 
                    format: 'A4',
                    border: {
                        top: '1cm',
                        right: '1cm',
                        bottom: '1cm',
                        left: '1cm'
                    },
                    page: {
                        width: '210mm',
                        height: '297mm'
                    }
                };
                pdf.create(html,options).toFile(`./assets/scoresheet/tnmsave/ใบลงคะแนนบาสเก็ตบอล_${tnm[0].tnmName}.pdf`, function(err, check) {
                  if (err) return console.log(err);
                  console.log(check);
                    res.download(`./assets/scoresheet/tnmsave/ใบลงคะแนนบาสเก็ตบอล_${tnm[0].tnmName}.pdf`);
                });
                })
                })
            })
                }else if(sportID == 5){
                    dbConnection.query(`SELECT p1.playerFName as Fnamep1,p1.playerLName as Lnamep1,p2.playerFName as Fnamep2,p2.playerLName as Lnamep2 FROM matchplay m LEFT JOIN player p1 ON p1.playerID = m.participant1 LEFT JOIN player p2 ON p2.playerID = m.participant2  WHERE m.matchID = ?`,matchplace[0].matchID,(err,player)=>{
                const data1 ={
                    name:tnm[0].tnmName,
                    place:matchplace[0].placeName,
                    date:matchplace[0].pDate.toLocaleDateString('th-TH',{day: '2-digit', month: 'long', year:'numeric'}),
                    tstart:matchplace[0].time.slice(0, 5),
                    tend:matchplace[0].timeend.slice(0, 5),
                    p1:player[0].Fnamep1 +'  '+ player[0].Lnamep1,
                    p2:player[0].Fnamep2 +'  '+ player[0].Lnamep2,
                };
                const template = fs.readFileSync('./views/scoresheet/sporttype/Petanque.ejs', 'utf8');
                const html = ejs.render(template,{data:data1});
                const options = { 
                    format: 'A4',
                    border: {
                        top: '1cm',
                        right: '1cm',
                        bottom: '1cm',
                        left: '1cm'
                    },
                    page: {
                        width: '210mm',
                        height: '297mm'
                    }
                };
                pdf.create(html,options).toFile(`./assets/scoresheet/tnmsave/ใบลงคะแนนเปตอง_${tnm[0].tnmName}.pdf`, function(err, check) {
                  if (err) return console.log(err);
                    console.log(check);
                    res.download(`./assets/scoresheet/tnmsave/ใบลงคะแนนเปตอง_${tnm[0].tnmName}.pdf`);
                    
                });
            })
                }

        })
    })

})

router.get('/view/(:typeID)', function(req, res, next){
    let typeID = req.params.typeID;
    const data ={name:"",place:"",date:"",tstart:"",tend:"",team1:"",team2:"",p1:"",p2:"",p3:"",p4:"",p5:"",p6:"",p7:"",p8:"",p9:"",p10:""};
    if(typeID == 1){
    res.render('scoresheet/sporttype/batminton',{data:data});
    }else if(typeID == 2){
    res.render('scoresheet/sporttype/volleyball',{data:data});
    }else if(typeID == 3){
        res.render('scoresheet/sporttype/basketball',{data:data});
    }else if(typeID == 4){
        res.render('scoresheet/sporttype/Petanque',{data:data});
        }

})

router.get('/download/(:typeID)', async function(req, res, next){
    let typeID = req.params.typeID;
    const data ={name:"",place:"",date:"",tstart:"",tend:""};
    if(typeID == 1){
    const template = fs.readFileSync('./views/scoresheet/sporttype/batminton.ejs', 'utf8');
    const html = ejs.render(template,{data:data});
    const options = { 
        format: 'A4',
        orientation: 'landscape',
        border: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        },
        page: {
            width: '210mm',
            height: '297mm'
        }
    };
    pdf.create(html,options).toFile('./assets/scoresheet/ใบลงคะแนนแบดมินตัน.pdf', function(err, check) {
      if (err) return console.log(err);
      console.log(check);
      res.download('./assets/scoresheet/ใบลงคะแนนแบดมินตัน.pdf');
    });

    }else if(typeID == 2){
        const template = fs.readFileSync('./views/scoresheet/sporttype/volleyball.ejs', 'utf8');
    const html = ejs.render(template,{data:data});
    const options = { 
        format: 'A4',
        orientation: 'landscape',
        border: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        },
        page: {
            width: '210mm',
            height: '297mm'
        }
    };
    pdf.create(html,options).toFile('./assets/scoresheet/ใบลงคะแนนวอลเลย์วอล.pdf', function(err, check) {
      if (err) return console.log(err);
      console.log(check);
      res.download('./assets/scoresheet/ใบลงคะแนนวอลเลย์วอล.pdf');
    });

    }else if(typeID == 3){
        const template = fs.readFileSync('./views/scoresheet/sporttype/basketball.ejs', 'utf8');
    const html = ejs.render(template,{data:data});
    const options = { 
        format: 'A4',
        border: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        },
        page: {
            width: '210mm',
            height: '297mm'
        }
    };
    pdf.create(html,options).toFile('./assets/scoresheet/ใบลงคะแนนบาสเก็ตบอล.pdf', function(err, check) {
      if (err) return console.log(err);
      console.log(check);
        res.download('./assets/scoresheet/ใบลงคะแนนบาสเก็ตบอล.pdf');
    });

    }else if(typeID == 4){
    const template = fs.readFileSync('./views/scoresheet/sporttype/Petanque.ejs', 'utf8');
    const html = ejs.render(template,{data:data});
    const options = { 
        format: 'A4',
        border: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        },
        page: {
            width: '210mm',
            height: '297mm'
        }
    };
    pdf.create(html,options).toFile('./assets/scoresheet/ใบลงคะแนนเปตอง.pdf', function(err, check) {
      if (err) return console.log(err);
        console.log(check);
        res.download('./assets/scoresheet/ใบลงคะแนนเปตอง.pdf');
        
    });
    }

})

//display add sport page
router.get('/add', function(req, res, next) {
    if(req.session.username){
    if(req.session.level === 'เจ้าหน้าที่'){
        res.render('sport/add',{
            sportName:'',
            sportPlaynum:'',
            type:''
    })
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้')
            res.redirect('login');
        }
    }else{
        res.redirect('error404');
    }
})

// add new sport
router.post('/add', function(req, res, next) {
    let sportName = req.body.sportName;
    let sportPlaynum = req.body.sportPlaynum;
    let type = req.body.type;
    let errors = false;

    if(sportName.length === 0) {
        errors = true;
        //set flash message
        req.flash('error', 'โปรดกรอก');
        //render to add.ejs with flash message
        res.render('sport/add', {
            sportName: sportName,
            sportPlaynum: sportPlaynum,
            type:type
        })
    }

    // if no error
    if(!errors) {
        let form_data = {
            sportName: sportName,
            sportPlaynum: sportPlaynum,
            type:type
        }
        // insert query db
        dbConnection.query('INSERT INTO sport SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('sport/add', {
                    sportName: form_data.sportName,
                    sportPlaynum: form_data.sportPlaynum,
                    type: form_data.type
                })
            } else {
                req.flash('success', 'sport successfully added');
                res.redirect('/sport');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:sportID)', function(req, res, next) {
    let sportID = req.params.sportID;
    dbConnection.query('SELECT * FROM sport WHERE sportID = ' + sportID, (err, rows, fields) => {
        if(req.session.level === 'เจ้าหน้าที่'){
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + sportID)
            res.redirect('/sport');
        } else {
            res.render('sport/edit', {
                title: 'แก้ไข กีฬา',
                sportID: rows[0].sportID,
                sportName: rows[0].sportName,
                sportPlaynum: rows[0].sportPlaynum,
                type: rows[0].type
            })
        }
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('login');
        }
    });
})

// update book page
router.post('/update/:sportID', function(req, res, next) {
    let sportID = req.params.sportID;
    let sportName = req.body.sportName;
    let sportPlaynum = req.body.sportPlaynum;
    let type = req.body.type;
    let errors = false;

    if (sportName.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('sport/edit', {
            sportID: req.params.sportID,
            sportName: sportName,
            sportPlaynum: sportPlaynum,
            type: type
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            sportName:  sportName,
            sportPlaynum: sportPlaynum,
            type: type
        }
        // update query
        dbConnection.query("UPDATE sport SET ? WHERE sportID = " + sportID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('sport/edit', {
                    sportID: req.params.sportID,
                    sportName: form_data.sportName,
                    sportPlaynum: form_data.sportPlaynum,
                    type: form_data.type
                })
            } else {
                req.flash('success', 'sport successfully updated');
                res.redirect('/sport')
            }
        })
    }
})

// delete sport
router.get('/delete/(:sportID)', function(req, res, next) {
    let sportID = req.params.sportID;

    dbConnection.query('DELETE FROM sport WHERE sportID = ' + sportID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/sport');
        } else {
            req.flash('success', 'sport successfully deleted! ID = ' + sportID);
            res.redirect('/sport');
        }
    })
})

module.exports = router;