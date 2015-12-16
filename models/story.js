var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  image: String,
  user_id: {type: String, ref: 'User'}
});


module.exports = mongoose.model('Story', StorySchema);