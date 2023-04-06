const User = require('../models/user');

module.exports = {
  //Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  //delete a user by id
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params.userId })
      .then(() => res.json({ message: 'User deleted' }))
      .catch((err) => res.status(500).json(err));
  },
  
  //update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { username: req.body.username, email: req.body.email },
    )
      .then(() => res.json({ message: 'User updated' }))
      .catch((err) => res.status(500).json(err));
  },
  //add a friend
  addFriend(req, res) {
    return User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'User not found' })
          : res.json('Friend added successfully')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteFriend(req, res) {
    return User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'User not found' })
          : res.json('Friend deleted successfully')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
