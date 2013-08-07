var mongoose = require('mongoose');
var EmailSchema = require('../schemas/emails');

var Email = mongoose.model('Email', EmailSchema);

module.exports = Email;