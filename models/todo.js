var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var todoSchema = new Schema({
    text: {type : String, default : '', trim : true}
  , done: {type : Boolean, default : ''}
  , createdAt: {type : Date, default : Date.now}
})

todoSchema.path('text').validate(function (task) {
  return task.length > 0
}, 'task title cannot be blank')

mongoose.model('todo', todoSchema)
