var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
	url: String,
	source: String,
	liked: {
		type: Number,
		default: 0
	},
	userg: {
		type: Boolean,
		default: false
	},
	tag: String,
	position: Number
});

module.exports = PhotoSchema;