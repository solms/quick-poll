module.exports = function(db) {
	var users = db.collection('users');

	this.signUp = function(req, res) {
		var user = {
			username: req.body.username,
			password: req.body.password
		};
		users.find({ username: user.username })
			.toArray(function(err, doc_arr) {
				if(err) {
					console.log('ERROR!');
					console.log(err);
				} else { // Check if the username exists
					if(doc_arr.length == 0){ // The username is free
						users.update(user, user, { upsert: true });
						res.redirect('/');
					} else { // The username is taken
						console.log('Username taken.');
						res.redirect('/signup');
					}
				}
		});
	};
};