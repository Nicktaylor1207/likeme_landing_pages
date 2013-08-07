var Email = require('../data/models/emails');

module.exports = function(app) {
  
	app.get('/', function(req, res){
		res.render('index');
	});

	app.post('/signup', function(req, res){

		Email.create(req.body, function(err) {
		  if (err) {
		    if (err.code === 11000) {
		       res.redirect('/edit-profile1');
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
		    res.render('index');
		  }
		});


	});

};