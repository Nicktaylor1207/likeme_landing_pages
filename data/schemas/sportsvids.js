var mongoose = require('mongoose');

var VidSchema = new mongoose.Schema({
	title: String,
	url: String,
	location: String,
	date: { 
		type: String,
		default: (new Date()).getTime()
	}
});

module.exports = VidSchema;