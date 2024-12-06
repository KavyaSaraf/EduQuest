const express = require('express');
const router = express.Router();

// Sample AI tutor data (replace with database logic)
let aiTutors = [];

// Create a new AI tutor session
router.post('/', (req, res) => {
    const aiTutor = req.body;
    aiTutors.push(aiTutor);
    res.status(201).json(aiTutor);
});

// Get all AI tutor sessions
router.get('/', (req, res) => {
    res.json(aiTutors);
});

module.exports = router;
