var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Story', StorySchema);
