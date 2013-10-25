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

	// function getDynPhotos(req, res, style) {
	// 	req.session.tag = style;
 //    Photo.find({ style: style}, function(err, results){
 //    	var sorted = sortByKey(results, 'position'); // change to timestamp
 //    	if (req.session.email) {
	//     	Email.findOne({email: req.session.email.email}, function(err, user) {
	// 				if (err) {
	// 					return next (err);
	// 				}
	// 				if (user) {
	// 					res.render('photos-dyn', {user: user, photos: sorted, navLogin: req.body.navLogin});
	// 				}
	// 			});	
	// 		} else {
	// 			res.render('photos-dyn', {user: false, photos: sorted, navLogin: req.body.navLogin});
	// 		}
	// 	});
	// }

	// // var styleTags = ['cont', 'ecce'];

	// // for (var i = 0; i < styleTags.length; i++) {
	// //   app.get('/photos-' + styleTags[i], selectNav, function(req, res) {
 // //      getDynPhotos(req, res, styleTags[i]);
 // //  	});
	// // }  

	// app.get('/photos-cont', selectNav, function(req, res) {
 //    getDynPhotos(req, res, 'cont');
	// });

	app.get('/photos-ecce', selectNav, function(req, res) {
    req.session.tag = 'ecce';
    Photo.find({ style: 'ecce'}, function(err, results){
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
	});

	app.get('/photos-mini', selectNav, function(req, res) {
    req.session.tag = 'mini';
    Photo.find({ style: 'mini'}, function(err, results){
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
	});

	app.get('/photos-rust', selectNav, function(req, res) {
    req.session.tag = 'rust';
    Photo.find({ style: 'rust'}, function(err, results){
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
	});

	app.get('/photos-trad', selectNav, function(req, res) {
    req.session.tag = 'trad';
    Photo.find({ style: 'trad'}, function(err, results){
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
	});

	app.get('/photos-hip', selectNav, function(req, res) {
    req.session.tag = 'hip';
    Photo.find({ style: 'hip'}, function(err, results){
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
	});

	app.get('/photos-indu', selectNav, function(req, res) {
    req.session.tag = 'indu';
    Photo.find({ style: 'indu'}, function(err, results){
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
	});

	app.get('/photos-cons', selectNav, function(req, res) {
    req.session.tag = 'cons';
    Photo.find({ style: 'cons'}, function(err, results){
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
	});

};