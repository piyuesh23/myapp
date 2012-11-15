
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , mongoStore = require('connect-mongodb')
  , config = require('./config/config.js')
  , async = require('async')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(function (req, res, next) {
    res.locals.appName = 'Nodejs Express Mongoose Demo'
    res.locals.title = 'Nodejs Express Mongoose Demo'
    res.locals.showStack = app.showStackError
    res.locals.req = req
    res.locals.formatDate = function (date) {
      var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ]
      return monthNames[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()
    }
    res.locals.stripScript = function (str) {
      return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    }
    res.locals.createPagination = function (pages, page) {
      var url = require('url')
        , qs = require('querystring')
        , params = qs.parse(url.parse(req.url).query)
        , str = ''

      params.page = 0
      var clas = page == 0 ? "active" : "no"
      str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">First</a></li>'
      for (var p = 1; p < pages; p++) {
        params.page = p
        clas = page == p ? "active" : "no"
        str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">'+ p +'</a></li>'
      }
      params.page = --p
      clas = page == params.page ? "active" : "no"
      str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">Last</a></li>'

      return str
    }

    next()
  })

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'models')));
  app.use(express.static(path.join(__dirname, 'controllers')));
});

app.use(express.session({
  secret: 'noobjs',
  store: new mongoStore({
    url: config.db,
    collection : 'sessions'
  })
})) 

// Bootstrap models
var models_path = __dirname + '/models'
  , model_files = fs.readdirSync(models_path)
model_files.forEach(function (file) {
  require(models_path+'/'+file)
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

// Bootstrap db connection
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Article = mongoose.model('Article')
mongoose.connect(config.db)
var articles = require('./controllers/articles.js')
var comments = require('./controllers/comments.js')

app.get('/article/add', articles.add)
app.post('/article/create', articles.create)
app.get('/article/:id', articles.show)
app.get('/article/:id/edit', articles.edit)
app.del('/articles/:id', articles.destroy)
app.post('/articles/:id/comments', comments.create)

app.get('/', articles.index);
app.get('/articles', articles.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
