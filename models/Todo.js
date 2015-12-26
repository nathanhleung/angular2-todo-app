var mongoose = require('mongoose');
// Create a schema for the Todo object
var todoSchema = new mongoose.Schema({
  text: String
});
// Expose the model so that it can be imported and used in the controller
module.exports = mongoose.model('Todo', todoSchema);
