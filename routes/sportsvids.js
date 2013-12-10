var Vid = require('../data/models/sportsvids');
var Comment = require('../data/models/comments');

module.exports = function(app) {

	function sortByKey(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		});
	}

	app.get('/addvid', function(req, res){
		res.render('addvid');
	});

	app.get('/sportsvids', function(req, res){
		Vid.find(function(err, vids){
			res.render('sportsvids', {vids: vids, vid: false});
		});
	});

	app.get('/sportsvids/:id', function(req, res){
		Vid.find(function(err, vids){
			var vidsByDate = sortByKey(vids, 'date');
			if(!err){
				Vid.findById(req.params.id, function(err, vid){
					if(!err){
						res.render('sportsvids', {vids: vidsByDate, vid: vid});	
					}
				})
			}
		});
	});

	app.post('/addvid', function(req, res){
		Vid.create(req.body, function(err, vid){
			if (err){
				next(err);
				return;
			} else {
				var vidUrl = req.body.url;
				var ytId = vidUrl.slice(vidUrl.indexOf('embed') + 6).toString();
				vid.imgthumb = "http://img.youtube.com/vi/" + ytId + "/hqdefault.jpg";
				vid.save(function(){
					res.redirect('/sportsvids');
				})
			}
		});
	});

};