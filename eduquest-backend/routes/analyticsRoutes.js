const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Get analytics data for a user
router.get('/:userId', async (req, res) => {
    try {
        const analytics = await Analytics.findOne({ userId: req.params.userId })
            .populate('userId')
            .populate('metrics.completionRate.byPath.pathId');
        
        if (!analytics) {
            return res.status(404).json({ message: 'Analytics not found for this user' });
        }
        
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update study time
router.post('/:userId/study-time', async (req, res) => {
    try {
        const { duration } = req.body;
        let analytics = await Analytics.findOne({ userId: req.params.userId });
        
        if (!analytics) {
            analytics = new Analytics({ userId: req.params.userId });
        }
        
        analytics.updateStudyTime(duration);
        await analytics.save();
        
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update course progress
router.post('/:userId/course-progress', async (req, res) => {
    try {
        const { courseId, progress } = req.body;
        let analytics = await Analytics.findOne({ userId: req.params.userId });
        
        if (!analytics) {
            analytics = new Analytics({ userId: req.params.userId });
        }
        
        const courseIndex = analytics.courses.findIndex(
            course => course.courseId.toString() === courseId
        );
        
        if (courseIndex === -1) {
            analytics.courses.push({
                courseId,
                progress,
                lastAccessed: new Date(),
                timeSpent: 0
            });
        } else {
            analytics.courses[courseIndex].progress = progress;
            analytics.courses[courseIndex].lastAccessed = new Date();
        }
        
        await analytics.save();
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add quiz score
router.post('/:userId/quiz-score', async (req, res) => {
    try {
        const { quizId, score } = req.body;
        let analytics = await Analytics.findOne({ userId: req.params.userId });
        
        if (!analytics) {
            analytics = new Analytics({ userId: req.params.userId });
        }
        
        analytics.performance.quizScores.push({
            quizId,
            score,
            completedAt: new Date()
        });
        
        // Update average score
        const totalScores = analytics.performance.quizScores.reduce(
            (sum, quiz) => sum + quiz.score,
            0
        );
        analytics.metrics.averageScore = totalScores / analytics.performance.quizScores.length;
        
        await analytics.save();
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get weekly progress
router.get('/:userId/weekly-progress', async (req, res) => {
    try {
        const analytics = await Analytics.findOne({ userId: req.params.userId });
        
        if (!analytics) {
            return res.status(404).json({ message: 'Analytics not found for this user' });
        }
        
        const weeklyProgress = analytics.weeklyProgress.sort((a, b) => b.week - a.week);
        res.json(weeklyProgress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update engagement score
router.post('/:userId/engagement', async (req, res) => {
    try {
        const { score } = req.body;
        let analytics = await Analytics.findOne({ userId: req.params.userId });
        
        if (!analytics) {
            analytics = new Analytics({ userId: req.params.userId });
        }
        
        analytics.performance.engagementScore = score;
        await analytics.save();
        
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
