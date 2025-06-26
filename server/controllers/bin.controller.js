const Notebook = require("../models/notebooks.model");
const Note = require("../models/notes.model");
const logger = require("../utilities/logger.util");

const getDeletedNotes = async (req, res) => {
  try {
    const deletedNotes = await Note.find({
      deletedAt: { $exists: true, $ne: null },
    });

    if (deletedNotes.length > 0) {
      return res.status(200).json({
        data: deletedNotes,
      });
    } else {
      return res.status(200).json({
        message: "Bin is empty",
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getDeletedNotebooks = async (req, res) => {
  try {
    const deletedNotebooks = await Notebook.find({
      deletedAt: { $exists: true, $ne: null },
    });

    if (deletedNotebooks.length > 0) {
      return res.status(200).json({
        data: deletedNotebooks,
      });
    } else {
      return res.status(200).json({
        message: "No notebooks deleted",
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = {
  getDeletedNotes,
  getDeletedNotebooks,
};
