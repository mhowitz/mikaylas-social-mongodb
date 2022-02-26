const { Thought, User } = require('../models');

const ThoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        // .populate({
        //     path: 'user',
        //     select: '-__v'
        // }).select('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        })
    },
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $push: { thoughts: _id }},
                { new: true }
            )
        }).then(dbUser => {
            if(!dbUser) {
                res.status(404).json({ message: 'no user found with this id'});
                return;
            }
            res.json(dbUser)
        }).catch(err => res.json(err));
    }
};

module.exports = ThoughtController;