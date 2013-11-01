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

	app.get('/albums', selectNav, function(req, res) {
	  req.session.tag = 'albums';
	  Photo.find({ used: true}, function(err, results){
    	var sorted = sortByKey(results, 'position'); // change to timestamp
    	if (req.session.email) {
	    	Email.findOne({email: req.session.email.email}, function(err, user) {
					if (err) {
						return next (err);
					}
					if (user) {
						res.render('albums', {user: user, photos: sorted, navLogin: req.body.navLogin});
					}
				});	
			} else {
				res.render('albums', {user: false, photos: sorted, navLogin: req.body.navLogin});
			}
		});
	});

};