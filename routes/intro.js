var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/intro', selectNav, function(req, res) {
		res.render('intro', {user: sessionUser, navLogin: req.body.navLogin});
	});

	app.get('/introAlt', selectNav, function(req, res) {
		res.render('introAlt', {user: sessionUser, navLogin: req.body.navLogin});
	});

};