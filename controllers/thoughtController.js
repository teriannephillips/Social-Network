const { Thought, User } = require('../models');

module.exports = {
  //Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete single thought by id
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then(() => {
        return User.findOneAndUpdate(
          { thoughtId: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
        )
      })
      .then(() => res.json({ message: 'Thought deleted' }))
      .catch((err) => res.status(500).json(err));

  },
  //update single thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText },
    )
      .then(() => res.json({ message: 'Thought updated' }))
      .catch((err) => res.status(500).json(err));

  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //add a reaction to a thought by id
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } } },
    )
      .then(() => res.json({ message: 'Reaction added' }))
      .catch((err) => res.status(500).json(err));

  },
  //delete a reaction to a thought by id using reaction id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.body.reactionId } } },
    )
      .then(() => res.json({ message: 'Reaction deleted' }))
      .catch((err) => res.status(500).json(err));

  },
};
