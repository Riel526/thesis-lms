const mongoose = require('mongoose')

const MODEL_NAME = 'Task'

const questionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String || Array,
    required: false,
    trim: true,
  },
})

const studentAnswerSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true,
  },
  answer: {
    type: String || Array,
    required: false,
    trim: true,
  },
})

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  currentAttempts: {
    type: Number,
    required: false,
  },
  answers: [
    {
      type: studentAnswerSchema,
      required: false,
    },
  ],
  attachedFiles: [
    {
      type: String,
      required: false,
      trim: true,
    },
  ],
  score: {
    type: Number,
    required: false,
  },
})

//Quizzes, TPs, Lab Exercise etc.
const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
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
  questions: [
    {
      type: questionSchema,
      required: true,
    },
  ],
  quarter: {
    type: String,
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
  },
  maximumScore: {
    type: Number,
    required: true,
  },
  subject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  ],
  submissions: [
    {
      type: submissionSchema,
      required: false,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'tasks')
