// Import the required modules
var express 		= require('express');
var bodyParser		= require('body-parser');
var cookieParser	= require('cookie-parser');
var expressSession	= require('express-session');
var passport		= require('passport');
var passportLocal 	= require('passport-local');
var mongoose 		= require('mongoose');

// Start the app
var app = express();

// Database config file
var db = require('./config/db');

// Connect to the database model
var User = require('./app/models/user');

// Set up the port
var port = process.env.PORT || 3000;

// Connect to the database
mongoose.connect(db.url);

// Parse POST parameters with body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up express-session
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'learnhow2secret',
	resave: false,
	saveUninitialized: false
}));

// Set up cookie-parser
app.use(cookieParser());

// Set up Passport (for user authentication)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal.Strategy(verifyCredentials));
function verifyCredentials(username, password, done) {
	// Test if username and password match something in the DB
	User.findOne({
		username: username,
		password: password
	}, function(err, data) {
		if(err) {
			console.log(err);
		} else {
			if(data == null) { // Combo does not exist
				done(null, null);
			} else { // Match found
				console.log(username + ' has logged in successfully.');
				done(null, {
					id: data._id,
					name: username
				});
			}
		}
	});
};

// Serialize and deserialize for passport
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	// Deserialize the username by matching the id to the _id in the DB
	User.findOne({
		_id: id
	}, function(err, data) {
		if(err) {
			console.log(err);
		} else if (data != null) {
			done(null, {
				id: id,
				name: data.username
			});
		} else {
			console.log('Didnt find a match to deserialize');
		}
	});
});

// Set the static file locations
app.use(express.static(__dirname + '/public'));

// Configure routes
require('./app/routes')(app, passport);

// Start the server on the specified port
app.listen(port, function(){
	console.log('Quick-Poll server is running on port ' + port + '.');
})