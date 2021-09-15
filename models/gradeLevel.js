const mongoose = require('mongoose')

const MODEL_NAME = 'GradeLevel'

const schema = new mongoose.Schema({
  gradeLevelName: {
    type: String,
    required: false,
    trim: true,
  },
  sections: [
    {
      //Array of document IDS of sections
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: false,
      trim: true,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'grade-levels')
