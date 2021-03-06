var mongoose = require('mongoose');

var EmailSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	password: {
	  type: String,
	  required: true
	},
	notebooks: [],
	photos: [],
	pro: Boolean,
	title: String,
	website: String,
	description: String,
	profilePic: String,
	number: String,
	address: String
});

module.exports = EmailSchema;