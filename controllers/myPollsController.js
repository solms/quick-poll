module.exports = function(db) {
	this.viewPolls = function(req, res) {
		res.render('my-polls');
	};
}