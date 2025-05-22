const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  content: String,
  type: {
    type: String,
    enum: ["text", "list"],
    default: "text",
    validate: {
      validator: function (value) {
        return value === "text" || value === "list";
      },
      message: "type must be either 'text' or 'list'",
    },
  },
  items: [
    {
      label: String,
      checked: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
