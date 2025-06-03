const mongoose = require("mongoose");

const noteChunkSchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  embedding: { type: [Number] },
});

const Chunk = mongoose.model("Chunk", noteChunkSchema);

module.exports = Chunk;
