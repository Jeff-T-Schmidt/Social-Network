const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  removeThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// router.route('/create').post(createThought);


// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

//   /api/thoughts/:thoughtId/reactions
router
    .route('/api/thoughts/:thoughtId/reactions')
//POST to create a reaction stored in a single thought's reactions array field
    .post()
//DELETE to pull and remove a reaction by the reaction's reactionId value
    .delete();


module.exports = router;
