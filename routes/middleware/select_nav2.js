function selectNavTwo(req, res, next) {
	if (!req.session.email) {
		req.body.isUser = false;
		next();
	} else {
		req.body.isUser = true;
		next();
	}
}

module.exports = selectNavTwo;