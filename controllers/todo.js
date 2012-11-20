var mongoose = require('mongoose')
    , Todo = mongoose.model('todo')

exports.index = function(req, res) {
  Todo
    .find({})
    .exec(function(err, todos){
      console.log(todos);
      res.render('todos/index', {
        pagetitle: 'Todos',
        todos: todos
      });
    })
}

exports.add = function(req, res) {
  var todo = new Todo()
  todo.isNew = true
  res.render('todos/edit', {
    todo: todo
  })
}

exports.create = function(req, res) {
  var todo = new Todo()
  todo.task = req.body.task
  todo.tags = req.body.tags

  todo.save(function(err){
    if(err) {
      todo.isNew = true
      res.render('todos/edit',{
        todo: todo
      })
    }
    else
      res.redirect('/todo/'+todo._id)
  })
}

exports.show = function(req, res) {
  Todo
    .findOne({_id: req.params.id})
    .exec(function(err, todo) {
    res.render('todos/show', {
      pagetitle: todo.task,
      todo: todo
    })
  })
}