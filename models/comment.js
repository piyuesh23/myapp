// comment schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var CommentSchema = new Schema({
    body: {type : String, default : ''}
  , createdAt: {type : Date, default : Date.now}
})

mongoose.model('Comment', CommentSchema)
