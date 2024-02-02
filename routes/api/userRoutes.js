const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getOneUser)
    .put(updateUser);

router.route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;