const { User, Thought, Reaction } = require('../models');

const thoughtCount = async () => {
  const numberOfThoughts = await Thought.aggregate().count('thoughtCount');
  return numberOfThoughts;
}

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
        headCount: await thoughtCount(),
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get one thought based on id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id' })
      }
      
      res.json({ thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update Thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id' });
      }

      res.json({ message: "Thought deleted" })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create a reaction
  async addReaction(req, res) {
    console.log('Adding Reaction');
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};