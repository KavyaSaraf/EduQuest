const express = require('express');
const router = express.Router();

// Sample feedback data (replace with database logic)
let feedbacks = [];

// Submit feedback
router.post('/', (req, res) => {
    const feedback = req.body;
    feedbacks.push(feedback);
    res.status(201).json(feedback);
});

// Get all feedback
router.get('/', (req, res) => {
    res.json(feedbacks);
});

module.exports = router;
