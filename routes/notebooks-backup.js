var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Notebook = require('../data/models/notebooks');
var Comment = require('../data/models/comments');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/notebook', selectNav, function(req, res) {
  	res.render('notebook', {photos: sessionUser.notebook.photos, navLogin: req.body.navLogin, user: sessionUser});
	});

	app.get('/nb-pm', function(req, res) {
		res.redirect('/notebook');
	});

	app.post('/notebook1', selectNav, function(req, res) {
		if (sessionUser) {
			
			/* Handle duplicate named notebooks */

			/* Create a new notebook */
			Notebook.create({name: req.body.name, user: sessionUser.email}, function(err, name){
				if (err) {
					return;
				} else {
		  		name.photoArray.push(req.body.photo_url);
		  		name.save(function(){
		  			res.redirect('back');	
		  		});
		  	}
			});

			/* Add the notebook and photo to the user's respective arrays */
			sessionUser.notebooks.push(req.body.name);
			sessionUser.photos.push(req.body.photo_url);
			sessionUser.save();

			/* Update Photo document with notebook reference and comment and create comment */
			Photo.findOne({url: req.body.photo_url}, function(err, photo){
				photo.notebooks.push(req.body.name);
				if (req.body.comment != "") {
					photo.comments.push(req.body.comment);
					Comment.create({text: req.body.comment, user: sessionUser.email, firstName: sessionUser.firstName, lastName: sessionUser.lastName, photoUrl: req.body.photo_url}, function(err, text){
						if (err) {
							next();
						}
					});
				}
				photo.save(function(){
				});
			});

		} else {
			res.redirect('/login');
		}
	});

};