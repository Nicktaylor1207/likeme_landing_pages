var mongoose = require('mongoose');

var EmailSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
	  type: String
	},
	notebook: {
		photos: []
	}
});

module.exports = EmailSchema;