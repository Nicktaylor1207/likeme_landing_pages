var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	subject: String,
	message: String
});

module.exports = MessageSchema;