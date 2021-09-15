const mongoose = require("mongoose");

const MODEL_NAME = "Subject";

const schema = new mongoose.Schema({
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
});

module.exports =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "subjects");
