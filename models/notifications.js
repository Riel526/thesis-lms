const mongoose = require('mongoose')

const MODEL_NAME = 'Notification'

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  content: {
    type: String,
    required: false,
  },
  expireAt: {
    type: Date,
    required: true,
    default: function () {
      // 60 seconds from now
      return new Date(new Date().valueOf() + 60000)
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' || 'Teacher',
    required: true,
  },
})

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'notifications')
