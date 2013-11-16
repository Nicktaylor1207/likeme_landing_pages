var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Comment = require('../data/models/comments');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	function sortByKey(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		});
	}

	function getDynPhotos(req, res, style) {
		req.session.tag = style;
    Photo.find({ style: style, used: true}, function(err, results){
    	var sorted = sortByKey(results, 'date');
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						return next (err);
					}
					if (user) {
						Comment.find(function(err, results){
							res.render('photos-dyn', {user: user, photos: sorted, comments: results, navLogin: req.body.navLogin});	
						});
					}
				});	
			} else {
				Comment.find(function(err, results){
					res.render('photos-dyn', {user: false, photos: sorted, comments: results, navLogin: req.body.navLogin});
				});
			}
		});
	}

	function getDynPhotosType (req, res, type) {
		req.session.tag = type;
    Photo.find({ type: type, used: true}, function(err, results){
    	var sorted = sortByKey(results, 'date');
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						return next (err);
					}
					if (user) {
						Comment.find(function(err, results){
							res.render('photos-dyn', {user: user, photos: sorted, comments: results, navLogin: req.body.navLogin});	
						});
					}
				});	
			} else {
				Comment.find(function(err, results){
					res.render('photos-dyn', {user: false, photos: sorted, comments: results, navLogin: req.body.navLogin});
				});
			}
		});
	}

	var styleTags = ['cont', 'ecce', 'mini', 'rust', 'trad', 'hip', 'indu', 'cons'];
	var typeTags = ['full', 'fron', 'shac', 'chan', 'disp', 'ligh', 'merc', 'mann', 'diy'];

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

	app.get('/albums', selectNav, function(req, res) {
	  req.session.tag = 'albums';
	  Photo.find({ used: true}, function(err, results){
    	var sorted = sortByKey(results, 'date');
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						return next (err);
					}
					if (user) {
						Comment.find(function(err, results){
							res.render('photos-dyn', {user: user, photos: sorted, comments: results, navLogin: req.body.navLogin});
						});
					}
				});	
			} else {
				Comment.find(function(err, results){
					res.render('photos-dyn', {user: false, photos: sorted, comments: results, navLogin: req.body.navLogin});
				});
			}
		});
	});

};