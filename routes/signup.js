var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/signup', selectNav, function(req,res){
		res.render('signup', {navLogin: req.body.navLogin, user: sessionUser, hide: true});
	});

	app.post('/signup', function(req, res){
		Email.create(req.body, function(err) {
		  if (err) {
		    if (err.code === 11000) {
		       res.send("Someone has already signed up with that email address.");
		    } else {
		      if (err.name === 'ValidationError') {
		      	res.send('Sorry, when signing up you need to enter a valid email and password');
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
		Email.findOne({email: req.body.email.toLowerCase()}, function(err, user){
			if (err) {
				return next (err);
			}
			if (user) {
				req.session.email = user;
				if (user.pro == true) {
					res.redirect('/pro-profile-create')
				} else {
					res.redirect('/intro');
				}
			} else {
				res.redirect('/login');
			}
		});
	});

};