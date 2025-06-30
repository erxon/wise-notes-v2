const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  query: String,
  answer: String,
  createdAt: { type: Date, default: Date.now() },
});

const Chat = mongoose.model("Chats", chatSchema);

module.exports = Chat;
