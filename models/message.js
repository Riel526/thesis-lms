const mongoose = require('mongoose')

const MODEL_NAME = 'Message'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  message: {
    type: String,
    required: false,
  },
  senderTeacher: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  }],
  senderStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
  receiverTeacher: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  }],
  receiverStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
}, {
  timestamps: true
})



module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'messages')
