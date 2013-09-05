var Email = require('../data/models/emails');
var Pref = require('../data/models/prefs');

module.exports = function(app) {
  
	app.get('/', function(req, res){
		var hide = false;
		var sent = false;
		var prefs_sent = false;
		res.render('index', {hide: hide, sent: sent, prefs_sent: prefs_sent});
		console.log(req.session.email);
	});

	app.post('/signup', function(req, res){
		
		Email.create(req.body, function(err) {
		  if (err) {
		    if (err.code === 11000) {
		       res.send("Someone has already signed up with that email address.");
		    } else {
		      if (err.name === 'ValidationError') {
		        return res.send(Object.keys(err.errors).map(function(errField) {
		          return err.errors[errField].message;
		        }).join('. '), 406);
		      } else {
		      next(err);
		      }
		    }
		    return;
		  } else {
		    var hide = true;
		    var sent = false;
		    var prefs_sent = false;
		    user_email = req.body.email; // GLOBAL VARIABLE **FIX**
		    res.render('index', {hide: hide, sent: sent, email: user_email, prefs_sent: prefs_sent});
		  }
		});
	});

	app.post('/prefs', function(req, res){

		req.body.pref_user_email = user_email;

		Pref.create(req.body, function(err) {
		  if (!err) {
		    var hide = true;
		    var sent = false;
		    var prefs_sent = true;
		    res.render('index', {hide: hide, sent: sent, prefs_sent: prefs_sent});
		  }
		});
	});

};