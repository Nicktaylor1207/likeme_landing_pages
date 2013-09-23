var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');
var loggedIn = require('./middleware/logged_in');

module.exports = function(app) {

	app.get('/', selectNav, function(req,res){
		if (req.body.navLogin == true) {
			res.render('albums', {navLogin: req.body.navLogin});
		} else {
			res.render('index', {hide: req.body.navLogin});
		}
	});

};