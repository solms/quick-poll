module.exports = function(app, passport, db) {
	var UserController = require(process.cwd() + '/controllers/userController.js');
	var userController = new UserController(db);

	var PollController = require(process.cwd() + '/controllers/pollController.js');
	var pollController = new PollController(db);

	app.get('/', function(req, res) {
		res.render('index', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	});

	app.get('/login', function(req, res) {
		res.render('login');
	});
	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.redirect('/');
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/signup', function(req, res) {
		res.render('signup');
	});
	app.post('/signup', userController.signUp);

	app.get('/my-polls', ensureAuthenticated, pollController.viewPolls);

	app.get('/create-poll', ensureAuthenticated, pollController.createPoll);
	app.post('/create-poll', ensureAuthenticated, pollController.savePoll);
};

// Check to see if the user is logged in
var ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(403);
	}
};