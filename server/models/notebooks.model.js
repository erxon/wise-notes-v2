const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  createdAt: { type: Date, default: new Date.now() },
  deletedAt: Date,
  updatedAt: { type: Date, default: new Date.now() },
});

const Notebook = mongoose.model("Notebook", notebookSchema);

module.exports = Notebook;
