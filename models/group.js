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
  createdByTeacher: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  }],
  createdByStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
  membersTeacher: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  }],
  membersStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: false,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'groups')
