var Photo = require('../data/models/photos');

module.exports = function(app) {

	app.get('/upload', function(req, res) {
    res.render('upload');
	});

	app.post('/upload', function(req, res){

		Photo.create(req.body, function(err) {      
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
        res.render('upload');
      }
    });


	});

};