var Email = require('../data/models/emails');
var Comment = require('../data/models/comments');
var Photo = require('../data/models/photos');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.post('/comment', selectNav, function(req, res) {

		Comment.create(req.body, function(err){
			if (err) {
				return;
			}
			var photoUrl = req.body.photoUrl;
			Photo.findOne({'url': photoUrl}, function(err, photo){
				photo.comments.push(req.body.text);
				photo.save(function(){
					res.redirect('back');
				});
			})
		});

	});

};