var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/contact', selectNav, function(req, res) {
    res.render('contact', {navLogin: req.body.navLogin, user: sessionUser});
	});

};