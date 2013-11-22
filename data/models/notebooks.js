var mongoose = require('mongoose');
var NotebookSchema = require('../schemas/notebooks');

var Notebook = mongoose.model('Notebook', NotebookSchema);

module.exports = Notebook;