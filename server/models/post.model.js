const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  caption: {
      type: String
  },

  image: {
      type: String
  },

  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post