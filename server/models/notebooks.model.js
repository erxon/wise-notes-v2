const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  createdAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now() },
});

const Notebook = mongoose.model("Notebook", notebookSchema);

module.exports = Notebook;
