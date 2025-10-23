const mongoose = require("mongoose");
const Preferences = require("../models/preferences.model");

const getPreferences = async (req, res) => {
  try {
    const preferences = await Preferences.findOne({ userId: req.user.id });

    return res.status(200).json(preferences);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const updateNotesLayout = async (req, res) => {
  try {
    const { notesLayout, page } = req.body;

    const preferences = await Preferences.findOne({ userId: req.user.id });

    if (!preferences) {
      await Preferences.create({ userId: req.user.id });
    } else {
      if (!page) {
        return res.status(400).json({ message: "Page is required" });
      }

      if (page === "home") {
        preferences.notesLayout.home = notesLayout;
        await preferences.save();
      }
      if (page === "notebooks") {
        preferences.notesLayout.notebooks = notesLayout;
        await preferences.save();
      }
    }

    return res.status(200).json({ message: "Preferences updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { getPreferences, updateNotesLayout };
