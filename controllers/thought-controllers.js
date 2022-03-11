const { Thought, User } = require('../models');

const ThoughtController = {
    getThoughts(req, res) {
        Thought.find({})
.select('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        })
    },
    addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: _id}},
                { new: true, runValidators: true }
            )
        }).then(dbUser => {
            if(!dbUser) {
                res.status(404).json({ message: 'no user found with this id'});
                return;
            }
            res.json(dbUser)
        }).catch(err => res.json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        // .populate({ 
        //     path: 'user',
        //     select: '-__v'
        // })
        .select('-__v')
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({ message: 'no thought found with this id ' });
                return;
            }
            res.json(dbThought)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({ message: 'no thought found with this id' });
                return
            }
            return User.findOneAndUpdate(
                { _id: body.userId },
                { new: true }
            );
        }).then(dbDThought => {
            if(!dbDThought) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbDThought)
        }).catch(err => res.status(400).json(err))
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThought=> {
            if(!dbThought) {
                res.status(404).json({ message: 'no thought found with this id' })
                return;
            }
            res.json(dbThought)
        }).catch(err=> res.status(400).json(err))
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, {$push: {reactions: body } }, {new: true, runValidators: true})
        .then(dbReact => {
            if(!dbReact) {
                res.status(404).json({ message: 'no thought found with this id' })
                return;
            }
            res.json(dbReact)
        }).catch(err => res.status(400).json(err))
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, {$pull: {reactions: { reactionId: params.reactionId}}}, { new: true })
        .then(dbReact => {
            if(!dbReact) {
                res.status(404).json({ message: 'no reaction found with this id' })
                return;
            }
            res.json(dbReact)
        }).catch(err => res.status(400).json(err))
    }
};

module.exports = ThoughtController;