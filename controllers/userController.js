const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const userCount = async () => {
  const numberOfUsers = await User.aggregate().count('userCount');
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await userCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get one user based on id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
      
      if (!user) {
        return res.status(404).json({message: 'No user with this id'})
      }

      res.json({user});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.id });
      
      if (!user) {
        return res.status(404).json({ message: 'No user with this id' });
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.id },
        { $pull: { users: req.parmas.id } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User delete, but no thoughts found',
        })
      }

      res.json({message: 'User successfully deleted'})
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create a friend
  async addFriend(req, res) {
    console.log('Adding a friend to user');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friend: { _id: req.params.id } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}