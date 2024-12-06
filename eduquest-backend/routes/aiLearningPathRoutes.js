const express = require('express');
const router = express.Router();

// Sample AI learning path data (replace with database logic)
let aiLearningPaths = [];

// Create a new AI learning path
router.post('/', (req, res) => {
    const aiLearningPath = req.body;
    aiLearningPaths.push(aiLearningPath);
    res.status(201).json(aiLearningPath);
});

// Get all AI learning paths
router.get('/', (req, res) => {
    res.json(aiLearningPaths);
});

module.exports = router;
