module.exports = function(app, passport) {
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
};