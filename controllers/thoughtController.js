const { receiveMessageOnPort } = require("worker_threads");
const { User, Thought, Reaction } = require("../models");

module.exports = {
  //Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { username: thought.username },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        ).then((user) => {
          if (!user) {
            Thought.deleteOne({ _id: thought._id });
            res.status(404).json({ message: "No user found with that ID :(" });
          } else {
            res.json(thought);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: thought._id } },
          { runValidators: true, new: true }
        ).then((user) => {
          if (!user) {
            Thought.deleteOne({ _id: thought._id });
            res.status(404).json({ message: "No user found with that ID :(" });
          } else {
            res.json(thought);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Add a Reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought ? res.status(404).json({ message: " :(" }) : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete Reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
