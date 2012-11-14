
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , mongoStore = require('connect-mongodb')
  , config = require('./config/config.js')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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
app.get('/', articles.index);
app.get('/articles', articles.index);
app.get('/article/add', articles.add)
app.post('/article/create', articles.create)
app.get('/article/:id', articles.show)
app.get('/article/:id/edit', articles.edit)
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
