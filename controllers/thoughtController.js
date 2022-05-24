const res = require('express/lib/response');
const { Thought, User } = require('../models');


module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: thought._id } },

            { new: true }
          );
        })
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              })
            : res.json('Created the thought 🎉')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // createThought(req, res) {
    //   Thought.create(req.body)
    //   .then((thought) =>
    //   !thought  
    //     ?res.status(404).json({msg: "No user with that Id"})
    //     :User.findByIdAndUpdate(
    //       {_id: req.params.userId },
    //       {$addToSet: {
    //         thoughts: thought._id
    //       }},
    //       {new:true}
    //     )
    //     )
    //     .then((thought) => 
    //     !thought
    //     ? res.status(404).json({
    //       msg: "No user with that ID"
    //     })
    //     :res.json({
    //       msg: "Thought created"
    //     }),
    //     )
    // },
    // Update a thought by its _id
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove a thought by its _id
    removeThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { responseId: req.params.responseId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
      console.log('You are adding a reaction');
      console.log(req.body);
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  