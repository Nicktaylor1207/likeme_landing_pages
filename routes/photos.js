module.exports = function(app) {

	app.get('/photos-ny', function(req, res) {
    res.render('photos-ny');
	});

	app.get('/photos-bou', function(req, res) {
    res.render('photos-bou');
	});

};