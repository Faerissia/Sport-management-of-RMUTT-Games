let express = require('express');
let router = express.Router();
let dbConnection = require('../util/db');

// display book page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM university ORDER BY uniID asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('uni', { data: '' });
        } else {
            res.render('uni', { data: rows });
        }
    })
})

module.exports = router;