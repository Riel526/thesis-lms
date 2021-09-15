const mongoose = require('mongoose')

const MODEL_NAME = 'Section'

const schema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: false,
      trim: true,
    },
  ],
  gradeLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GradeLevel',
    required: true,
    trim: true,
  },
  advisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
    trim: true,
  },
  numberOfStudents: {
    type: Number,
    required: false,
  }
  
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'sections')
