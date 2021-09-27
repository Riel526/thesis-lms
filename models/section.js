const mongoose = require('mongoose')

const MODEL_NAME = 'Section'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  sectionName: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  ],
  gradeLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GradeLevel',
    required: true,
  },
  advisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'sections')
