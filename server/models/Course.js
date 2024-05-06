const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Lecturer",
    },
    cost: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startHour: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    kategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kategory",
      required: true,
    },
    lastDateToRegist: {
      type: Date,
      required: true,
    },
    familyStatus: {
      type: String,
      enum: ["merried", "unmerried"],
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", courseSchema);
