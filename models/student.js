const mongoose = require('mongoose')

const MODEL_NAME = 'Student'

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
  },
  email: {
    type: String,
    required: true,
    trim: true,
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
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  quizzes: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      trim: true,
    },
  ],
  files: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      trim: true,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'students')
