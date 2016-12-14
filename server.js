// server.js

// set up
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || (8080);
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration
mongoose.connect(configDB.url);	// connect to our database
//console.log(configDB.url);
var db = mongoose.connection;
db.on('error', function(err) {
	console.log('db error: ', err);
});
db.once('open', function() {
	console.log('db connected');
});

require('./config/passport')(passport);	// pass passport for configuration

// set up our express application
app.use(morgan('dev'));		// log every request to the console
app.use(cookieParser());	// read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));	// get information from html forms

app.set('view engine', 'ejs');	// set up ejs for templating

// required for passport
app.use(session({
	secret: 'session_secret_key',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());	// persistent login sessions
app.use(flash());	// use connect-flash for flash message stored in session

// routes
require('./app/routes.js')(app, passport);
// app.get('/', function(req, res) {
// 	res.send('test route');
// });

// launch
app.listen(port, function() {
	console.log('Server running on port ' + port);
});
