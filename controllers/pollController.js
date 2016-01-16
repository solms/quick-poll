module.exports = function(db) {
	this.viewPolls = function(req, res) {
		res.render('my-polls', {
			polls: []
		});
	};

	// Create a new poll and store it in the database
	this.createPoll = function(req, res) {
		res.render('create-poll', {
			options: ['Option 1']
		});
	};

	// Save the poll
	this.savePoll = function(req, res) {
		console.log(req.params);
		res.redirect('/');
	};
}