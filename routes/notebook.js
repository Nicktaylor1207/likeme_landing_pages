var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/notebook', selectNav, function(req, res) {
  	res.render('notebook', {photos: sessionUser.notebook.photos, navLogin: req.body.navLogin, user: sessionUser});
	});

	app.get('/nb-pm', function(req, res) {
		res.redirect('/notebook');
	});

};