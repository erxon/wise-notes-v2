const Note = require("../models/notes.model");
const logger = require("../utilities/logger.util");
const chunkGenerator = require("../utilities/chunkGenerator.util");
const Chunk = require("../models/chunks.model");
const Notebook = require("../models/notebooks.model");
const _ = require("lodash");

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

const moveNotesToNotebook = async (req, res) => {
  try {
    const { notes, notebookId } = req.body;

    logger.info("Moving notes to notebook...");
    const updateNote = await Note.updateMany(
      { _id: { $in: notes } },
      {
        notebookId: notebookId,
      }
    );
    logger.info("Notes moved successfully");

    logger.info("Moving chunks to notebook...");
    await Chunk.updateMany(
      { noteId: { $in: notes } },
      {
        notebookId: req.body.notebookId,
      }
    );
    logger.info("Chunks moved successfully");

    res
      .status(200)
      .json({ data: updateNote, message: `${notes.length} note/s moved` });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const removeFromNotebook = async (req, res) => {
  try {
    const { notes } = req.body;

    logger.info("Removing notes...");
    const updateMany = await Note.updateMany(
      {
        _id: { $in: notes },
      },
      {
        notebookId: null,
      }
    );

    logger.info("Notes removed successfully");

    const updateChunks = await Chunk.updateMany(
      { noteId: { $in: notes } },
      { notebookId: null }
    );
    logger.info("Chunks removed successfully");
    console.log(updateChunks);

    res
      .status(200)
      .json({ data: updateMany, message: `${notes.length} note/s removed` });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content, type, items, notebookId, sortKey } = req.body;

    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
      type,
      items,
      notebookId: notebookId ? notebookId : null,
      sortKey,
    });

    const note = await newNote.save();

    await chunkGenerator(content, note._id, req.user.id, notebookId);

    res.status(200).json({ data: note, message: "Note created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      deletedAt: null,
      notebookId: null,
    }).sort({
      sortKey: "ascending",
    });
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

    const chunks = await Chunk.updateMany(
      { noteId: req.params.id },
      { deletedAt: Date.now() }
    );

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

    await Chunk.updateMany(
      { noteId: { $in: toDelete } },
      { deletedAt: Date.now() }
    );

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

    await Chunk.deleteMany({ noteId: { $in: toDelete } });

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

    //If the note belong to a notebook that don't exist (or moved to bin), set notebook to null
    if (note.notebookId) {
      //Find the notebook
      const fetchNotebook = await Notebook.findById(note.notebookId);

      if (fetchNotebook && !_.isNull(fetchNotebook.deletedAt)) {
        note.notebookId = null;
        await note.save();
      }

      //if the notebook doesn't exist (permanently deleted)
      if (!fetchNotebook) {
        note.notebookId = null;
        await note.save();
      }
    }

    await Chunk.updateMany({ noteId: req.params.id }, { deletedAt: null });

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

const reorderNotes = async (req, res) => {
  try {
    const { newNoteOrder } = req.body;

    const newNoteOrderSortKeys = newNoteOrder.map((note, index) => ({
      id: note._id,
      sortKey: index,
    }));

    const result = newNoteOrderSortKeys.map(async (object) => {
      await Note.updateOne({ _id: object.id }, { sortKey: object.sortKey });
    });

    logger.info("Note reordered successfully");
    res
      .status(200)
      .json({ data: result, message: "Note reordered successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const searchNotes = async (req, res) => {
  try {
    const { query } = req.params;

    const notes = await Note.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .limit(3)
      .sort({ score: { $meta: "textScore" } });

    res.status(200).json({ data: notes });
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
  moveNotesToNotebook,
  removeFromNotebook,
  reorderNotes,
  searchNotes,
};
