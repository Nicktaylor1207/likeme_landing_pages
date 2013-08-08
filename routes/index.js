var Email = require('../data/models/emails');

module.exports = function(app) {
  
	app.get('/', function(req, res){
		var hide = false;
		var sent = false;
		res.render('index', {hide: hide, sent: sent});
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
		    res.render('index', {hide: hide, sent: sent});
		  }
		});


	});

};