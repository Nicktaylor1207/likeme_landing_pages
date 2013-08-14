var mongoose = require('mongoose');

var PrefSchema = new mongoose.Schema({
	design: Boolean,
	market: Boolean,
	vendors: Boolean,
	connect: Boolean,
	pref_user_email: String
});

module.exports = PrefSchema;