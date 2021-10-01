const mongoose = require('mongoose')

const MODEL_NAME = 'Student'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
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
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
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
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  ],
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  lockerFiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LockerFile',
      required: false,
    },
  ],
  role: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  ],
  introduction: {
    type: String,
    required: false,
    trim: true,
  }
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'students')
