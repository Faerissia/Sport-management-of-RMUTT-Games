let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display tnmcheck page
router.get('/', (req, res, err) => {
    if(req.session.loggedin){
            res.render('dashboard', {
                status_login: req.session.loggedin,process,user: user,role: role  });
            }else{
                res.redirect('error404');
            }
            })

router.get('/edit', (req, res, err) => {
    if(req.session.loggedin){
            res.render('titleedit', {
                status_login: req.session.loggedin,process,user: user,role: role  });
    }else{
            res.redirect('error404');
        }
    })

module.exports = router;