var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var loggedIn = require('./middleware/logged_in');

module.exports = function(app) {

	app.get('/notebook', loggedIn, function(req, res) {
  	Email.findOne({email: req.session.email.email}, function(err, email) {
			if (err) {
				return next (err);
			}
			if (email) {
				res.render('notebook', {photos: email.notebook.photos});
			}
		});
	});

};