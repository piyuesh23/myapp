var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var getTag = function (tags) {
  return tags.join(' ')
}

var setTag = function (tags) {
  return tags.split(' ')
}

var todoSchema = new Schema({
    task: {type : String, default : '', trim : true}
  , description: {type : String, default : '', trim : true}
  , tags: {type : [], get: getTag, set: setTag}
  , createdAt: {type : Date, default : Date.now}
})

todoSchema.path('task').validate(function (task) {
  return task.length > 0
}, 'task title cannot be blank')

mongoose.model('todo', todoSchema)