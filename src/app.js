/**
 * Import dependencies
 */
import express from 'express';
import logger from 'morgan'; // Logs each server request to the console
import bodyParser from 'body-parser'; // Takes information from POST requests and puts it into an object
import methodOverride from 'method-override'; // Allows for PUT and DELETE methods to be used in browsers where they are not supported
import mongoose from 'mongoose'; // Wrapper for interacting with MongoDB
import path from 'path'; // File path utilities to make sure we're using the right type of slash (/ vs \)
import http from 'http'; // To make the periodic DB clean requests

/**
 * Import controllers
 */
import mainController from './controllers/main';

/**
 * Configure database
 */
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/todoDB'); // Connects to your MongoDB.  Make sure mongod is running!
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Configure app
 */
let app = express(); // Creates an Express app
app.set('port', process.env.PORT || 3000); // Set port to 3000 or the provided PORT variable
app.set('views', path.join(__dirname, '..', 'views')); // Set our views directory to be `/views` (in the app root, which is one level above)
app.set('view engine', 'jade'); // Set our view engine to be Jade (so when we render these views, they are compiled with the Jade compiler)
app.use(express.static(path.join(__dirname, '..', 'public'))); // Set the static files directory - /public will be / on the frontend
app.use(logger('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON data and put it into an object which we can access
app.use(methodOverride()); // Allow PUT/DELETE

/**
 * Configure routes
 */
app.get('/', mainController.getIndex);
app.get('/templates/:template', mainController.getTemplate);
app.get('/todos', mainController.getAllTodos);
app.post('/todos', mainController.postNewTodo);
app.delete('/todos', mainController.deleteAllTodos);
app.delete('/todos/:id', mainController.deleteTodo);

/**
 * Periodically clean database (every ten minutes, for Heroku demo)
 */
setInterval(() => {
  let req = http.request({
    hostname: "localhost",
    port: app.get('port'),
    path: '/todos',
    method: 'DELETE'
  }, (res) => {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response body: ' + chunk);
    });
    res.on('end', function() {
      console.log('Response end.')
    });
  });
  req.on('error', function(e) {
    console.log('Error with request: ' + e.message);
  });
  req.end();
}, 1000 * 60 * 10);

/**
 * Start app
 */
app.listen(app.get('port'), function() {
  console.log(`App listening on port ${app.get('port')}!`);
});
