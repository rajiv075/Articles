const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  Article_Link: { type: String },
  Title: { type: String },
  Date: { type: String },
  Author: { type: String },
  Description: { type: String },
  Topic: { type: String },
});

module.exports = mongoose.model("contact", ContactSchema);
