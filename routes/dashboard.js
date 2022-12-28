let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

// display tnmcheck page
router.get('/', (req, res, err) => {
        if (err) {
            req.flash('error', err);
            res.render('dashboard', { data: '' });
        } else {
            res.render('dashboard', { data: rows });
        }
    })

module.exports = router;