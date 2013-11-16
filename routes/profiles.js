var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Comment = require('../data/models/comments');
var loggedIn = require('./middleware/logged_in');

module.exports = function(app) {

	app.get('/pro-profile', loggedIn, function(req, res) {
  	Email.findOne({email: req.session.email.email}, function(err, user) {
			if (err) {
				return next (err);
			}
			if (user) {
				res.render('pro-profile', {user: user, photos: user.notebook.photos, navLogin: true});
			}
		});
	});

	app.get('/pro-profile-create', loggedIn, function(req, res) {
		Email.findOne({email: req.session.email.email}, function(err, user) {
			if (err) {
				return next (err);
			}
			if (user) {
				res.render('pro-profile-create', {user: user, navLogin: true});
			}
		});
	})

};

