const mongoose = require("mongoose");

const noteChunkSchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notebookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notebook",
    default: null,
  },
  text: String,
  embedding: { type: [Number] },
  deletedAt: { type: Date, default: null },
});

const Chunk = mongoose.model("Chunk", noteChunkSchema);

module.exports = Chunk;
