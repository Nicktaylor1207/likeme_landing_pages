var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
	name: String,
	idea: String
});

module.exports = IdeaSchema;