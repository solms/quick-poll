// Connect to the path middleware
var path = require('path');

// Connect to the data model
var Poll = require('./models/poll');
var User = require('./models/user');

module.exports = function(app, passport) {
	// Check for authentication
	app.get('/api/auth', function(req, res) {
		res.json({
			authenticated: 	req.isAuthenticated(),
			active_user: 	req.user
		});
	});

	// Get active (logged in) user
	app.get('/api/get-active-user', function(req, res) {
		if(req.isAuthenticated()){
			res.json({
				active_user: req.user.name
			});
		} else {
			res.status(401);
		}
	})

	// Try to create new user
	app.post('/api/create-user', function(req, res) {
		var new_user = new User({
			username: req.body.username,
			password: req.body.password
		});
		// Determine if username is taken
		User.findOne({ username: new_user.username }, function(err, data) {
			if(data == null) { // Username available
				new_user.save(function(err) {
					if(err) {
						console.log(err);
					} else { // Username taken
						console.log(new_user.username + ' has been added to the database.');
						res.send({ status: 200 }); // Send success
					};
				});
			} else {
				console.log('The username is taken.');
			}
		});
	});

	// Try to log in
	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.status(200).send('/'); // Successfully logged in
	});

	// Log out
	app.get('/logout', function(req, res) {
		if(req.isAuthenticated()) {
			req.logout();
		}
		res.redirect('/')

	})

	// Add a new poll to the database
	app.post('/api/submit-poll', ensureAuthenticated, function(req, res) {
		var new_poll = new Poll({
			user 	: req.user.id,
			question: req.body.question,
			options : req.body.options,
			votes	: new Array(req.body.options.length).fill(0)
		});
		new_poll.save(function(err) {
			if(err) {
				res.status(500);
			} 
			res.status(200).send('/');
		});
	});

	// Delete poll from database
	app.post('/api/delete-poll', ensureAuthenticated, function(req, res) {
		Poll.remove({
			question: 	req.body.question,
			user: 		req.user.id
		}, function(err, removed) {
			if(err) {
				console.log(err);
				res.status(501);
			} else {
				res.status(200);
			}
		});
	})

	// Get current user's created polls
	app.get('/api/get-polls', ensureAuthenticated, function(req, res) {
		console.log('Trying to find polls for user ' + req.user.id);
		Poll.find({
			user: req.user.id
		}, function(err, polls) {
			if(err) {
				console.log(err);
				res.status(500);
			}
			res.json(polls).status(200);
		});
	});

	// Front-end route
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/views/index.html'));
	});
};

// Create our own middleware to check that user is authenticated
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(403);
	}
};