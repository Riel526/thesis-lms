const mongoose = require('mongoose')

const MODEL_NAME = 'Post'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  postedByTeacher: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  }],
  postedByStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
  content: {
    type: String,
    required: true,
    trim: true,
  },
  commentsByTeacher: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  }],
  commentsByStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'posts')
