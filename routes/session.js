var Email = require('../data/models/emails');

module.exports = function(app) {

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/logout', function(req, res) {
		req.session = null;
		res.redirect('/');
	});

	app.post('/session', function(req, res) {
		Email.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
			if (err) {
				return next (err);
			}
			if (user) {
				req.session.email = user;
				res.send("You're now signed in");
			} else {
				res.redirect('/login');
			}
		});
	});

	app.get('/change-password', function(req, res){
		console.log(req.session.email);
		if (req.session.email == null) {
			res.redirect('/login');
		} else {
			res.render('change');
		}
	});

	app.post('/change', function(req, res){
		console.log(req.body);
		console.log(req.session.email.email);
		console.log(req.body.email);
		console.log(req.session.email.password);
		console.log(req.body.old_password);
		if (req.session.email.email == req.body.email && req.session.email.password == req.body.old_password){
			Email.findOne({ 'email' : req.body.email }, function(err, email){
				email.password = req.body.new_password;
				email.save(function(){
					req.session.email.password = req.body.new_password;
					res.redirect('/');
				});
			});
		} else {
			res.send("Either the password or email does not match.");
		}
	});

};