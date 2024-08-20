const express = require('express');
const { getNotes } = require('../controllers/noteController');

const router = express.Router();

// * Routes for notes
router.route('/').get(getNotes)
router.route('/create').post()
router.route('/:id').get().put().delete()


module.exports = router;
