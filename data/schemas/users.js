var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	userName: String,
	vids: [],
	fbUserID: String,
	date: { 
		type: String,
		default: (new Date()).getTime()
	}
});

module.exports = UserSchema;