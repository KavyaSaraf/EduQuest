const express = require('express');
const router = express.Router();
const CollaborativeSession = require('../models/Collaborative');

// Create a new collaborative session
router.post('/', async (req, res) => {
    try {
        const session = new CollaborativeSession(req.body);
        await session.save();
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all collaborative sessions
router.get('/', async (req, res) => {
    try {
        const sessions = await CollaborativeSession.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a collaborative session by ID
router.get('/:id', async (req, res) => {
    try {
        const session = await CollaborativeSession.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a collaborative session by ID
router.put('/:id', async (req, res) => {
    try {
        const session = await CollaborativeSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!session) return res.status(404).json({ message: 'Session not found' });
        res.json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a collaborative session by ID
router.delete('/:id', async (req, res) => {
    try {
        const session = await CollaborativeSession.findByIdAndDelete(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
