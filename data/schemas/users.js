var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String,
	userName: String,
	vids: [],
	fbUserID: String
});

module.exports = UserSchema;