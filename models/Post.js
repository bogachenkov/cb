const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String
    }
  ],
  publish_date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
      },
      text: {
        type: String,
        required: true
      },
      publish_date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Post = mongoose.model('Post', PostSchema);
