const mongoose = require('mongoose')

const MODEL_NAME = 'Student'

const tasksSchema = new mongoose.Schema({
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
  studentAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
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
  score: {
    type: Number,
    required: false,
  },
  currentAttempts: {
    type: Number,
    required: false,
  }
})

const moduleSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
  moduleDescription: {
    type: String,
    required: true,
    trim: true,
  },
  period: {
    type: Number,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  attachedFiles: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  },
  isLocked: {
    type: Boolean,
    required: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
  },
  isFinished: {
    type: Boolean,
    required: true,
  }
})

const schema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  suffixName: {
    type: String,
    required: false,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  gradeLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GradeLevel',
    required: true,
    trim: true,
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  }],
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  modules: [{
    type: moduleSchema,
    required: false,
  }],
  tasks: [{
    type: tasksSchema,
    required: false,
  }],
  files: [{
    type: mongoose.Schema.Types.Mixed,
    required: false,
    trim: true,
  }],
  role: {
    type: String,
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  }]
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'students')
