const mongoose = require("mongoose");

const modelName = " Post";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    type: String,
    required: false,
    minLength: 10,
    maxLength: 500,
  },
  body: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1000,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(modelName, schema);