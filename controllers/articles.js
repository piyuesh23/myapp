var mongoose = require('mongoose'),
    Article = mongoose.model('Article')

// Article edit page
exports.add = function (req, res) {
  var article = new Article()
  article.isNew = true
  res.render('articles/add', {
      title: 'New Article',
      pagetitle: '',
      article: article,
  })
}

//Create an Article
exports.create = function(req, res) {
  var article = new Article()

  article.isNew = true
  article.title = req.body.title
  article.body = req.body.body
  article.tags = req.body.tags

  article.save(function(err){
    if(err) {
      res.render('articles/add', {
          title: 'New Article',
          pagetitle: '',
          article: article,
      })
    }
    else {
      res.redirect('/article/' + article._id)
    }
  })
}

// View an article
exports.show = function(req, res){
  var article = new Article();
  Article
    .findOne({_id: req.params.id})
    .populate('comments')
    .exec(function(err, article) {
    res.render('articles/show', {
      pagetitle: article.title,
      article: article
    })
  })
}

// Article index page
exports.index = function(req, res) {
  Article
    .find({})
    .limit(10)
    .exec(function(err, Articles){
      if (err) return res.render('500')
      Article.count().exec(function (err, count) {
        res.render('articles/index', {
          pagetitle: '',
          articles: Articles
        })
      })
    })
}

// Article edit page
exports.edit = function(req, res) {
  Article
    .findOne({_id: req.params.id})
    .exec(function(err, article) {
      res.render('articles/add', {
          title: 'New Article',
          pagetitle: '',
          article: article,
      })
  })
}

//Article delete page
exports.destroy = function(req, res) {
  Article
    .findOne({_id: req.params.id})
    .exec(function(err, article) {
    article.remove(function(err){
      res.redirect('/articles')
    })
  })
}