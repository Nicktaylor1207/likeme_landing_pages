var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/', selectNav, function(req,res){
		if (req.body.navLogin == true) {
			res.redirect('/albums');
		} else {
			res.render('index', {navLogin: req.body.navLogin});
		}
	});

};