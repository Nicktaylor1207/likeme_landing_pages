var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/loginAlt', selectNav, function(req, res){
		res.render('loginAlt', {user: sessionUser, navLogin: req.body.navLogin});
	});

	app.get('/loginAlt2', selectNav, function(req, res){
		res.render('loginAlt2', {user: sessionUser, navLogin: req.body.navLogin});
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
		Email.findOne({email: req.body.email.toLowerCase(), password: req.body.password}, function(err, user) {
			if (err) {
				return next (err);
			}
			if (user) {
				req.session.email = user;
				res.redirect('/albums');
			} else {
				Email.findOne({email: req.body.email.toLowerCase()}, function(err, user){
					if (err) {
						return next (err);
					}
					if (user && user.password == "password") {
						req.session.email = user;
						res.redirect('/loginAlt');
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
		if (req.session.email.email == req.body.email.toLowerCase() && req.session.email.password == req.body.old_password){
			Email.findOne({ 'email' : req.body.email.toLowerCase() }, function(err, email){
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
		Email.findOne({email: req.body.email.toLowerCase()}, function(err, user){
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