const mongoose = require('mongoose')

const MODEL_NAME = 'Group'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  groupName: {
    type: String,
    required: false,
    trim: true,
  },
  inviteCode: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' || 'Teacher',
    required: true,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' || 'Teacher',
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: false,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'group')
