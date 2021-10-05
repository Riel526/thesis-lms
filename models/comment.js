const mongoose = require('mongoose')

const MODEL_NAME = 'Comment'

const schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    commentedByTeacher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: false,
      },
    ],
    commentedByStudent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: false,
      },
    ],
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'comments')
