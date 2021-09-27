const mongoose = require('mongoose')

const MODEL_NAME = 'GradeLevel'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  gradeLevelName: {
    type: String,
    required: false,
    trim: true,
  },
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: false,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'grade-levels')
