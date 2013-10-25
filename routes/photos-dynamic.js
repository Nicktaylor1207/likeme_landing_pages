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

	/* Refactor -- create array of tags and run an each function for below get routes */
	/* Add ability to get by style and type */

	function getDynPhotos(req, res, style) {
		req.session.tag = style;
    Photo.find({ style: style}, function(err, results){
    	var sorted = sortByKey(results, 'position'); // change to timestamp
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						return next (err);
					}
					if (user) {
						res.render('photos-dyn', {user: user, photos: sorted, navLogin: req.body.navLogin});
					}
				});	
			} else {
				res.render('photos-dyn', {user: false, photos: sorted, navLogin: req.body.navLogin});
			}
		});
	}

	function getDynPhotosType (req, res, type) {
		req.session.tag = type;
    Photo.find({ type: type}, function(err, results){
    	var sorted = sortByKey(results, 'position'); // change to timestamp
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						return next (err);
					}
					if (user) {
						res.render('photos-dyn', {user: user, photos: sorted, navLogin: req.body.navLogin});
					}
				});	
			} else {
				res.render('photos-dyn', {user: false, photos: sorted, navLogin: req.body.navLogin});
			}
		});
	}

	app.get('/photos-cont', selectNav, function(req, res) {
    getDynPhotos(req, res, 'cont');
	});

	app.get('/photos-ecce', selectNav, function(req, res) {
    getDynPhotos(req, res, 'ecce');
	});

	app.get('/photos-mini', selectNav, function(req, res) {
    getDynPhotos(req, res, 'mini');
	});

	app.get('/photos-rust', selectNav, function(req, res) {
    getDynPhotos(req, res, 'rust');
	});

	app.get('/photos-trad', selectNav, function(req, res) {
    getDynPhotos(req, res, 'trad');
	});

	app.get('/photos-hip', selectNav, function(req, res) {
    getDynPhotos(req, res, 'hip');
	});

	app.get('/photos-indu', selectNav, function(req, res) {
    getDynPhotos(req, res, 'indu');
	});

	app.get('/photos-cons', selectNav, function(req, res) {
    getDynPhotos(req, res, 'cons');
	});

	app.get('/photos-full', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'full');
	});

	app.get('/photos-fron', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'fron');
	});

	app.get('/photos-shac', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'shac');
	});

	app.get('/photos-chan', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'chan');
	});

	app.get('/photos-disp', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'disp');
	});

	app.get('/photos-ligh', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'ligh');
	});

	app.get('/photos-merc', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'merc');
	});

	app.get('/photos-mann', selectNav, function(req, res) {
    getDynPhotosType (req, res, 'mann');
	});

	// var styleTags = ['cont', 'ecce'];

	// for (var i = 0; i < styleTags.length; i++) {
	//   app.get('/photos-' + styleTags[i], selectNav, function(req, res) {
 //      getDynPhotos(req, res, styleTags[i]);
 //  	});
	// }  

};