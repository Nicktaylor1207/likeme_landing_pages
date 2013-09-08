var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
	url: String,
	source: String,
	liked: {
		type: Number,
		default: 0
	}
});

module.exports = PhotoSchema;