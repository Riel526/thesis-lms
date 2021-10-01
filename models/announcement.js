const mongoose = require('mongoose')

const MODEL_NAME = 'Announcement'

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
  start: {
    type: Date,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  }],
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: false,
  },
})

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'subject-announcements')
