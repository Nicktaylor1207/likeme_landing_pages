var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	userName: String,
	vids: [],
	fbUserID: String
});

module.exports = UserSchema;