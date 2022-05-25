const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


//GET a single user by its _id and populated thought and friend data
// router.route('/:userId/reactions').post(addVideoResponse);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  // POST to add a new friend to a user's friend list
  .post(addFriend)
  // DELETE to remove a friend from a user's friend list
  .delete(removeFriend);
  
module.exports = router;


