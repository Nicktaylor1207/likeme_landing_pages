var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/albums', selectNav, function(req, res) {
    res.render('albums', {navLogin: req.body.navLogin});
	});

};