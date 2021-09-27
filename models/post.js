const mongoose = require('mongoose')

const MODEL_NAME = 'Post'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' || 'Teacher',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  reactions: {
    upvote: {
      type: Number,
      required: false,
    },
    downvote: {
      type: Number,
      required: false,
    },
  },
  replies: {
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student' || 'Teacher',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: {
      upvote: {
        type: Number,
        required: false,
      },
      downvote: {
        type: Number,
        required: false,
      },
    },
  },
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'posts')
