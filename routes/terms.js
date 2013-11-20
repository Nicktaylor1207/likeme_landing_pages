var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/terms', selectNav, function(req, res) {
    res.render('terms', {user: sessionUser, navLogin: req.body.navLogin});
	});

	app.get('/privacy', selectNav, function(req, res) {
    res.render('privacy', {user: sessionUser, navLogin: req.body.navLogin});
	});

};