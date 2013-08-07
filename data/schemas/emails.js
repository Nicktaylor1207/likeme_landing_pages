var mongoose = require('mongoose');

var EmailSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	}
});

module.exports = EmailSchema;