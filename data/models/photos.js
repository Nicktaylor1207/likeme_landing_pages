var mongoose = require('mongoose');
var PhotoSchema = require('../schemas/photos');

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;