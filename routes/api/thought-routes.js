const router = require('express').Router();

const {
    getThoughts,
    addThought
} = require('../../controllers/thought-controllers');

router.route('/:userId').post(addThought);
// router.route('/:id').post(addThought);
module.exports = router;