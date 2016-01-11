// Import the required modules
var express 		= require('express');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var expressSession 	= require('express-session');
var passport 		= require('passport');
var passportLocal 	= require('passport-local');

// Start the app
var app = express();
app.set('view engine', 'ejs');

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'learnhow2secret',
	resave: false,
	saveUninitialized: false
}));

// Set up Passport (for user authentication)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal.Strategy(verifyCredentials));
function verifyCredentials(username, password, done) {
	// TODO: Read from DB!
	if (username === password){
		// No errors, data == authenticated
		done(null, {
			id: username,
			name: username
		});
	} else {
		// No errors, no data == Not authenticated
		done(null, null);
	}
};

// Serialize and deserialize for passport
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	// TODO: Query the DB to get user details
	done(null, {
		id: id,
		name: id
	});
});

// Set up the routes
var routes = require('./routes.js');
routes(app, passport);

// Set the port
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Quick Poll server started on port ' + port + '.');
});