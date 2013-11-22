var mongoose = require('mongoose');

var NotebookSchema = new mongoose.Schema({
	name: String,
	photoArray: [],
	user: String,
	date: { 
		type: String, 
		default: (new Date()).getTime()
	}
});

module.exports = NotebookSchema;