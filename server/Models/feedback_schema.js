const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  title: { type: String },
  feedback: { type: String },
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("feedback", feedbackSchema);
