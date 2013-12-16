var mongoose = require('mongoose');

var VidSchema = new mongoose.Schema({
	url: String,
	title: String,
	location: String,
	league: String,
	imgthumb: String,
	/* Currently userIDs are user email addresses */
	userIDs: [],
	date: { 
		type: String,
		default: (new Date()).getTime()
	}
});

module.exports = VidSchema;