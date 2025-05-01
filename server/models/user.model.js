const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  hash: String,
  createdAt: Date,
  updatedAt: Date,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
