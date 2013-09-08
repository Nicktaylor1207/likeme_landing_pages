var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');

module.exports = function(app) {

	app.get('/photos-ny', function(req, res) {
		Photo.find(function(err, results){
			res.render('photos-ny', {photos: results});
		});
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

				function checkPhotoDup(photo){
					if (photo == req.body.image_url) {
						return true;
					} else {
						return false;
					}
				}

				if (email.notebook.photos.some(checkPhotoDup) == true) {
					Photo.find(function(err, results){
						res.render('photos-ny', {photos: results});
					});
				} else {
					// do what we were doing before
					email.notebook.photos.push(req.body.image_url);
					email.save(function(){
						Photo.findOne({url: req.body.image_url}, function(err, photo) {
							if (err) {
								return next (err);
							}
							if (photo) {
								photo.liked = photo.liked + 1;
								photo.save(function(){
									Photo.find(function(err, results){
										res.render('photos-ny', {photos: results});
									});
								});
							}
						});
					});	
				}
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