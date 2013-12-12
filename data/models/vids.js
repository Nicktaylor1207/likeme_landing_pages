var mongoose = require('mongoose');
var VidSchema = require('../schemas/vids');

var Vid = mongoose.model('Vid', VidSchema);

module.exports = Vid;