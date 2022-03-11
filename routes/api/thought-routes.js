const router = require('express').Router();

const {
    getThoughts,
    addThought,
    getThoughtById, 
    updateThought, 
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

router.route('/').get(getThoughts).post(addThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;