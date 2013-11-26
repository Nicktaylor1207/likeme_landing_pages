var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
	url: String,
	source: String,
	liked: {
		type: Number,
		default: 0
	},
	userg: String,
	position: Number,
	type: [],
	style: [],
	diy: Boolean,
	used: Boolean,
	date: { 
		type: String, 
		default: (new Date()).getTime()
	},
	comments: [],
	notebooks: [],
	photos: []
});

module.exports = PhotoSchema;