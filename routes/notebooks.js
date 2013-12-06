var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Notebook = require('../data/models/notebooks');
var Comment = require('../data/models/comments');
var selectNav = require('./middleware/select_nav');

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}

module.exports = function(app) {

	app.get('/notebook', selectNav, function(req, res) {
  	res.render('notebook', {photos: sessionUser.photos, navLogin: req.body.navLogin, user: sessionUser, id: sessionUser});
	});

	app.get('/create-nb-pm', function(req, res) {
		res.redirect('/notebooks');
	});

	app.get('/notebooks-create', selectNav, function(req, res) {
  	res.render('notebooks-create', {user: sessionUser, id: sessionUser, navLogin: req.body.navLogin});
	});

	app.get('/notebooks', selectNav, function(req, res) {
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
              if (count > 0) {
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
	            } else {
	            	callback(err, photoObjects);
	            }
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
              res.render('notebooks', {user: sessionUser, id: sessionUser, notebooks: newNotebooks, comments: comments, navLogin: req.body.navLogin});
            });

          });

        } else {
          res.render('notebooks', {user: sessionUser, id: sessionUser, notebooks: [], comments: comments, navLogin: req.body.navLogin});
        }

      });
    
	  } else {
      /* Replace with front-end validation */
      res.redirect('/login')
    }
  });

	app.post('/notebook1', selectNav, function(req, res) {
		if (sessionUser) {
			
			/* Handle duplicate named notebooks */
			function checkNotebookDup(notebook){
				if (notebook == req.body.name) {
					return true;
				} else {
					return false;
				}
			}

			if (sessionUser.notebooks.some(checkNotebookDup) == false) {

				/* Create a new notebook */
				Notebook.create({name: req.body.name, user: sessionUser.email}, function(err, name){
					if (err) {
						throw err;
					} else {
			  		name.photoArray.push(req.body.photo_url);
			  		name.save();
			  	}
				});

				/* Add the notebook the user's notebooks array */				
				sessionUser.notebooks.push(req.body.name);
				sessionUser.save();

				/* Update Photo document with notebook reference */
				Photo.findOne({url: req.body.photo_url}, function(err, photo){
					photo.notebooks.push(req.body.name);
					photo.save();
				});
				
			} else {

				/* Add the photo to the notebook */
				Notebook.findOne({name: req.body.name, user: sessionUser.email}, function(err, name){
					if (err) {
						return;
					} else {
			  		name.photoArray.push(req.body.photo_url);
			  		name.save();
			  	}
				});

			}

			/* Add the photo to the user's photos array */
			function checkPhotoDup(photo){
				if (photo == req.body.photo_url) {
					return true;
				} else {
					return false;
				}
			}

			if (sessionUser.photos.some(checkPhotoDup) == false) {
				sessionUser.photos.push(req.body.photo_url);
				sessionUser.save();
			} else {
				console.log("Already added to user's photos");
			}

			/* Update Photo document with comment and create comment */
			Photo.findOne({url: req.body.photo_url}, function(err, photo){
				if (req.body.comment != "") {
					photo.comments.push(req.body.comment);
					Comment.create({text: req.body.comment, user: sessionUser.email, firstName: sessionUser.firstName, lastName: sessionUser.lastName, photoUrl: req.body.photo_url}, function(err, text){
						if (err) {
							next();
						}
					});
				}
				photo.save(function(){
					res.redirect('back');	
				});
			});

		} else {
			res.redirect('/login');
		}
	});

};