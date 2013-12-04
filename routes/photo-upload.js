var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Notebook = require('../data/models/notebooks');
var selectNav = require('./middleware/select_nav');
var fs = require('fs');
var path = require('path');

module.exports = function(app) {

  app.post('/upload1', function(req, res){
    var url = req.body.url;
    var findIndex = url.match(/\.com|\.org|\.edu|\.gov|\.uk|\.net|\.ca|\.de|\.jp|\.fr|\.au|\.us|\.mil|\.biz|\.co/);
    if (findIndex == null) {
      res.send("Sorry invalid url, please go back and try a different image.");
    } else {
      var sourceIndex = findIndex.index + 4;
      req.body.source = url.slice(0, sourceIndex);
      req.body.userg = req.session.email.email;
      req.body.liked = 1;
      var c = (new Date()).getTime();
      req.body.date = c;
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
          Email.findOne({email: req.session.email.email}, function(err, email) {
            if (err) {
              return next (err);
            }
            if (email) {
              email.notebook.photos.push(req.body.url);
              email.save(function(){
                res.redirect('/notebooks');
              });
            } else {
              res.redirect('/login');
            }
          });
        }

      });
    }

  });

};

