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
	if(username === password) {
		done(null, {
			id: username,
			name: username
		})
	} else {
		done(null, null);
	}
	/*
	// Check if username and password match document in the DB
	db.collection('users').find({
		username: username,
		password: password
	}).toArray(function(err, data) {
		if(err) {
			console.log('ERROR!');
			console.log(err);
		} else {
			if(data.length == 0){
				console.log('Username and password do not match a document.');
				done(null, null);
			} else {
				console.log(data);
				done(null, {
					id: data[0]._id,
					name: data[0].username
				})
			}
		}
	});*/
};

// Serialize and deserialize for passport
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	done(null, {
		id: id,
		name: id
	});


	/*
	// This is VERY inefficient!
	// TODO: Make find({ _id: id }) work
	db.collection('users').find({})
		.toArray(function(err, data) {
			for(var i=0; i<data.length; i++){
				if(data[i]._id == id){
					done(null, {
						id: id,
						name: data[i].username
					});
				}
			}
		}); */
});

// Set the static file locations
app.use(express.static(__dirname + '/public'));

// Configure routes
require('./app/routes')(app, passport);

// Start the server on the specified port
app.listen(port, function(){
	console.log('Quick-Poll server is running on port ' + port + '.');
})