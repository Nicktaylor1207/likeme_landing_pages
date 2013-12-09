var mongoose = require('mongoose');
var VidSchema = require('../schemas/sportsvids');

var Vid = mongoose.model('Vid', VidSchema);

module.exports = Vid;