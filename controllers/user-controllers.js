const { User } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
            }
            res.json(dbUser)
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(400).json(err))
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({ message: 'no user found with this id' });
                return;
            }
            res.json(dbUser)
        }).catch(err => res.status(400).json(err))
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({ message: 'no user found with this id ' });
                return;
            }
            res.json(dbUser)
        }).catch(err => res.status(400).json(err))
    }
};

module.exports = userController;