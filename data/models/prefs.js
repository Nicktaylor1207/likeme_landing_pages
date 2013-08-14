var mongoose = require('mongoose');
var PrefSchema = require('../schemas/prefs');

var Pref = mongoose.model('Pref', PrefSchema);

module.exports = Pref;