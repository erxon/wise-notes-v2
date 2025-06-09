const Note = require("../models/notes.model");
const logger = require("../utilities/logger.util");
const chunkGenerator = require("../utilities/chunkGenerator.util");
const Chunk = require("../models/chunks.model");

const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    req.note = note;
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content, type, items } = req.body;

    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
      type,
      items,
    });

    const note = await newNote.save();

    await chunkGenerator(content, note._id, req.user.id);

    res.status(200).json({ data: note, message: "Note created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getNotes = async (req, res) => {
  try {
    let page = req.query.page || 1;
    page = parseInt(page);
    const numberOfDocuments = page * 10;
    const notes = await Note.find({ userId: req.user.id }).limit(
      numberOfDocuments
    );
    res.status(200).json({ data: notes });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteOneNote = async (req, res) => {
  try {
    //check if the note exist
    const note = await Note.findByIdAndUpdate(req.params.id, {
      deletedAt: Date.now(),
    });

    const chunks = await Chunk.deleteMany({ noteId: req.params.id });

    logger.info("Note deleted successfully");
    res
      .status(200)
      .json({ data: { note, chunks }, message: "Note deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteManyNotes = async (req, res) => {
  try {
    const toDelete = req.body.toDelete;

    await Note.updateMany(
      { _id: { $in: toDelete } },
      { deletedAt: Date.now() }
    );

    await Chunk.deleteMany({ noteId: { $in: toDelete } });

    logger.info("Notes deleted successfully");
    res.status(200).json({ message: "Notes deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const permanentDelete = async (req, res) => {
  try {
    const toDelete = req.body.toDelete;

    await Note.deleteMany({ _id: { $in: toDelete } });

    logger.info("Notes deleted successfully");

    res.status(200).json({ message: "Notes deleted permanently" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const restoreNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, {
      deletedAt: null,
    });

    await chunkGenerator(note.content, note._id, req.user.id);

    res.status(200).json({ data: note, message: "Note restored successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      {
        new: true,
      }
    );

    await Chunk.deleteMany({ noteId: req.params.id });
    await chunkGenerator(req.body.content, note._id, req.user.id);

    res.status(200).json({ data: note, message: "Note updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getNoteById,
  createNote,
  getNotes,
  deleteOneNote,
  deleteManyNotes,
  updateNote,
  permanentDelete,
  restoreNote,
};
