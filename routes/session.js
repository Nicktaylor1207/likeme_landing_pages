var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/forgot-password', function(req, res){
		res.render('forgot-password');
	});

	app.get('/loginAlt', selectNav, function(req, res){
		Email.findOne({email: req.session.email.email}, function(err, user){
			if (err) {
				return next (err);
			} else {
				res.render('loginAlt', {user: user, navLogin: req.body.navLogin});
			}
		});		
	});

	app.get('/logout', function(req, res) {
		req.session = null;
		res.redirect('/');
	});

	app.get('/session1', function(req, res) {
		res.redirect('/');
	});

	app.get('/session', function(req, res) {
		res.redirect('/');
	});

	app.post('/session', function(req, res) {
		Email.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
			if (err) {
				return next (err);
			}
			if (user) {
				req.session.email = user;
				res.redirect('/albums');
			} else {
				Email.findOne({email: req.body.email}, function(err, user){
					if (err) {
						return next (err);
					}
					if (user && user.password == "password") {
						req.session.email = user;
						res.redirect('/loginAlt')
					} else {
						res.redirect('/login');
					}
				});
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

	app.post('/update', function(req, res){
		Email.findOne({email: req.body.email}, function(err, user){
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.password = req.body.password;
			user.save(function(){
				req.session.email.password = req.body.password;
				res.redirect('/introAlt')
			})
		});
	});

};