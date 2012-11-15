var mongoose = require('mongoose')
  , Comment = mongoose.model('Comment')
  , Article = mongoose.model('Article')

exports.create = function (req, res) {
  var comment = new Comment()
  console.log(req.body.body)
  comment.body = req.body.body
  Article
    .findOne({_id: req.params.id})
    .exec(function(err, article) {
    comment.save(function (err) {
      if (err) throw new Error('Error while saving comment')
      article.comments.push(comment._id)
      article.save(function (err) {
        if (err) throw new Error('Error while saving article')
        res.redirect('/article/'+article.id+'#comments')
      })
    })
  })
}