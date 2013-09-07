var Email = require('../data/models/emails');

module.exports = function(app) {

	app.get('/photos-ny', function(req, res) {
    res.render('photos-ny');
	});

	app.get('/photos-bou', function(req, res) {
    res.render('photos-bou');
	});

	app.post('/notebook', function(req, res) {

		Email.findOne({email: req.session.email.email}, function(err, email) {
			if (err) {
				return next (err);
			}
			if (email) {
				email.notebook.photos.push(req.body.image_url);
				email.save(function(){
					res.render('photos-ny');
				});
			} else {
				res.redirect('/login');
			}
		});

	});

	app.post('/notebook1', function(req, res) {

		Email.findOne({email: req.session.email.email}, function(err, email) {
			if (err) {
				return next (err);
			}
			if (email) {
				email.notebook.photos.push(req.body.image_url);
				email.save(function(){
					res.render('photos-bou');
				});
			} else {
				res.redirect('/login');
			}
		});

	});

};