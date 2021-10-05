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
  lockerFiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LockerFile',
      required: false,
    },
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
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
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: false,
      trim: true,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
      trim: true,
    },
  ],
  receivedMessages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: false,
    },
  ],
  sentMessages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: false,
    },
  ],
})

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'teachers')
