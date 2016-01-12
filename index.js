// Import the required modules
var express 		= require('express');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var expressSession 	= require('express-session');
var passport 		= require('passport');
var passportLocal 	= require('passport-local');
var mongo			= require('mongodb').MongoClient;

// Connect to the database
var db_addr = 'mongodb://localhost:27017/quick-poll';
mongo.connect(db_addr, function(err, db) {
	// Check for successful connection
	if(err){
		console.log('ERROR: Could not connect to the database at ' + db_addr);
	} else {
		console.log('Successfully connected to the database at ' + db_addr);

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
			});
		};

		// Serialize and deserialize for passport
		passport.serializeUser(function(user, done) {
			done(null, user.id);
		});
		passport.deserializeUser(function(id, done) {
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
				});
		});

		// Set up the routes
		app.use(express.static(__dirname + '/stylesheets'));
		var routes = require('./routes.js');
		routes(app, passport, db);

		// Set the port
		var port = process.env.PORT || 3000;
		app.listen(port, function() {
			console.log('Quick Poll server started on port ' + port + '.');
		});
	}
});