const { createArrayCsvWriter } = require('csv-writer');
let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const iconv = require('iconv-lite');
const fs = require('fs');


router.post('/search-tnmsearch', (req, res) => {
    let query = req.body.search;
    if(!query){
        res.redirect('/tnmsearch');
    }else{ 
        sql = "SELECT t.*,s.* FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID WHERE tnmName LIKE ? ORDER BY tnmID asc";
        let like =['%' + query + '%'];
    
    dbConnection.query(sql, like, (err, results) => {
        if(err) throw err;
        res.render('tnmsearch', {data: results,status_login: req.session.loggedin,user: user});
    });
}
});

// display tnmcheck page
router.get('/', (req, res, next) => {
    const sql = "SELECT t.*,s.* FROM tournament t LEFT JOIN sport s ON s.sportID = t.sportID ORDER BY tnmID asc;";

    dbConnection.query(sql, (err, rows) => {
    if(req.session.loggedin){
        if(role === 'เจ้าหน้าที่'){
            const csvWriter = createCsvWriter({
                path: 'assets/data.csv',
                header:[
                    {id: 'tnmName', title:'ชื่อการแข่งขัน'},
                    {id: 'sportName', title:'ประเภทกีฬา'},
                    {id: 'tnmStartdate', title:'วันที่เริ่มแข่งขัน'},
                    {id: 'tnmEnddate', title:'วันที่สิ้นสุด'}
                ],
                encoding: 'utf8'
            });
           
            csvWriter.writeRecords(rows)
            .then(() => {
                console.log('...Done');
            });
            let csv = fs.readFileSync('assets/data.csv');
            csv = iconv.encode(csv, 'utf8');
            fs.writeFileSync('assets/data.csv', csv);

            res.render('tnmsearch', { data: rows,status_login: req.session.loggedin,user: user });
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

// display tnmcheck page
router.get('/candidatesolo/(:tnmID)', (req, res, next) => {
    let thistnmID = req.params.tnmID;
    dbConnection.query('SELECT p.playerID,p.playerFName,p.playerLName,p.playerGender,TIMESTAMPDIFF(YEAR, p.playerBirthday, CURDATE()) AS age,p.playerPhone,p.playerRegDate,p.playerStatus,p.teamID,t.tnmID,t.tnmName,team.teamName,team.NameAgent,team.LnameAgent,team.teamPhoneA,team.teamEmailA,team.teamStatus FROM player p LEFT JOIN tournament t on p.tnmID = t.tnmID LEFT JOIN team ON team.teamID = p.teamID LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID = '+thistnmID, (err, rows) => {
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
    dbConnection.query('SELECT t.tnmID,team.teamID,t.tnmName,team.teamName,team.NameAgent,team.LnameAgent,team.teamPhoneA,team.teamEmailA,team.teamStatus FROM tournament t LEFT JOIN team ON team.tnmID = t.tnmID LEFT JOIN sport s ON t.sportID = s.sportID WHERE t.tnmID = '+thistnmID, (err, rows) => {
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
    let form_data = { playerStatus: 'accept' }
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID,form_data, (err, rows) => {
        req.flash('success','ยอมรับผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidatesolo/'+tnmID);
    })
    })

})

router.get('/team/accept/(:teamID)', (req, res, next) => {
    let thisteamID = req.params.teamID;
    
    dbConnection.query('SELECT * FROM team WHERE teamID ='+thisteamID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let form_data = { teamStatus: 'accept' }
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

router.get('/player/deny/(:playerID)', (req, res, next) => {
    let thisplayerID = req.params.playerID;
    dbConnection.query('SELECT * FROM player WHERE playerID ='+thisplayerID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let form_data = { playerStatus: 'deny'}
    dbConnection.query('UPDATE player SET ? WHERE playerID ='+thisplayerID,form_data, (err, rows) => {
        req.flash('success','ปฏิเสธผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidate/'+tnmID);
    })
})
})

router.get('/team/deny/(:teamID)', (req, res, next) => {
    let thisteamID = req.params.teamID;
    
    dbConnection.query('SELECT * FROM team WHERE teamID ='+thisteamID, (err, rows) => {
    let tnmID = rows[0].tnmID;
    let form_data = { teamStatus: 'deny' }
    dbConnection.query('UPDATE team SET ? WHERE teamID ='+thisteamID,form_data, (err, rows) => {
        req.flash('success','ยอมรับผู้เล่นเรียบร้อย');
        res.redirect('/tnmcheck/candidateteam/'+tnmID);
    })
    })

})



module.exports = router;