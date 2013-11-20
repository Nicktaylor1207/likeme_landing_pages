var Email = require('../data/models/emails');
var selectNav = require('./middleware/select_nav');
var fs = require('fs');
var path = require('path');
var http = require('http');

module.exports = function(app) {

  function setTime() {
    x = new Date();
    y = x.getTime() - 1372395800000;
    return y;
  }

  app.get('/users/new', selectNav, function(req, res) {
    res.render('new', {user: sessionUser, navLogin: req.body.navLogin});
  });

  app.post('/users', function(req, res, next) {
		var tempPath = req.files.file.path;
		console.log(tempPath);
		res.redirect('/users/new')
	});

};

  // app.post('/users', function(req, res, next) {

  //   var tempPath = req.files.file.path;
  //   var extension = path.extname(req.files.file.name).toLowerCase();
  //   if (extension == ".png") {
  //     targetPath = 'public/img_uploads/image' + setTime() + '.png';
  //   } else if (extension == ".jpeg") {
  //     targetPath = 'public/img_uploads/image' + setTime() + '.jpeg';
  //   } else if (extension == ".jpg") {
  //     targetPath = 'public/img_uploads/image' + setTime() + '.jpg';
  //   } else {
  //     console.log("There is a problem setting the targetPath");
  //   };

  //   fs.readFile(tempPath, function(err, data){
  //     if (err) throw err;
  //     if (data == "") {
  //       /* create user profile without profile pic */
  //       User.create(req.body, function(err) {      
  //         if (err) {
  //           if (err.code === 11000) {
  //             res.redirect('/edit-profile1');
  //           } else {
  //             if (err.name === 'ValidationError') {
  //               return res.send(Object.keys(err.errors).map(function(errField) {
  //                 return err.errors[errField].message;
  //               }).join('. '), 406);
  //             } else {
  //             next(err);
  //             }

  //           }
  //           return;
  //         } else {
  //           res.redirect(307, '/session');
  //         }
  //       });
  //     } else {
  //       if (extension !== '.png' && extension !== '.jpeg' && extension !== '.jpg') {
  //         res.redirect('/oops');
  //       } else {
  //         fs.rename(tempPath, targetPath, function(err) {
  //           if (err) throw err;
  //         }); 
  //         req.body.profile_pic = targetPath.slice(7);
  //         User.create(req.body, function(err) {
  //           if (err) {
  //             if (err.code === 11000) {
  //                res.redirect('/edit-profile1');
  //             } else {
  //               if (err.name === 'ValidationError') {
  //                 return res.send(Object.keys(err.errors).map(function(errField) {
  //                   return err.errors[errField].message;
  //                 }).join('. '), 406);
  //               } else {
  //               next(err);
  //               }
  //             }
  //             return;
  //           } else {
  //             res.redirect(307, '/session');
  //           }
  //         });
  //       }
  //     }

  //   });
  // });
  // };