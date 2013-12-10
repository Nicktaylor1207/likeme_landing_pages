var mongoose = require('mongoose');

var VidSchema = new mongoose.Schema({
	url: String,
	title: String,
	location: String,
	imgthumb: String,
	date: { 
		type: String,
		default: (new Date()).getTime()
	}
});

module.exports = VidSchema;