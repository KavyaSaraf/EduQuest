const express = require('express');
const router = express.Router();

// Sample user data (replace with database logic)
let users = [];

// Create a new user
router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// Get a user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Update a user by ID
router.put('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users[index] = req.body;
        res.json(users[index]);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;
