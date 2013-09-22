var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/signup', selectNav, function(req, res) {
    res.render('signup', {navLogin: req.body.navLogin});
	});

};