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

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  app.get('/pro-profile', selectNav, function(req, res) {
	  if (sessionUser) {

      if (sessionUser.notebooks.length > 0) {

        Notebook.find({user: sessionUser.email}, function(err, results){

          // For each notebook, iterate through the photos in the photoArray
          // Find each photoObject and add it to a new array attribute called notebook.photoObjects
          // Once all of the photos have been added, push notebook to a new array, newNotebooks
          // Once newNotebooks has been updated, proceed to the next notebook
          // Once all of the notebooks have been pushed to newNotebooks, render the page with notebooks: newNotebooks

          var notebooks = sortByKey(results, 'date');
          var newNotebooks = [];

          // takes an array of photoUrls and returns an array of photoObjects
          function addPhotos(photoUrls, callback){
            var count = photoUrls.length;
            var photoObjects = [];
            photoUrls.forEach(function(url){
              Photo.findOne({'url': url}, function(err, photoObj){
                photoObjects.push(photoObj); 
                count--;
                if (count == 0) {
                  callback(photoObjects);
                }
              })
            })
          }

          function addNotebooks(notebooks, callback){
            // not until each notebook has executed the code will it be rendered
            var nbCount = notebooks.length;
            notebooks.forEach(function(result){
              var notebook = result.toJSON();
              var photoUrls = notebook.photoArray;
              // not until each photo has been added to the notebook will we proceed to the next notebook
              notebook.photoObjects = [];
              addPhotos(photoUrls, function(photoObjects){
                notebook.photoObjects = photoObjects;
                newNotebooks.push(notebook);
                nbCount--;
                if (nbCount == 0) {
                  callback();
                }
              });
            })
          }

          addNotebooks(notebooks, function(){
            res.render('pro-profile', {user: sessionUser, notebooks: newNotebooks, navLogin: req.body.navLogin});
          });

        });

      } else {
        res.render('pro-profile', {user: sessionUser, notebooks: [], navLogin: req.body.navLogin});
      }

	  }
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







// var notebooks = sortByKey(results, 'date');
// var newNotebook = [];
// notebook = notebooks[1].toJSON();
// var photoUrls = notebook.photoArray;
// var count = photoUrls.length;
// notebook.photoObjects = [];

// photoUrls.forEach(function(url){
//   Photo.findOne({'url': url}, function(err, photoObj){
//     notebook.photoObjects.push(photoObj); 
//     count--;
//     if (count == 0) {
//       res.render('pro-profile', {user: sessionUser, notebook: notebook, navLogin: req.body.navLogin});
//     }
//   })
// })