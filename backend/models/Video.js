const mongoose = require('mongoose');
module.exports = mongoose.model('Video', new mongoose.Schema({
  title: String,
  url: String
}));