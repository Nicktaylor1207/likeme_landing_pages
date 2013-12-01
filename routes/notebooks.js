var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Notebook = require('../data/models/notebooks');
var Comment = require('../data/models/comments');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/notebook', selectNav, function(req, res) {
  	res.render('notebook', {photos: sessionUser.photos, navLogin: req.body.navLogin, user: sessionUser});
	});

	app.post('/notebook1', selectNav, function(req, res) {
		if (sessionUser) {
			
			/* Handle duplicate named notebooks */
			function checkNotebookDup(notebook){
				if (notebook == req.body.name) {
					return true;
				} else {
					return false;
				}
			}

			if (sessionUser.notebooks.some(checkNotebookDup) == false) {

				/* Create a new notebook */
				Notebook.create({name: req.body.name, user: sessionUser.email}, function(err, name){
					if (err) {
						throw err;
					} else {
			  		name.photoArray.push(req.body.photo_url);
			  		name.save();
			  	}
				});

				/* Add the notebook the user's notebooks array */				
				sessionUser.notebooks.push(req.body.name);
				sessionUser.save();

				/* Update Photo document with notebook reference */
				Photo.findOne({url: req.body.photo_url}, function(err, photo){
					photo.notebooks.push(req.body.name);
					photo.save();
				});
				
			} else {

				/* Add the photo to the notebook */
				Notebook.findOne({name: req.body.name, user: sessionUser.email}, function(err, name){
					if (err) {
						return;
					} else {
			  		name.photoArray.push(req.body.photo_url);
			  		name.save();
			  	}
				});

			}

			/* Add the photo to the user's photos array */
			function checkPhotoDup(photo){
				if (photo == req.body.photo_url) {
					return true;
				} else {
					return false;
				}
			}

			if (sessionUser.photos.some(checkPhotoDup) == false) {
				sessionUser.photos.push(req.body.photo_url);
				sessionUser.save();
			} else {
				console.log("Already added to user's photos");
			}

			/* Update Photo document with comment and create comment */
			Photo.findOne({url: req.body.photo_url}, function(err, photo){
				if (req.body.comment != "") {
					photo.comments.push(req.body.comment);
					Comment.create({text: req.body.comment, user: sessionUser.email, firstName: sessionUser.firstName, lastName: sessionUser.lastName, photoUrl: req.body.photo_url}, function(err, text){
						if (err) {
							next();
						}
					});
				}
				photo.save(function(){
					res.redirect('back');	
				});
			});

		} else {
			res.redirect('/login');
		}
	});

};