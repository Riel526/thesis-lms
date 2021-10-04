const mongoose = require('mongoose')

const MODEL_NAME = 'Post'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  postedByTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  },

  postedByStudent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  },
  attachedFile: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  ],
  datePosted: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: false,
  },
  announcementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement',
    required: false,
  },
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'posts')
