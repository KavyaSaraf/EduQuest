const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metrics: {
    studyTime: {
      total: { type: Number, default: 0 }, // in minutes
      daily: [{
        date: Date,
        duration: Number
      }]
    },
    completionRate: {
      total: { type: Number, default: 0 }, // percentage
      byPath: [{
        pathId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'LearningPath'
        },
        completion: Number
      }]
    },
    achievements: [{
      title: String,
      description: String,
      earnedAt: {
        type: Date,
        default: Date.now
      }
    }],
    averageScore: {
      type: Number,
      default: 0
    }
  },
  courses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LearningPath'
    },
    progress: Number,
    lastAccessed: Date,
    timeSpent: Number, // in minutes
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started'
    }
  }],
  performance: {
    quizScores: [{
      quizId: String,
      score: Number,
      completedAt: Date
    }],
    assignmentCompletion: {
      completed: Number,
      total: Number
    },
    engagementScore: {
      type: Number,
      default: 0
    }
  },
  weeklyProgress: [{
    week: Date,
    completedTasks: Number,
    studyTime: Number,
    progress: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps before saving
analyticsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to calculate overall progress
analyticsSchema.methods.calculateOverallProgress = function() {
  if (this.courses.length === 0) return 0;
  
  const totalProgress = this.courses.reduce((sum, course) => sum + course.progress, 0);
  return totalProgress / this.courses.length;
};

// Method to update study time
analyticsSchema.methods.updateStudyTime = function(duration) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyRecord = this.metrics.studyTime.daily.find(
    record => record.date.getTime() === today.getTime()
  );

  if (dailyRecord) {
    dailyRecord.duration += duration;
  } else {
    this.metrics.studyTime.daily.push({
      date: today,
      duration: duration
    });
  }

  this.metrics.studyTime.total += duration;
};

module.exports = mongoose.model('Analytics', analyticsSchema);
