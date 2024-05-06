const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_status: {
      type: Boolean,
      defulte: false,
    },  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
