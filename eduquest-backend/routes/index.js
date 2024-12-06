const express = require('express');
const router = express.Router();

// Import all route modules
const userRoutes = require('./userRoutes');
const learningPathRoutes = require('./learningPathRoutes');
const aiLearningPathRoutes = require('./aiLearningPathRoutes');
const aiTutorRoutes = require('./aiTutorRoutes');
const collaborativeRoutes = require('./collaborativeRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/learning-paths', learningPathRoutes);
router.use('/ai-learning-paths', aiLearningPathRoutes);
router.use('/ai-tutors', aiTutorRoutes);
router.use('/collaborative', collaborativeRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/analytics', analyticsRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
