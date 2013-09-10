function selectNav(req, res, callback) {
	if (!req.session.email) {
		var isUser = false;
		req.body.isUser = isUser;
		callback();
	} else {
		var isUser = true;
		req.body.isUser = isUser;
		callback();
	}
}

module.exports = selectNav;