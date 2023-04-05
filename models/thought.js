const { Schema, model } = require('mongoose');
const { ObjectId } = require('bson');

const reactionSchema = new Schema({
  reactionId: { type: ObjectId, default: ObjectId.new },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
}
);

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reactions: [reactionSchema],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  });
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
