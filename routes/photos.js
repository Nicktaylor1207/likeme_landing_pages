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

	app.get('/pm', function(req, res) {
		res.redirect('/photos-' + req.session.tag);
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
					res.redirect('back');
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
									res.redirect('back'); // This should receive a page parameter and redirect to the appropriate page instead of back. This is a shortcut for now.
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