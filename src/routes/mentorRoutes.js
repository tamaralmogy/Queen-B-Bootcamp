const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

// Route to get mentors with optional search query
router.get('/', mentorController.getMentors);

module.exports = router;
