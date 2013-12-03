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

      Comment.find(function(err, comments){

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
                  if (err) {
                    throw err;
                  }
                  photoObjects.push(photoObj); 
                  count--;
                  if (count == 0) {
                    callback(err, photoObjects);
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
                addPhotos(photoUrls, function(err, photoObjects){
                  if (err) {
                    throw err;
                  }
                  notebook.photoObjects = photoObjects;
                  newNotebooks.push(notebook);
                  nbCount--;
                  if (nbCount == 0) {
                    callback();
                  }
                });
              });
            }

            addNotebooks(notebooks, function(err){
              res.render('pro-profile', {user: sessionUser, id: sessionUser, notebooks: newNotebooks, comments: comments, navLogin: req.body.navLogin});  
            });

          });

        } else {
          res.render('pro-profile', {user: sessionUser, id: sessionUser, notebooks: [], comments: comments, navLogin: req.body.navLogin});
        }

      });
    
	  } else {
      /* Replace with front-end validation */
      res.redirect('/login')
    }
  });

  app.get('/pro-profile-view/:id?', selectNav, function(req, res) {

    if (sessionUser) {
      Email.findById(req.params.id, function(err, id) {
        if (id._id.toString() === sessionUser._id.toString()) {
          res.redirect('/pro-profile');
        } else {
          req.session.idString = id._id.toString();
          Comment.find(function(err, comments){
            if (id.notebooks.length > 0) {
              Notebook.find({user: id.email}, function(err, results){
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
                  res.render('pro-profile-view', {user: sessionUser, id: id, notebooks: newNotebooks, comments: comments, navLogin: req.body.navLogin});
                });
              });
            } else {
              res.render('pro-profile-view', {user: sessionUser, id: id, notebooks: [], comments: comments, navLogin: req.body.navLogin});
            }
          });    
        }
      });
    } else {
      /* Replace with front-end validation */
      res.redirect('/login')
    }
  });

  app.get('/profile', selectNav, function(req, res) {
    if (sessionUser) {
      res.render('profile', {user: sessionUser, id: sessionUser, navLogin: req.body.navLogin});
    }
  });

  app.get('/pro-profile-create', selectNav, function(req, res) {
    if (sessionUser) {
	    res.render('pro-profile-create', {user: sessionUser, id: sessionUser, navLogin: req.body.navLogin});
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