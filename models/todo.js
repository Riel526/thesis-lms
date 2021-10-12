const mongoose = require('mongoose')

const MODEL_NAME = 'TodoList'

const todoContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  isFinished: {
    type: String,
    required: true,
    trim: true,
  }
})

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  content: {
    type: todoContentSchema,
    required: false,
  },
})

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'todo-lists')
