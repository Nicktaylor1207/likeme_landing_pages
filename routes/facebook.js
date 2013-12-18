var User = require('../data/models/users');

module.exports = function(app) {

	app.get('/fb-register', function(req, res){
		res.render('fb-register');
	});

	app.post('/fb-login', function(req, res){
		console.log("Posting to /fb-login");
		fbUserID = req.body.fbUserID;
		User.find({fbUserID: fbUserID}, function(err, users){
			if (err) {
				console.log(err);
				next();
			} else if (users.length) {
				console.log("User already exists");
			} else {
				User.create({fbUserID: fbUserID}, function(err, user){
					if (err) {
						console.log(err);
						next();
					} else {
						console.log("New user created with fb ID: " + user.fbUserID);
					}
				});
			}
		});
		res.redirect('/sportsvids');
	});

};