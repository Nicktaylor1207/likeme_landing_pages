var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Comment = require('../data/models/comments');
var Notebook = require('../data/models/notebooks');
var selectNav = require('./middleware/select_nav');
var fs = require('fs');
var path = require('path');

module.exports = function(app) {

  function setTime() {
    x = new Date();
    y = x.getTime() - 1372395800000;
    return y;
  }

  app.get('/pro-profile', selectNav, function(req, res) {
	  if (sessionUser) {
      var notebookNames = sessionUser.notebooks;
      var notebooks = [];
      Notebook.find({user: sessionUser.email}, function(err, notebooks){
        if (err) {
          return err;
        }
        res.render('pro-profile', {user: sessionUser, notebooks: notebooks, navLogin: req.body.navLogin});
      });
	  };
  });

  app.get('/profile', selectNav, function(req, res) {
    if (sessionUser) {
      res.render('profile', {user: sessionUser, navLogin: req.body.navLogin});
    }
  });

  app.get('/pro-profile-create', selectNav, function(req, res) {
    if (sessionUser) {
	    res.render('pro-profile-create', {user: sessionUser, navLogin: req.body.navLogin});
    } else {
      res.redirect("/");
    }
  });

  function saveUser(req, res, user){
    user.title = req.body.title;
    user.website = req.body.website;
    user.description = req.body.description;
    user.number = req.body.number;
    user.address = req.body.address;
    user.save(function(){
      res.redirect('/pro-profile');
    });
  };

  app.post('/create-pro-profile', selectNav, function(req, res) {  
    
    var tempPath = req.files.profilePic.path;
    var extension = path.extname(req.files.profilePic.name).toLowerCase();
    targetPath = 'public/images/profile_pics/image' + setTime() + extension;
    
    fs.readFile(tempPath, function(err, data){
      if (err) throw err;
      if (data != "") {
        fs.rename(tempPath, targetPath, function(err) {
          if (err) throw err;
          sessionUser.profilePic = targetPath.slice(7);
          saveUser(req, res, sessionUser);
        });
      } else {
        saveUser(req, res, sessionUser);
      }          
    });

  });

};







