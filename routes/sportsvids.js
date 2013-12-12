var Vid = require('../data/models/vids');
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

	app.get('/fb-login', function(req, res){
		res.render('fb-login');
	});

	app.get('/sportsvids/:id', function(req, res){
		
		function getPlayers(vid, callback){
			if (vid.userIDs) {
				var userIDs = vid.userIDs;
				var count = userIDs.length;
				var players = [];
				userIDs.forEach(function(userID){
					User.findById(userID, function(err, player){
						if (err) {
						  next(err);
						}
						players.push(player);
						count--;
						if (count == 0) {
						  callback(players);
						}
					});
				});
			}
		}

		Vid.find(function(err, vids){
			if (err) {
				res.redirect('/sportsvids');
				console.log("Error finding vids");
				throw err;
			} else {
				var vidsByDate = sortByKey(vids, 'date');
				Vid.findById(req.params.id, function(err, vid){
					if(err) {
						res.redirect('/sportsvids');
						console.log("Error finding vid with that :id");
						throw err;
					} else {
						if (vid.userIDs.length > 0){
							getPlayers(vid, function(err, players){
								if (!err) {
									res.render('sportsvids', {vids: vidsByDate, vid: vid, players: players});
								}
							});
						} else {
							res.render('sportsvids', {vids: vidsByDate, vid: vid, players: false});
						}
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