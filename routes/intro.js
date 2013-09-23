var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/intro', selectNav, function(req, res) {
    res.render('intro', {navLogin: req.body.navLogin});
	});

};