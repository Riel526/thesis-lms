const mongoose = require("mongoose");

const MODEL_NAME = "Subject";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  present: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
  late: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
  absent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
  excused: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }]
})

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement',
    required: false,
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],

});

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "subjects");
