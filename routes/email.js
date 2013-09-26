var Email = require('../data/models/emails');

module.exports = function(app) {

  app.get('/forgot-password', function(req, res){
    Email.find(function(err, users){
      res.render('forgot-password', {users: users});
    })
  });

  app.post('/email', function (req, res, next) {
    Email.findOne({email: req.body.email}, function(err, user){
      if (err) {
        console.log(err);
        res.send("There was an error finding this email address");
        return;
      } else {
        app.mailer.send('email', {
          to: user.email,
          subject: 'Password for Seven Albums',
          user: user,
        }, function (err, message) {
          if (err) {
            // handle error
            console.log(err);
            res.send('There was an error finding this email address');
            return;
          }
          res.header('Content-Type', 'text/plain');
          res.redirect('/loginAlt2');
        });
      }
    });
  });

};