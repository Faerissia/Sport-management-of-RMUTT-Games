exports.index = function(req, res, next) {
	var message = '';
	res.render('index', {message: message})
};