let express = require('express');
let router = express.Router();

router.get("/", function(req, res, err) {
    if (req.session.username) {
      res.render("titleedit", {
        process
      });
    } else {
      res.redirect("/login");
    }
  });

module.exports = router;