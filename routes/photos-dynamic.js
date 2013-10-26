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

	var styleTags = ['cont', 'ecce', 'mini', 'rust', 'trad', 'hip', 'indu', 'cons'];
	var typeTags = ['full', 'fron', 'shac', 'chan', 'disp', 'ligh', 'merc', 'mann'];

	for (var i = 0; i < styleTags.length; i++) {
	  (function(index) {
      app.get('/photos-' + styleTags[index], selectNav, function(req, res) {
        getDynPhotos(req, res, styleTags[index]);
      });
	  })(i);
	}

	for (var i = 0; i < typeTags.length; i++) {
	  (function(index) {
      app.get('/photos-' + typeTags[index], selectNav, function(req, res) {
        getDynPhotosType (req, res, typeTags[index]);
      });
	  })(i);
	}

};