const mongoose = require("mongoose");

const MODEL_NAME = "Subject";

const subjectAnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: Date,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  }
})

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  present: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  },
  late: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  },
  absent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  },
  excused: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }
})


const moduleSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
  moduleDescription: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  attachedFiles: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  },
  period: {
    type: Number,
    required: true,
    trim: true,
  },
  isLocked: {
    type: Boolean,
    required: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
  }
})

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectDescription: {
    type: String,
    required: true,
    trim: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: false,
  },
  modules: [{
    type: moduleSchema,
    required: false,
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: false,
  }],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  },
  attendance: [{
    type: attendanceSchema,
    required: false,
  }],
  announcements: [{
    type: subjectAnnouncementSchema,
    required: false,
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }]
});

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "subjects");
