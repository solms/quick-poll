// Connect to the mongoose module
var mongoose = require('mongoose');

// Define the user data model
module.exports = mongoose.model('User', {
	username: { type: String, default: '' },
	password: { type: String, default: '' }
});