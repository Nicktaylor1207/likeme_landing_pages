var Message = require('../data/models/messages');

module.exports = function(app) {

	app.get('/learn-more', function(req, res) {
		res.render('learn-more');
	});

	// app.post('/learn-more', function(req, res){

	// });

	app.post('/message', function(req, res){

		Message.create(req.body, function(err) {      
      if (err) {
        if (err.name === 'ValidationError') {
          return res.send(Object.keys(err.errors).map(function(errField) {
            return err.errors[errField].message;
          }).join('. '), 406);
        } else {
        next(err);
        }
        return;
      } else {
        res.render('learn-more');
      }
    });

	});

};