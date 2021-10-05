const mongoose = require('mongoose')

const MODEL_NAME = 'Message'

const schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachedFile: {
      type: String,
      required: false,
    },
    senderTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: false,
    },

    senderStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },

    teacherReciepient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: false,
    },

    studentReciepient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'messages')
