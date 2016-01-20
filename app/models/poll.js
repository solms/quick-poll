// Connect to the mongoose module
var mongoose = require('mongoose');

var d 			= new Date();
var datestamp 	= d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

// Define the poll data model
module.exports = mongoose.model('Poll', {
	user	: { type: String, default: '' },
	question: { type: String, default: '' },
	options	: [String],
	votes	: [Number],
	created	: { type: String, default: datestamp },
	voted	: [String]
});