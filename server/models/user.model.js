const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  hash: String,
  createdAt: Date,
  updatedAt: Date,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
