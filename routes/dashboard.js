let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());
// display tnmcheck page
router.get('/', (req, res, err) => {
            res.render('dashboard', {
                status_login: req.session.loggedin,user: user,role: role  });
    })

module.exports = router;