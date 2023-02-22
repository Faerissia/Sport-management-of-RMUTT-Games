let express = require('express');
let router = express.Router();

router.get("/", (req, res, err) => {
    if (req.session.loggedin) {
      res.render("titleedit", {
        status_login: req.session.loggedin,
        process,
        user: user,
        role: role,
      });
    } else {
      res.redirect("error404");
    }
  });

module.exports = router;