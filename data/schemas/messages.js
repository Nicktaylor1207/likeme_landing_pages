var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	name: String,
	message: String,
	email: String
});

module.exports = MessageSchema;