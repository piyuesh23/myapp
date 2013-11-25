var mongoose = require('mongoose')
    , Todo = mongoose.model('todo')

exports.index = function(req, res) {
  return res.render('todos/index', {
    pagetitle: '',
    todos: ''
  });
}

exports.create = function(req, res) {
  var todo;
  todo = new Todo({
    text: req.body.text,
    done: req.body.done,
  });
  todo.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(todo);
}

exports.list = function(req, res) {
  return Todo.find(function(err, todos) {
    return res.send(todos);
  });
}

exports.delete = function(req, res) {
  return Todo.findById(req.params.id, function(err, todo) {
    return todo.remove(function(err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      }
    });
  });
}

exports.show = function(req, res) {
  return Todo.findById(req.params.id, function(err, todo) {
    if (!err) {
      return res.send(todo);
    }
  });
}

exports.update = function(req, res) {
  console.log(req);
  return Todo.findById(req.params.id, function(err, todo) {
    todo.text = req.body.text;
    todo.done = req.body.done;
    return todo.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(todo);
    });
  });
}
