// Define Mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
  // Add individual properties and their types
  // Setting required to true will disallow null values
  username: { type: String, required: true, unique: true, trim:true },
  email: { type: String, required:true, unique:true },
  thoughts: [
    {
      type:Schema.Types.ObjectId,
      ref: 'thought',
    },
  ],
  friends: [
    {
      type:Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
}
,
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema
  .virtual('friendCount')
  .get(function () {
    return `${this.friends.length}`;
  });

const User = mongoose.model('User', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

/* // We use the model to create individual documents that have the properties as defined in our schema
User.create(
  {
    username: 'tphillips',
    email: 'phillips.terianne@gmail.com',
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
); */

module.exports = User;
