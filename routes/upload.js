var Photo = require('../data/models/photos');
var Email = require('../data/models/emails');

module.exports = function(app) {

	app.get('/upload', function(req, res) {
    res.render('upload');
	});

  app.get('/upload1', function(req, res) {
    res.render('upload1');
  });

  app.get('/upload2', function(req, res) {
    res.render('upload2');
  });

  app.post('/upload2', function(req, res){
    
    var a = req.body.style;
    var styles = a.split(" ");
    req.body.style = styles;
    var b = req.body.type;
    var types = b.split(" ");
    req.body.type = types;
    req.body.used = true;
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
        res.render('upload2');
      }
    });

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

  app.post('/upload1', function(req, res){
    var url = req.body.url;
    var findIndex = url.match(/\.com|\.org|\.edu|\.gov|\.uk|\.net|\.ca|\.de|\.jp|\.fr|\.au|\.us|\.mil|\.biz|\.co/);
    if (findIndex == null) {
      res.send("Sorry invalid url, please go back and try a different images.");
    } else {
      var sourceIndex = findIndex.index + 4;
      req.body.source = url.slice(0, sourceIndex);
      req.body.userg = true;
      req.body.liked = 1;
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
                res.redirect('/notebook');
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

