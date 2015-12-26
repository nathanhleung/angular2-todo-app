/**
 * Import dependencies
 */
var express = require('express');
var logger = require('morgan'); // Logs each server request to the console
var bodyParser = require('body-parser'); // Takes information from POST requests and puts it into an object
var methodOverride = require('method-override'); // Allows for PUT and DELETE methods to be used in browsers where they are not supported
var mongoose = require('mongoose'); // Wrapper for interacting with MongoDB
var path = require('path'); // File path utilities to make sure we're using the right type of slash (/ vs \)

/**
 * Import controllers
 */
var mainController = require('./controllers/main');

/**
 * Configure database
 */
mongoose.connect('mongodb://localhost:27017/todoDB'); // Connects to your MongoDB.  Make sure mongod is running!

/**
 * Configure app
 */
var app = express(); // Creates an Express app
app.set('port', process.env.PORT || 3000); // Set port to 3000 or the provided PORT variable
app.set('views', path.join(__dirname, 'views')); // Set our views directory to be `/views`
app.set('view engine', 'jade'); // Set our view engine to be Jade (so when we render these views, they are compiled with the Jade compiler)
app.use(express.static(path.join(__dirname, 'public'))); // Set the static files directory - /public will be / on the frontend
app.use('/vendor', express.static(path.join(__dirname, 'bower_components'))); // Map the /bower_components directory to /vendor - /bower_components/bootstrap will be /vendor/bootstrap on the frontend
app.use(logger('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON data and put it into an object which we can access
app.use(methodOverride()); // Allow PUT/DELETE

/**
 * Configure routes
 */
app.get('/', mainController.getIndex);
app.get('/todos', mainController.getAllTodos);
app.post('/todos', mainController.postNewTodo);
app.delete('/todos/:id', mainController.deleteTodo);

/**
 * Start app
 */
app.listen(app.get('port'), function() {
  console.log('App listening on port ' + app.get('port') + '!');
});
