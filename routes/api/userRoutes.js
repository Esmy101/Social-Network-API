const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
//router.route("/:userId/friends")

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(removeFriend).post(addFriend);

module.exports = router;
