var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/pm', function(req, res) {
		if (req.session.tag == 'albums') {
			res.redirect('/albums');	
		} else {
			res.redirect('/photos-' + req.session.tag);
		}
	});

	app.get('/nb-pm', function(req, res) {
		res.redirect('back');
	});

};