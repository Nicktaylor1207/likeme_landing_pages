var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	text: String,
	user: String,
	firstName: String,
	lastName: String,
	photoUrl: String,
	date: { 
		type: String, 
		default: (new Date()).getTime()
	}
});

module.exports = CommentSchema;