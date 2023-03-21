let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const path = require('path');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thesissportmanage@gmail.com',
      pass: 'vtevtgdhgebnyqog'
    }
  });

router.post('/search-tnmcheck', function(req, res, next) {
    let query = req.body.search;
    if(!query){
        res.redirect('/tnmcheck');
    }else{ 
        sql = "SELECT t.tnmID,t.tnmName,t.Renddate,s.sportID,s.sportName,s.sportPlaynum, SUM(CASE p.playerStatus WHEN 'accept' THEN 1 ELSE 0 END) AS accept_count, SUM(CASE p.playerStatus WHEN 'deny' THEN 1 ELSE 0 END) AS deny_count, SUM(CASE p.playerStatus WHEN 'wait' THEN 1 ELSE 0 END) AS wait_count FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN player p on t.tnmID = p.tnmID WHERE t.tnmName LIKE ? OR p.playerFName = ? GROUP BY t.tnmID";
        let like =['%' + query + '%','%' + query + '%'];
    
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmcheck', {data: results});
    });
}
});

// display tnmcheck page
router.get('/', function(req, res, next) {
    const sql = "SELECT t.tnmID,t.tnmName,t.Renddate,s.sportID,s.sportName,s.sportPlaynum, SUM(CASE p.playerStatus WHEN 'accept' THEN 1 ELSE 0 END) AS accept_count, SUM(CASE p.playerStatus WHEN 'deny' THEN 1 ELSE 0 END) AS deny_count, SUM(CASE p.playerStatus WHEN 'wait' THEN 1 ELSE 0 END) AS wait_count FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN player p on t.tnmID = p.tnmID GROUP BY t.tnmID;";
    dbConnection.query(sql, (err, rows) => {
            res.render('tnmcheck', { data: rows });

    })
})

// display tnmcheck page
router.get('/candidatesolo/(:tnmID)', function(req, res, next) {
    let thistnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,p.detailDoc,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName,team.teamName,team.NameAgent,team.LnameAgent,team.teamPhoneA,team.teamEmailA,team.teamStatus FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID LEFT JOIN team ON team.teamID = p.teamID LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID = '+thistnmID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/solocan', { data: rows,thistnmID: thistnmID});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../login');
        }
    }else{
        res.redirect('error404');
    }
        })
})

// display tnmcheck page
router.get('/candidateteam/(:tnmID)', function(req, res, next) {
    let thistnmID = req.params.tnmID;
    dbConnection.query(`SELECT teamID, tnmID, tnmName, teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA, teamStatus, teamRegDate, GROUP_CONCAT(detailDoc SEPARATOR '') as detailDoc FROM (SELECT t.tnmID,team.teamID,t.tnmName,team.teamName,team.NameAgent,team.LnameAgent,team.teamPhoneA,team.teamEmailA,team.teamStatus,team.teamRegDate, p.detailDoc
    FROM tournament t
    LEFT JOIN team ON team.tnmID = t.tnmID
    LEFT JOIN sport s ON t.sportID = s.sportID
    LEFT JOIN player p ON team.teamID = p.teamID
    WHERE t.tnmID = ?
    ) team_player_data
    GROUP BY teamID, tnmID, tnmName, teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA, teamStatus, teamRegDate`,thistnmID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/teamcan', { data: rows,thistnmID: thistnmID});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../login');
        }
    }else{
        res.redirect('error404');
    }
        })
})

router.get('/player/(:playerID)', function(req, res, next) {
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+thisplayerID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/player', { data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

router.get('/team/(:teamID)', function(req, res, next) {
    let thisteamID = req.params.teamID;
    dbConnection.query('SELECT t.*, p.*, f.name AS facName, u.name AS uniName, tn.tnmName FROM team t JOIN player p ON t.teamID = p.teamID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN tournament tn ON t.tnmID = tn.tnmID  WHERE t.teamID = '+thisteamID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/team', { data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

router.get('/player/accept/(:playerID)', function(req, res, next) {
    let thisplayerID = req.params.playerID;

    dbConnection.query('SELECT * FROM player WHERE playerID ='+thisplayerID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let playerEmail = rows[0].playerEmail;
    let form_data = { playerStatus: 'accept' }

dbConnection.query('SELECT * FROM tournament WHERE tnmID = '+tnmID,(err,tnm)=>{

    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: playerEmail,
        subject: 'ผลการสมัครเข้าร่วมการแข่งขัน',
        text: '',
        html:`<h2>เจ้าหน้าที่ได้ตรวจสอบข้อมูลและอนุมัติท่านเข้าร่วมการแข่งขัน `+ tnm[0].tnmName +` เรียบร้อยแล้ว</h2>`
      };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID,form_data, (err, rows) => {
        req.flash('success','ยอมรับผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidatesolo/'+tnmID);
    })

    })
})
})
})

router.get('/team/accept/(:teamID)', function(req, res, next) {
    let thisteamID = req.params.teamID;

    
    dbConnection.query('SELECT * FROM team WHERE teamID ='+thisteamID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let teamEmailA = rows[0].teamEmailA;
    let form_data = { teamStatus: 'accept' }
    dbConnection.query('SELECT * FROM tournament WHERE tnmID = '+tnmID,(err,tnm)=>{ 
    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: teamEmailA,
        subject: 'ผลการสมัครเข้าร่วมการแข่งขัน',
        text: '',
        html:`<h2>เจ้าหน้าที่ได้ตรวจสอบข้อมูลและอนุมัติทีมเข้าร่วมการแข่งขัน `+ tnm[0].tnmName +` เรียบร้อยแล้ว</h2> `
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);

    dbConnection.query('UPDATE team SET ? WHERE teamID ='+thisteamID,form_data, (err, rows) => {
        dbConnection.query('SELECT * FROM player WHERE teamID ='+thisteamID, (err, rows) => {

                let p_status = { playerStatus: 'accept' }
                dbConnection.query('UPDATE player SET ? WHERE teamID ='+thisteamID,p_status)
        
        req.flash('success','ยอมรับผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidateteam/'+tnmID);
    })
    })
})

})
})
})

router.get('/player/deny/(:playerID)', function(req, res, next) {
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT * FROM player WHERE playerID ='+thisplayerID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let playerEmail = rows[0].playerEmail;
    let form_data = { playerStatus: 'deny'}

    dbConnection.query('SELECT * FROM tournament WHERE tnmID = '+tnmID,(err,tnm)=>{
    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: playerEmail,
        subject: 'ผลการสมัครเข้าร่วมการแข่งขัน',
        text: '',
        html:`<h2>ขออภัยท่านไม่ได้รับเลือกเข้าร่วมการแข่งขัน  `+ tnm[0].tnmName +`</h2>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID,form_data, (err, rows) => {
        req.flash('success','ปฏิเสธผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidatesolo/'+tnmID);
    })
})
})
})
})

router.get('/team/deny/(:teamID)', function(req, res, next) {
    let thisteamID = req.params.teamID;
    
    dbConnection.query('SELECT * FROM team WHERE teamID ='+thisteamID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let teamEmailA = rows[0].teamEmailA;
    let form_data = { teamStatus: 'deny' }

    dbConnection.query('SELECT * FROM tournament WHERE tnmID = '+tnmID,(err,tnm)=>{

    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: teamEmailA,
        subject: 'ผลการสมัครเข้าร่วมการแข่งขัน',
        text: '',
        html:`<h2>ขออภัยทีมของท่านไม่ได้รับเลือกเข้าร่วมการแข่งขัน  `+ tnm[0].tnmName +`</h2>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);
    dbConnection.query('UPDATE team SET ? WHERE teamID ='+thisteamID,form_data, (err, rows) => {
        req.flash('success','ยอมรับผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidateteam/'+tnmID);
    })
})
    })
})
})

router.get('/edit/player/(:playerID)', function(req,res,next){
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+thisplayerID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/edit/player', { data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})



router.get('/edit/team/(:teamID)', function(req, res, next) {
    let thisteamID = req.params.teamID;
    dbConnection.query('SELECT t.*, p.*, f.name AS facName, u.name AS uniName, tn.tnmName FROM team t JOIN player p ON t.teamID = p.teamID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN tournament tn ON tn.tnmID = t.tnmID WHERE t.teamID ='+thisteamID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/edit/team', { data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})


 



router.post('/update/edit/player/(:playerID)', function(req,res,next){
    let thisplayerID = req.params.playerID;
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let playerIDCard = req.body.playerIDCard;
    let detailDoc =req.body.playerdetailDoc;
    let tnmID =req.body.tnmID;

    let form_data = {
    tnmID: tnmID,
    playerFName: playerFName,
    playerLName: playerLName,
    playerGender: playerGender,
    playerBirthday: playerBirthday,
    playerPhone: playerPhone,
    playerEmail: playerEmail,
    playerIDCard: playerIDCard,
    detailDoc: detailDoc,
    }
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID, form_data, (err, result) => {
        if (err) {
            console.log(JSON.stringify(err));
            req.flash('error', err)
            res.redirect('/tnmcheck/candidatesolo/'+tnmID)
        } else {
            req.flash('success', 'แก้ไขข้อมูลสำเร็จ');
            res.redirect('/tnmcheck/candidatesolo/'+tnmID);
        }
    })
})

router.post('/update/edit/team/(:teamID)', function(req,res,next){
    let thisteamID = req.params.teamID;
    
    let teamName = req.body.teamName;
    let NameAgent = req.body.NameAgent;
    let LnameAgent = req.body.LnameAgent;
    let teamPhoneA = req.body.teamPhoneA;
    let teamEmailA = req.body.teamEmailA;
    
    let tnmID = req.body.tnmID;

    let playerID = req.body.playerID;
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let playerIDCard = req.body.playerIDCard;
    let detailDoc = req.body.detailDoc;

    console.log(req.body);
    let values = [];

    for (let i = 0; i < playerFName.length; i++) {
    values.push({playerFName:playerFName[i], playerLName:playerLName[i], playerGender:playerGender[i], playerBirthday:playerBirthday[i], playerPhone:playerPhone[i],playerEmail:playerEmail[i], playerIDCard:playerIDCard[i], detailDoc:detailDoc[i],playerID:playerID[i]})
    }


    let sql_team = "UPDATE team SET teamName  =?, NameAgent =?, LnameAgent =?, teamPhoneA =?, teamEmailA =? WHERE teamID =?";
    let sql_player = "UPDATE player SET playerFName  =?, playerLName =?, playerGender =?, playerBirthday =?, playerPhone =?, playerEmail =?, playerIDCard =?, detailDoc =? WHERE playerID =?";
   
        // insert query db
        dbConnection.query(sql_team ,[teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA  ,thisteamID], (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
                        req.flash('error', err)
                        res.redirect('/tnmcheck/candidateteam/'+tnmID)
                throw err
            };
            console.log("Number of teams inserted: " + result.affectedRows);


            for (let i = 0; i < playerFName.length; i++) {
                dbConnection.query(sql_player , [values[i].playerFName  , values[i].playerLName , values[i].playerGender , values[i].playerBirthday , values[i].playerPhone , values[i].playerEmail , values[i].playerIDCard , values[i].detailDoc  ,values[i].playerID ], function (err, result) {
                    if (err) {
                        console.log(JSON.stringify(err));
                                
                                req.flash('error', err)
                                res.redirect('/tnmcheck/candidateteam/'+tnmID)
                        throw err
                    }; 
                })
                
                }
                console.log("Number of persons inserted: " + result.affectedRows);
                    req.flash('success', 'แก้ไขข้อมูลสำเร็จ');
                    res.redirect('/tnmcheck/candidateteam/'+tnmID);
    })
})




router.get('/emailsingle/(:playerID)', function(req,res,next){
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+thisplayerID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/email/player', { data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})
router.get('/emailteam/(:teamID)', function(req,res,next){
    let thisteamID = req.params.teamID;
    dbConnection.query('SELECT t.*, p.*, f.name AS facName, u.name AS uniName, tn.tnmName FROM team t JOIN player p ON t.teamID = p.teamID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID LEFT JOIN tournament tn ON tn.tnmID = t.tnmID WHERE t.teamID ='+thisteamID, (err, rows) => {
        if(req.session.username){
        if(req.session.level === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/email/team', { data: rows});
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

router.post('/emailsingle/(:playerID)', function(req,res,next){
    let thisplayerID = req.params.playerID;
    let tnmID = req.body.tnmID;
    let emailto = req.body.emailto;
    let editemailer = req.body.editemailer;
    console.log('thisplayer',thisplayerID,'tnmID',tnmID,'email',emailto,'editemail',editemailer)

    edit_form={playerStatus:'edit'};
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID,edit_form,(err,emailedit)=>{

    })

    dbConnection.query('SELECT * FROM tournament WHERE tnmID ='+tnmID,(err,tnm)=>{
    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: emailto,
        subject: 'แก้ไขข้อมูลผู้สมัครเข้าร่วมการแข่งขัน '+tnm[0].tnmName,
        text: '',
        html:'<h2>รายละเอียดการแก้ไข: '+ editemailer+'</h2>' +
            '<a href="http://localhost:3000/mosingle/'+thisplayerID+'">คลิ๊กที่นี้</a>'

      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);
          req.flash('success','ส่งรายละเอียดข้อมูลการแก้ไขเรียบร้อยแล้ว');
          res.redirect('/tnmcheck/candidatesolo/'+tnmID);
    })

    })
        })

router.post('/emailteam/(:teamID)', function(req,res,next){
    let thisteamID = req.body.teamID;
    let playerID = req.body.playerID;
    let tnmID = req.body.tnmID;
    let emailto = req.body.emailto;
    let editemailer = req.body.editemailer;
    console.log('thisplayer L',playerID.length);
    console.log(req.body);
    console.log('thisplayer',playerID,'tnmID',tnmID,'email',emailto,'editemail',editemailer,'thisteamID',thisteamID) 
    let values = [];

    for (let i = 0; i < playerID.length; i++) {
        values.push({playerID:playerID[i]})
        }
        console.log(values);
        

    for (let i = 0; i < playerID.length; i++) {
        dbConnection.query('UPDATE player SET playerStatus="edit" WHERE playerID ='+[values[i].playerID],(err,emailedit)=>{
        })
    }


    dbConnection.query('UPDATE team SET teamStatus="edit" WHERE teamID ='+thisteamID,(err,emailedit)=>{
    })

    dbConnection.query('SELECT * FROM tournament WHERE tnmID ='+tnmID,(err,tnm)=>{
    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: emailto,
        subject: 'แก้ไขข้อมูลทีมสมัครเข้าร่วมการแข่งขัน '+tnm[0].tnmName,
        text: '',
        html:'<h2>รายละเอียดการแก้ไข: '+ editemailer+'</h2>' +
            '<a href="http://localhost:3000/moteam/'+thisteamID+'">คลิ๊กที่นี้</a>'

      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);
          req.flash('success','ส่งรายละเอียดข้อมูลการแก้ไขเรียบร้อยแล้ว');
          res.redirect('/tnmcheck/candidateteam/'+tnmID);
    })

    })
        })









    router.post('//(:teamID)', function(req,res,next){
    let emailto = req.body.emailto;
    let editemailer = req.body.editemailer;

    let thisteamID = req.params.teamID;
    
    let teamName = req.body.teamName;
    let NameAgent = req.body.NameAgent;
    let LnameAgent = req.body.LnameAgent;
    let teamPhoneA = req.body.teamPhoneA;
    let teamEmailA = req.body.teamEmailA;
    
    let tnmID = req.body.tnmID;

    let playerID = req.body.playerID;
    let playerFName = req.body.playerFName;
    let playerLName = req.body.playerLName;
    let playerGender = req.body.playerGender;
    let playerBirthday = req.body.playerBirthday;
    let playerPhone = req.body.playerPhone;
    let playerEmail = req.body.playerEmail;
    let playerIDCard = req.body.playerIDCard;
    let detailDoc = req.body.detailDoc;

    console.log(req.body);
    let values = [];

    for (let i = 0; i < playerFName.length; i++) {
    values.push({playerFName:playerFName[i], playerLName:playerLName[i], playerGender:playerGender[i], playerBirthday:playerBirthday[i], playerPhone:playerPhone[i],playerEmail:playerEmail[i], playerIDCard:playerIDCard[i], detailDoc:detailDoc[i],playerID:playerID[i]})
    }
    console.table(values);


    let sql_team = "UPDATE team SET teamName  =?, NameAgent =?, LnameAgent =?, teamPhoneA =?, teamEmailA =? WHERE teamID =?";
    let sql_player = "UPDATE player SET playerFName  =?, playerLName =?, playerGender =?, playerBirthday =?, playerPhone =?, playerEmail =?, playerIDCard =?, detailDoc =? WHERE playerID =?";
   
        // insert query db
        dbConnection.query(sql_team ,[teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA  ,thisteamID], (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
                        req.flash('error', err)
                        res.redirect('/tnmcheck/candidateteam/'+tnmID)
                throw err
            };
            console.log("Number of teams inserted: " + result.affectedRows);


            for (let i = 0; i < playerFName.length; i++) {
                dbConnection.query(sql_player , [values[i].playerFName  , values[i].playerLName , values[i].playerGender , values[i].playerBirthday , values[i].playerPhone , values[i].playerEmail , values[i].playerIDCard , values[i].detailDoc  ,values[i].playerID ], function (err, result) {
                    if (err) {
                        console.log(JSON.stringify(err));
                                
                                req.flash('error', err)
                                res.redirect('/tnmcheck/candidateteam/'+tnmID)
                        throw err
                    }; 
                })
                
                }
                console.log("Number of persons inserted: " + result.affectedRows);
                    req.flash('success', 'แก้ไขข้อมูลสำเร็จ');
                    res.redirect('/tnmcheck/candidateteam/'+tnmID);
    })
    


    
    console.log('thisplayer',thisplayerID,'tnmID',tnmID,'email',emailto,'editemail',editemailer)

    edit_form={teamStatus:'edit'};
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+playerID,edit_form,(err,emailedit)=>{

    })





    dbConnection.query('SELECT * FROM tournament WHERE tnmID ='+tnmID,(err,tnm)=>{
    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: emailto,
        subject: 'แก้ไขข้อมูลผู้สมัครเข้าร่วมการแข่งขัน '+tnm[0].tnmName,
        text: '',
        html:'<h2>รายละเอียดการแก้ไข: '+ editemailer+'</h2>' +
            '<a href="http://localhost:3000/mosingle/'+thisplayerID+'">คลิ๊กที่นี้</a>'

      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);
          req.flash('success','ส่งรายละเอียดข้อมูลการแก้ไขเรียบร้อยแล้ว');
          res.redirect('/tnmcheck/candidatesolo/'+tnmID);
    })

})
})

router.get('/delete/player/(:playerID)', function(req,res,next){
    let playerID = req.params.playerID;
    dbConnection.query('DELETE FROM player WHERE playerID = ?',[playerID],(err,result)=>{
        if(err){
            req.flash('error','ไม่สามารถลบผู้เล่นได้');
            res.redirect('/tnmcheck');
        }else{
            req.flash('success','ได้ลบผู้เล่นเรียบร้อยแล้ว!');
            res.redirect('/tnmcheck');
        }
    })
})
router.get('/delete/team/(:teamID)', function(req,res,next){
    let teamID = req.params.playerID;
    dbConnection.query('DELETE p, t FROM player p  JOIN team t ON t.teamID = p.teamID AND t.tnmID = p.tnmID  WHERE p.teamID = ? ',[teamID],(err,result)=>{
        if(err){
            req.flash('error','ไม่สามารถลบทีมได้');
            res.redirect('/tnmcheck');
        }else{
            req.flash('success','ได้ลบทีมเรียบร้อยแล้ว!');
            res.redirect('/tnmcheck');
        }
    })
})

module.exports = router;