var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	function sortByKey(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	app.get('/photos-ny', selectNav, function(req, res) {
    Photo.find({ tag: 'NYC' }, function(err, results){
    	var sorted = sortByKey(results, 'position');
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						res.render('photos-ny', {user: false, photos: sorted, navLogin: req.body.navLogin});
					}
					if (user) {
						res.render('photos-ny', {user: user, photos: sorted, navLogin: req.body.navLogin});
					}
				});	
    	} else {
    		res.render('photos-ny', {user: false, photos: sorted, navLogin: req.body.navLogin});
    	}
		});
	});

	app.get('/photos-bou', selectNav, function(req, res) {
    Photo.find({ tag: 'boutique'}, function(err, results){
    	var sorted = sortByKey(results, 'position');
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						res.render('photos-bou', {user: false, photos: sorted, navLogin: req.body.navLogin});
					}
					if (user) {
						res.render('photos-bou', {user: user, photos: sorted, navLogin: req.body.navLogin});
					}
				});	
			} else {
				res.render('photos-bou', {user: false, photos: sorted, navLogin: req.body.navLogin});
			}
		});
	});

	app.post('/notebook2', selectNav, function(req, res) {

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
					Photo.find({ tag: 'NYC' }, function(err, results){
						var sorted = sortByKey(results, 'position');
						res.render('photos-ny', {photos: sorted, navLogin: req.body.navLogin});
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
									Photo.find({ tag: 'NYC' }, function(err, results){
										var sorted = sortByKey(results, 'position');
										res.render('photos-ny', {photos: sorted, navLogin: req.body.navLogin});
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
					Photo.find({ tag: 'boutique'}, function(err, results){
						var sorted = sortByKey(results, 'position');
						res.render('photos-bou', {photos: sorted, navLogin: req.body.navLogin});
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
									Photo.find({ tag: 'boutique'}, function(err, results){
										var sorted = sortByKey(results, 'position');
										res.render('photos-bou', {photos: sorted, navLogin: req.body.navLogin});
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