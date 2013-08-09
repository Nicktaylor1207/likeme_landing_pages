var mongoose = require('mongoose');

var LikedSchema = new mongoose.Schema({
	image: String
});

module.exports = LikedSchema;