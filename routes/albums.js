module.exports = function(app) {

	app.get('/albums', function(req, res) {
    res.render('albums');
	});

};