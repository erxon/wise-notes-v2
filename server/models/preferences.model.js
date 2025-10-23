const mongoose = require("mongoose");

const preferencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notesLayout: {
    notebooks: { type: String, default: "grid", enum: ["grid", "list"] },
    home: { type: String, default: "grid", enum: ["grid", "list"] },
  },
  theme: {
    type: String,
    default: "light",
    enum: ["light", "dark"],
  },
});

const Preferences = mongoose.model("Preferences", preferencesSchema);

module.exports = Preferences;
