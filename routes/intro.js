var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/intro', selectNav, function(req, res) {
    Email.findOne({email: req.session.email.email}, function(err, email) {
			if (err) {
				return next (err);
			}
			if (email) {
				res.render('intro', {user: email, navLogin: req.body.navLogin});
			}
		});
	});

};