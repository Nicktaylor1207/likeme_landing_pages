var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/platform', selectNav, function(req, res) {
    res.render('platform', {navLogin: req.body.navLogin});
	});

};