module.exports = function(app) {

	app.get('/photos', function(req, res) {
    res.render('photos');
	});

};