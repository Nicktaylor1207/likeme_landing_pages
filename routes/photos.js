var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/photos-ny', selectNav, function(req, res) {
		Photo.find(function(err, results){
			res.render('photos-ny', {photos: results, navLogin: req.body.navLogin});
		});
	});

	app.get('/photos-bou', selectNav, function(req, res) {
    Photo.find(function(err, results){
			res.render('photos-bou', {photos: results, navLogin: req.body.navLogin});
		});
	});

	app.post('/notebook', selectNav, function(req, res) {

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
						res.render('photos-ny', {photos: results, navLogin: req.body.navLogin});
					});
				} else {
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
										res.render('photos-ny', {photos: results, navLogin: req.body.navLogin});
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

	app.post('/notebook1', selectNav, function(req, res) {

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
						res.render('photos-bou', {photos: results, navLogin: req.body.navLogin});
					});
				} else {
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
										res.render('photos-bou', {photos: results, navLogin: req.body.navLogin});
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

};