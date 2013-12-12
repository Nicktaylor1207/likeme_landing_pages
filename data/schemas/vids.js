var mongoose = require('mongoose');

var VidSchema = new mongoose.Schema({
	url: String,
	title: String,
	location: String,
	league: String,
	imgthumb: String,
	userIDs: [],
	date: { 
		type: String,
		default: (new Date()).getTime()
	}
});

module.exports = VidSchema;