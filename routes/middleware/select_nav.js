function selectNav(req, res, next) {
	if (!req.session.email) {
		req.body.navLogin = false;
		next();
	} else {
		req.body.navLogin = true;
		next();
	}
}

module.exports = selectNav;