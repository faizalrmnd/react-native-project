const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
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

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment