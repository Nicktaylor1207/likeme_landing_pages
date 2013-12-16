var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	email: String,
	message: String
});

module.exports = MessageSchema;