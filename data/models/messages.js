var mongoose = require('mongoose');
var MessageSchema = require('../schemas/messages');

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;