var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');
var loggedIn = require('./middleware/logged_in');

module.exports = function(app) {


	app.get('/', selectNav, function(req,res){
		if (req.body.navLogin == true) {
			res.render('albums', {navLogin: req.body.navLogin});
		} else {	
			var sent = false;
			var prefs_sent = false;
			res.render('index', {hide: req.body.navLogin, sent: sent, prefs_sent: prefs_sent});
		}
	});


	app.post('/signup', function(req, res){
		
		Email.create(req.body, function(err) {
		  if (err) {
		    if (err.code === 11000) {
		       res.send("Someone has already signed up with that email address.");
		    } else {
		      if (err.name === 'ValidationError') {
		      	res.send('Sorry you need to enter a valid email and password');
		        // return res.send(Object.keys(err.errors).map(function(errField) {
		        //   return err.errors[errField].message;
		        // }).join('. '), 406);
		      } else {
		      next(err);
		      }
		    }
		    return;
		  } else {
		  	res.redirect(307, '/session1');
		  }
		});
	});

	app.post('/session1', function(req, res) {
		Email.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
			if (err) {
				return next (err);
			}
			if (user) {
				req.session.email = user;
				var sent = false;
				var prefs_sent = false;
				var hide = true;
				var navLogin = true;
				res.render('index', {hide: hide, sent: sent, prefs_sent: prefs_sent, navLogin: navLogin});
			} else {
				res.redirect('/login');
			}
		});
	});

};