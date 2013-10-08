var selectNav = require('./middleware/select_nav');
var Photo = require('../data/models/photos');

module.exports = function(app) {

	app.get('/platform', selectNav, function(req, res) {
    Photo.find({ tag: 'boutique' }, function(err, results){
    	var photos = results;
    	res.render('platform', {navLogin: req.body.navLogin, photos: photos});
    });
	});

	app.post('/platform1', function(req, res) {
		Photo.findOne({ url: req.body.photoURL }, function(err, photo) {
			photo.down += 1;
			photo.save(function(){
				res.redirect('/platform');	
			});
		});		
	});

	app.post('/platform2', function(req, res) {
		Photo.findOne({ url: req.body.photoURL }, function(err, photo) {
			photo.up += 1;
			photo.save(function(){
				res.redirect('/platform');
			});
		});		
	});

};