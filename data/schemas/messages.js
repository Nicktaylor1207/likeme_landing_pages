var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	name: String,
	idea: String,
	email: String
});

module.exports = MessageSchema;