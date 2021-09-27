const mongoose = require('mongoose')

const MODEL_NAME = 'Module'

const moduleSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  image: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
  },
  attachedFiles: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
  ],
  period: {
    type: Number,
    required: true,
    trim: true,
  },
  isLocked: {
    type: Boolean,
    required: true,
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
