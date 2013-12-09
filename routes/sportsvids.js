var Vid = require('../data/models/sportsvids');
var Comment = require('../data/models/comments');

module.exports = function(app) {

	app.get('/addvid', function(req, res){
		res.render('addvid');
	});

	app.get('/sportsvids', function(req, res){
		Vid.find(function(err, vids){
			res.render('sportsvids', {vids: vids});
		});
	});

	app.post('/addvid', function(req, res){
		Vid.create(req.body, function(err){
			if (err){
				next(err);
				return;
			} else {
				res.redirect('/sportsvids');
			}
		});
	});

};