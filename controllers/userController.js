const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getOneUser(req, res) {
        User.findById(req.params.id)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend(req, res) {
        User.findByIdAndUpdate(
          req.params.userId,
          { $push: { friends: req.params.friendId }},
          { new: true, runValidators: true }
        )
        .then(user => {
          if (!user) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(user);
        })
        .catch(err => res.status(500).json(err));
      },
    
      deleteFriend(req, res) {
        User.findByIdAndUpdate(
          req.params.userId,
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
        .then(user => {
          if (!user) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(user);
        })
        .catch(err => res.status(500).json(err));
      },
    };
    
    module.exports = userController;