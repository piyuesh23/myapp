var mongoose = require('mongoose')
  , Article = mongoose.model('Article')

exports.index = function (req, res) {
  Article
    .find({ tags: req.param('tag') })
    .sort({'createdAt': -1}) // sort by date
    .exec(function(err, articles) {
      if (err) return res.render('500')
      Article.count({ tags: req.param('tag') }).exec(function (err, count) {
        res.render('articles/index', {
            pagetitle: req.param('tag')
          , articles: articles
        })
      })
    })
}
