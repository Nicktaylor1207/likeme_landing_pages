var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
	url: String,
	source: String
});

module.exports = PhotoSchema;