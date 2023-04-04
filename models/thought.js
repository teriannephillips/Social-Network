// Define Mongoose
const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new mongoose.Schema({
  reactionId: { type: ObjectId, default: ObjectId.new},
  reactionBody: {type: String, required: true, maxlength:280},
  username: {type:String, require:true},
  createdAt: {type: Date, default: Date.now},
});


// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new Schema({
  // Add individual properties and their types
  // Setting required to true will disallow null values
  thoughtText: { type: String, required: true, maxlength: 280 },
  username: { type: String, required:true },
  createdAt: {type: Date, default: Date.now},
  reactions: reactionSchema,
 
});

const Thought = mongoose.model('Thought', thoughtSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);
/* 
// We use the model to create individual documents that have the properties as defined in our schema
Thought.create(
  {
    thoughtText: 'this is my first thought',
    username: 'tphillips',
    
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
); */

module.exports = Thought;
