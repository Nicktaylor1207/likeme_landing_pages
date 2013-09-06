var mongoose = require('mongoose');
var IdeaSchema = require('../schemas/ideas');

var Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;