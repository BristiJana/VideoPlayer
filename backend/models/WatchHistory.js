const mongoose = require('mongoose');
module.exports = mongoose.model('WatchHistory', new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  videoId: mongoose.Schema.Types.ObjectId,
  watchTime: Number
}));