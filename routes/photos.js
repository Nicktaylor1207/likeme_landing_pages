var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/pm', function(req, res) {
		if (req.session.tag == 'albums') {
			res.redirect('/albums');	
		} else {
			res.redirect('/photos-' + req.session.tag);
		}
	});

	// app.post('/notebook1', selectNav, function(req, res) {
	// 	if (sessionUser) {

			// function checkPhotoDup(photo){
			// 	if (photo == req.body.image_url) {
			// 		return true;
			// 	} else {
			// 		return false;
			// 	}
			// }

			// if (sessionUser.notebook.photos.some(checkPhotoDup) == true) {
			// 	res.redirect('back');
			// } else {
	// 			sessionUser.notebook.photos.push(req.body.image_url);
	// 			sessionUser.save(function(){
	// 				Photo.findOne({url: req.body.image_url}, function(err, photo) {
	// 					if (err) {
	// 						return next (err);
	// 					}
	// 					if (photo) {
	// 						photo.liked = photo.liked + 1;
	// 						photo.save(function(){
	// 							res.redirect('back'); // This should receive a page parameter and redirect to the appropriate page instead of back. This is a shortcut for now.
	// 						});
	// 					}
	// 				});
	// 			});	
	// 		}
	// 	} else {
	// 		res.redirect('/login');
	// 	}
	// });

};