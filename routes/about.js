var Idea = require('../data/models/ideas');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/about', function(req, res) {
		var hide = false;
    var sent = false;
    var prefs_sent = false;
    res.render('about', {hide: hide, sent: sent, prefs_sent: prefs_sent});
	});

	// app.post('/about', function(req, res){

	// });

	app.post('/idea', function(req, res){

		Idea.create(req.body, function(err) {      
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
        var hide = false;
        var sent = true;
        res.render('about', {hide: hide, sent: sent});
      }
    });

	});

};