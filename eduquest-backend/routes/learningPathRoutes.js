const express = require('express');
const router = express.Router();

// Sample learning path data (replace with database logic)
let learningPaths = [];

// Create a new learning path
router.post('/', (req, res) => {
    const learningPath = req.body;
    learningPaths.push(learningPath);
    res.status(201).json(learningPath);
});

// Get all learning paths
router.get('/', (req, res) => {
    res.json(learningPaths);
});

// Get a learning path by ID
router.get('/:id', (req, res) => {
    const learningPath = learningPaths.find(lp => lp.id === req.params.id);
    if (learningPath) {
        res.json(learningPath);
    } else {
        res.status(404).send('Learning path not found');
    }
});

// Update a learning path by ID
router.put('/:id', (req, res) => {
    const index = learningPaths.findIndex(lp => lp.id === req.params.id);
    if (index !== -1) {
        learningPaths[index] = req.body;
        res.json(learningPaths[index]);
    } else {
        res.status(404).send('Learning path not found');
    }
});

// Delete a learning path by ID
router.delete('/:id', (req, res) => {
    const index = learningPaths.findIndex(lp => lp.id === req.params.id);
    if (index !== -1) {
        learningPaths.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Learning path not found');
    }
});

module.exports = router;
