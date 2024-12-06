const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  learningPaths: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPath'
  }],
  progress: {
    completedCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    currentCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    overallProgress: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
