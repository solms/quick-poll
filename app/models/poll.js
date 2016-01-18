// Connect to the mongoose module
var mongoose = require('mongoose');

// Define the poll data model
module.exports = mongoose.model('Poll', {
	user	: { type: String, default: '' },
	question: { type: String, default: '' },
	options	: []
});