var Todo = require('../models/Todo'); // Import the Todo model so we can query the DB

var mainController = {
  getIndex: function(req, res) {
    res.render('index'); // Compiles the file named "index" in the views directory (`/views`) using the view engine (Jade).
  },
  // This gets all Todos in the collection and sends it back in JSON format
  getAllTodos: function(req, res) {
    Todo.find({}, function(err, todos) {
      if (err) {
        // Send the error to the client if there is one
        return res.send(err);
      }
      // Send todos in JSON format
      res.json(todos);
    });
  },
  postNewTodo: function(req, res) {
    // This creates a new todo using POSTed data (in req.body)
    Todo.create({
      text: req.body.text,
      done: false
    }, function(err, todo) {
      if (err) {
        return res.send(err);
      }
      Todo.find({}, function(err, todos) {
        if (err) {
          return res.send(err);
        }
        // Send list of all todos after new one has been created and saved
        res.json(todos);
      });
    });
  },
  deleteTodo: function(req, res) {
    Todo.remove({
      _id: req.params.id
    }, function(err, todo) {
      if (err) {
        return res.send(err);
      }
      Todo.find({}, function(err, todos) {
        if (err) {
          return res.send(err);
        }
        res.json(todos);
      });
    });
  }
}

module.exports = mainController;
