import mongoose from 'mongoose';
// Create a schema for the Todo object
let todoSchema = new mongoose.Schema({
  text: String
});
// Expose the model so that it can be imported and used in the controller
export default mongoose.model('Todo', todoSchema);
