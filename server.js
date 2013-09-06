/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

// var uri = 'mongodb://heroku_app17359789:omvg0j2mnvsq7dslc20dim3lk6@ds037478.mongolab.com:37478/heroku_app17359789'
// mongoose.connect(uri);

var dbURL = 'mongodb://localhost/test';
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

require('./routes/index')(app);
require('./routes/about')(app);
require('./routes/demos')(app);
require('./routes/session')(app);
require('./routes/albums')(app);
require('./routes/photos')(app);
require('./routes/contact')(app);
require('./routes/upload')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
