var Email = require('../data/models/emails');
var Photo = require('../data/models/photos');
var Notebook = require('../data/models/notebooks');
var selectNav = require('./middleware/select_nav');
var fs = require('fs');
var path = require('path');

function checkNotebookDup(notebook){
  if (notebook == req.body.name) {
    return true;
  } else {
    return false;
  }
}

module.exports = function(app) {

  app.post('/create-notebook', selectNav, function(req, res){

    /* Add photo to photos if there are photo inputs */
    if (req.body.photoCounter > 0) {
      
      Notebook.create({name: req.body.name, user: sessionUser.email}, function(err, name){
        if (err) {
          throw err;
        } else {
          /* Add the notebook name to the user's notebooks array */
          sessionUser.notebooks.push(name.name);
          sessionUser.save()
          /* Add the photoUrls to the notebook photoArray */
          var notebook = name;
          addPhotos(notebook);
        }
      });

      function addPhotos(notebook){
        /* counts how many photos are being added */
        var photoCounter = req.body.photoCounter;
        var reqArray = [req.body.url1, req.body.url2, req.body.url3, req.body.url4, req.body.url5, req.body.url6, req.body.url7, req.body.url8, req.body.url9, req.body.url10, req.body.url11];

        function createPhoto(count, callback){
          Photo.create({used: true}, function(err, photo) {      
            if (err) {
              throw err;
            } else {
              var url = reqArray[count];
              var findIndex = url.match(/\.com|\.org|\.edu|\.gov|\.uk|\.net|\.ca|\.de|\.jp|\.fr|\.au|\.us|\.mil|\.biz|\.co/);
              if (findIndex == null) {
                res.send("Sorry invalid url, please go back and try a different image.");
              } else {
                var sourceIndex = findIndex.index + 4;
                var source = url.slice(0, sourceIndex);
                photo.url = url;
                photo.source = source;
                photo.userg= sessionUser._id;
                photo.notebooks.push(req.body.name);
                callback(count, photo);
              }
            }
          });
        };

        function savePhoto(count, photo){
          photo.save(function(){
            /* Add the photo url to the notebook's photoArray */
            notebook.photoArray.push(photo.url);
            count++;
            if (count == photoCounter) {
              notebook.save(function(){
                res.redirect('/albums');
              });
            } else {
              createPhoto(count, savePhoto);
            }
          }); 
        };

        createPhoto(0, savePhoto);
      };

    } else {
      /* Create notebook without photos here */
    }

  });

};

// if (sessionUser.notebooks.some(checkNotebookDup) == false) {

//   /* Create a new notebook */
//   Notebook.create({name: req.body.name, user: sessionUser.email}, function(err, name){
//     if (err) {
//       throw err;
//     } else {
//       name.photoArray.push(req.body.photo_url);
//       name.save();
//     }
//   });    
// }

/* Working to add photo */
// app.post('/create-notebook', selectNav, function(req, res){

//   /* Add the photo to photos */
//   var url = req.body.url;
//   var findIndex = url.match(/\.com|\.org|\.edu|\.gov|\.uk|\.net|\.ca|\.de|\.jp|\.fr|\.au|\.us|\.mil|\.biz|\.co/);
//   if (findIndex == null) {
//     res.send("Sorry invalid url, please go back and try a different image.");
//   } else {
//     var sourceIndex = findIndex.index + 4;
//     var source = url.slice(0, sourceIndex);
//     var photoObj = {url: req.body.url, source: source, userg: sessionUser._id, used: true}
//     Photo.create(photoObj, function(err, photo) {      
//       if (err) {
//         throw err;
//       } else {
//         photo.notebooks.push(req.body.name);
//         photo.save(function(){
//           res.redirect('/albums');
//         })
//       }
//     });
//   }

// });

/* Working to add multiple photos */
// app.post('/create-notebook', selectNav, function(req, res){

//   /* Add photo to photos if there are photo inputs */
//   if (req.body.photoCounter > 0) {
    
//     /* counts how many photos are being added */
//     var photoCounter = req.body.photoCounter;
//     var reqArray = [req.body.url1, req.body.url2, req.body.url3];

//     function createPhoto(count, callback){
//       Photo.create({used: true}, function(err, photo) {      
//         if (err) {
//           throw err;
//         } else {
//           var url = reqArray[count];
//           var findIndex = url.match(/\.com|\.org|\.edu|\.gov|\.uk|\.net|\.ca|\.de|\.jp|\.fr|\.au|\.us|\.mil|\.biz|\.co/);
//           if (findIndex == null) {
//             res.send("Sorry invalid url, please go back and try a different image.");
//           } else {
//             var sourceIndex = findIndex.index + 4;
//             var source = url.slice(0, sourceIndex);
//             photo.url = url;
//             photo.source = source;
//             photo.userg= sessionUser._id;
//             photo.notebooks.push(req.body.name);
//             callback(count, photo);
//           }
//         }
//       });
//     }

//     function savePhoto(count, photo){
//       photo.save(function(){
//         count++;
//         if (count == photoCounter) {
//           res.redirect('/albums')
//         } else {
//           createPhoto(count, savePhoto);
//         }
//       }); 
//     }

//     createPhoto(0, savePhoto);
//   }

// });