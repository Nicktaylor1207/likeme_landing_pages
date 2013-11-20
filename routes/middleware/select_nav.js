var Email = require('../../data/models/emails');

function selectNav(req, res, next) {
	if (!req.session.email) {
		req.body.navLogin = false;
		sessionUser = false;
		next();
	} else {
		req.body.navLogin = true;
		Email.findOne({email: req.session.email.email.toLowerCase()}, function(err, user) {
			sessionUser = user;
			next();
		});
	}
}

module.exports = selectNav;