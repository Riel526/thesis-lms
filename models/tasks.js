const mongoose = require('mongoose')

const MODEL_NAME = 'Task'
//Quizzes, TPs, Lab Exercise etc.
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  instruction: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  period: {
    type: Number,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  isAllowLate: {
    type: Boolean,
    required: false,
  },
  isFinished: {
    type: Boolean,
    required: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
  },
  maximumAttempts: {
    type: Number,
    required: true,
  }
})



module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'tasks')
