var Message = require('../data/models/messages');
var selectNav = require('./middleware/select_nav');

module.exports = function(app) {

	app.get('/about', selectNav, function(req, res) {
    res.render('about', {navLogin: req.body.navLogin, user: sessionUser, id: sessionUser});
	});

	app.post('/message', selectNav, function(req, res){
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
        res.redirect('/about');
      }
    });

	});

};