module.exports = function(app) {

	app.get('/template', function(req, res) {
    res.render('template');
	});

};