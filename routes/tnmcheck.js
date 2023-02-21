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

router.post('/search-tnmcheck', (req, res) => {
    let query = req.body.search;
    if(!query){
        res.redirect('/tnmcheck');
    }else{ 
        sql = "SELECT t.tnmID,t.tnmName,t.Renddate,s.sportID,s.sportName,s.sportPlaynum, SUM(CASE p.playerStatus WHEN 'accept' THEN 1 ELSE 0 END) AS accept_count, SUM(CASE p.playerStatus WHEN 'deny' THEN 1 ELSE 0 END) AS deny_count, SUM(CASE p.playerStatus WHEN 'wait' THEN 1 ELSE 0 END) AS wait_count FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN player p on t.tnmID = p.tnmID WHERE t.tnmName LIKE ? OR p.playerFName = ? GROUP BY t.tnmID";
        let like =['%' + query + '%','%' + query + '%'];
    
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmcheck', {data: results,status_login: req.session.loggedin,user: user});
    });
}
});

// display tnmcheck page
router.get('/', (req, res, next) => {
    const sql = "SELECT t.tnmID,t.tnmName,t.Renddate,s.sportID,s.sportName,s.sportPlaynum, SUM(CASE p.playerStatus WHEN 'accept' THEN 1 ELSE 0 END) AS accept_count, SUM(CASE p.playerStatus WHEN 'deny' THEN 1 ELSE 0 END) AS deny_count, SUM(CASE p.playerStatus WHEN 'wait' THEN 1 ELSE 0 END) AS wait_count FROM tournament t LEFT JOIN sport s ON t.sportID = s.sportID LEFT JOIN player p on t.tnmID = p.tnmID GROUP BY t.tnmID;";

    dbConnection.query(sql, (err, rows) => {
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

// display tnmcheck page
router.get('/candidatesolo/(:tnmID)', (req, res, next) => {
    let thistnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,p.detailDoc,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName,team.teamName,team.NameAgent,team.LnameAgent,team.teamPhoneA,team.teamEmailA,team.teamStatus FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID LEFT JOIN team ON team.teamID = p.teamID LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID = '+thistnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/solocan', { data: rows,thistnmID: thistnmID,status_login: req.session.loggedin,user: user });
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
router.get('/candidateteam/(:tnmID)', (req, res, next) => {
    let thistnmID = req.params.tnmID;
    dbConnection.query(`SELECT teamID, tnmID, tnmName, teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA, teamStatus, teamRegDate, GROUP_CONCAT(detailDoc SEPARATOR '') as detailDoc FROM (SELECT t.tnmID,team.teamID,t.tnmName,team.teamName,team.NameAgent,team.LnameAgent,team.teamPhoneA,team.teamEmailA,team.teamStatus,team.teamRegDate, p.detailDoc
    FROM tournament t
    LEFT JOIN team ON team.tnmID = t.tnmID
    LEFT JOIN sport s ON t.sportID = s.sportID
    LEFT JOIN player p ON team.teamID = p.teamID
    WHERE t.tnmID = ?
    ) team_player_data
    GROUP BY teamID, tnmID, tnmName, teamName, NameAgent, LnameAgent, teamPhoneA, teamEmailA, teamStatus, teamRegDate`,thistnmID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/teamcan', { data: rows,thistnmID: thistnmID,status_login: req.session.loggedin,user: user });
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
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+thisplayerID, (err, rows) => {
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

router.get('/team/(:teamID)', (req, res, next) => {
    let thisteamID = req.params.teamID;
    dbConnection.query('SELECT t.*, p.*,f.name AS facName,u.name AS uniName FROM team t JOIN player p ON t.teamID = p.teamID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE t.teamID = '+thisteamID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/candidate/team', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

router.get('/player/accept/(:playerID)', (req, res, next) => {
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
        text: 'เจ้าหน้าที่ได้ตรวจสอบข้อมูลและอนุมัติผู้สมัครเข้าร่วมการแข่งขัน '+tnm[0].tnmName+' เรียบร้อยแล้ว '
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

router.get('/team/accept/(:teamID)', (req, res, next) => {
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
        text: 'เจ้าหน้าที่ได้ตรวจสอบข้อมูลและอนุมัติทีมเข้าร่วมการแข่งขัน '+ tnm[0].tnmName +' เรียบร้อยแล้ว '
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

router.get('/player/deny/(:playerID)', (req, res, next) => {
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
        text: 'ขออภัยท่านไม่ได้รับเลือกเข้าร่วมการแข่งขัน '+tnm[0].tnmName
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) throw error;
          console.log('Email sent: ' + info.response);
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID,form_data, (err, rows) => {
        req.flash('success','ปฏิเสธผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidate/'+tnmID);
    })
})
})
})
})

router.get('/team/deny/(:teamID)', (req, res, next) => {
    let thisteamID = req.params.teamID;
    
    dbConnection.query('SELECT * FROM team WHERE teamID ='+thisteamID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let teamEmailA = rows[0].teamEmailA;
    let form_data = { teamStatus: 'deny' }

    dbConnection.query('SELECT * FROM tournament WHERE tnmID = '+tnmID,(err,tnm)=>{

    let mailOptions = {
        from: 'thesissportmanagement@gmail.com',
        to: playerEmail,
        subject: 'ผลการสมัครเข้าร่วมการแข่งขัน',
        text: 'ขออภัยทีมของท่านไม่ได้รับเลือกเข้าร่วมการแข่งขัน '+tnm[0].tnmName
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

router.get('/edit/player/(:playerID)',(req,res,next)=>{
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+thisplayerID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/edit/player', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

router.get('/emailsingle/(:playerID)',(req,res,next)=>{
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT p.*,t.tnmID,t.tnmName,f.uniID,f.facultyID,f.name AS facName,u.uniID,u.name AS uniName FROM player p LEFT JOIN tournament t ON p.tnmID = t.tnmID LEFT JOIN faculty f ON f.facultyID = p.facultyID LEFT JOIN university u ON u.uniID = f.uniID WHERE p.playerID = '+thisplayerID, (err, rows) => {
        if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            res.render('./tnmcheck/email/player', { data: rows,status_login: req.session.loggedin,user: user });
        }else{
            req.flash('error','ไม่สามารถเข้าถึงได้');
            res.redirect('../../login');
        }
    }else{
        res.redirect('error404');
    }
    })
})

router.post('/emailsingle/(:playerID)',(req,res)=>{
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
        html:'<p>รายละเอียดการแก้ไข: '+ editemailer+'</p>' +
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


module.exports = router;