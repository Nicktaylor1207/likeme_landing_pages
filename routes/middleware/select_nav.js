var Email = require('../../data/models/emails');

function selectNav(req, res, next) {
	if (!req.session.email) {
		req.body.navLogin = false;
		next();
	} else {
		req.body.navLogin = true;
		Email.findOne({email: req.session.email.email}, function(err, user) {
			sessionUser = user;
		});
		console.log("sessionUser");
		next();
	}
}

module.exports = selectNav;