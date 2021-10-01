const mongoose = require('mongoose')

const MODEL_NAME = 'Comments'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
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
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
})


module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'comments')

