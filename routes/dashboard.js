let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());
// display tnmcheck page
router.get('/', (req, res, err) => {
        if (req.session.loggedin) {
            res.render('dashboard', {
                status_login: req.session.loggedin,user: user,role: role  });
            }else {
            res.redirect('login');
        }
    })

module.exports = router;