/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path')
  , mailer = require('express-mailer');

var app = express();

// var uri = 'mongodb://heroku_app17359789:omvg0j2mnvsq7dslc20dim3lk6@ds037478.mongolab.com:37478/heroku_app17359789'
// mongoose.connect(uri);

var dbURL = 'mongodb://localhost/foobar';
var db = mongoose.connect(dbURL);

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('I love Red'));
  app.use(express.cookieSession({ cookie: {maxAge: 60 * 60 * 1000}}));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();     
  }
});

require('./routes/index')(app);
require('./routes/about')(app);
require('./routes/demos')(app);
require('./routes/session')(app);
require('./routes/photos')(app);
require('./routes/contact')(app);
require('./routes/upload')(app);
require('./routes/notebook')(app);
require('./routes/terms')(app);
require('./routes/signup')(app);
require('./routes/intro')(app);
require('./routes/email')(app);
require('./routes/template')(app);
require('./routes/platform')(app);
require('./routes/photos-dynamic')(app);
require('./routes/comments')(app);
require('./routes/profiles')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

mailer.extend(app, {
  from: 'team@sevenalbums.com', // still sends from auth address below ('zach@sevenalbums.com')
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  service: 'Gmail',
  auth: {
    user: 'zach@sevenalbums.com',
    pass: 'Tyuhbn_85'
  }
});