const posts = require('../models/post.model');
const jwt = require('jsonwebtoken');

module.exports = {
  getAll: function (req, res) {
    posts.find({})
      .populate('user')
      .then(result => {
        res.status(200).json({
          data: result
        })
      })
  },
  getOne: function (req, res) {
    posts.findById(req.params.id)
      .populate('user')
      .then(result => {
        res.status(200).json({
          data: result
        })
      })
  },
  getByUser: function (req, res) {
    posts.find({ user: req.params.id })
    .populate('user')
      .then(result => {
        res.status(200).json({
          data: result
        })
      })
  },
  createPost: function (req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      let newPost = new posts({
        user: decoded.id,
        caption: req.body.caption,
        image: req.body.image
      })

      newPost.save((err, result) => {
        if(err) {
          console.log(err);
        } else {
          res.status(201).json({
            message: 'successfully added a new post !',
            data: result
          })
        }
      })
    })
  },
  // editArticle: function (req, res) {
  //   posts.findByIdAndUpdate({ _id: req.params.id }, {
  //     title: req.body.title,
  //     content: req.body.content
  //   })
  //   .then(update => {
  //     res.status(200).json({
  //       message: `berhasil mengubah data`,
  //       data: update
  //     })
  //   })
  // },
  deletePost: function (req, res) {
    posts.findByIdAndRemove({ _id: req.params.id })
    .then(deleted => {
      res.status(200).json({
        message: `berhasil menghapus data`,
        data: deleted
      })
    })
  }
}