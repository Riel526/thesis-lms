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
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' || 'Teacher',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' || 'Teacher',
    required: true,
  },
}, {
  timestamps: true
})



module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'messages')
