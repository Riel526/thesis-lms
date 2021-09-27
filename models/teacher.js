const mongoose = require('mongoose')

const MODEL_NAME = 'Teacher'

const notificationSchema = new mongoose.Schema({
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
})

notificationSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  image: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  suffixName: {
    type: String,
    required: false,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
    trim: true,
  },
  files: [
    {
      type: String,
      required: false,
      trim: true,
    },
  ],
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: false,
    },
  ],
  advisorySection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: false,
    trim: true,
  }
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'teachers')
