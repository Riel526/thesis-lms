const mongoose = require('mongoose')

const MODEL_NAME = 'Module'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  moduleTitle: {
    type: String,
    required: true,
    trim: true,
  },
  moduleDescription: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  link: {
    type: String,
    required: false,
    trim: true,
  },
  attachedFile: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  moduleQuarter: {
    type: String,
    required: true,
    trim: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
  },
  completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'modules')
