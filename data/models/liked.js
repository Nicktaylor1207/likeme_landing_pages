var mongoose = require('mongoose');
var LikedSchema = require('../schemas/liked');

var Liked = mongoose.model('Liked', LikedSchema);

module.exports = Liked;