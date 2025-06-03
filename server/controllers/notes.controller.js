const Note = require("../models/notes.model");
const logger = require("../utilities/logger.util");
const splitter = require("../utilities/textSplitter.util");
const getVectorStore = require("../utilities/vectorStore.util");
const embeddings = require("../utilities/embeddings.util");
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

    const chunks = await splitter.splitText(content);

    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
      type,
      items,
    });

    const note = await newNote.save();

    await Promise.all(
      chunks.map(async (chunk) => {
        console.log(chunk);
        const embeddingVector = await embeddings.embedQuery(chunk);

        const newChunk = new Chunk({
          noteId: newNote._id,
          userId: req.user.id,
          text: chunk,
          embedding: embeddingVector,
        });

        await newChunk.save();
      })
    );

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
    console.log(numberOfDocuments);
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
    const note = await Note.findByIdAndDelete(req.params.id);

    logger.info("Note deleted successfully");
    res.status(200).json({ data: note, message: "Note deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteManyNotes = async (req, res) => {
  try {
    const toDelete = req.body.toDelete;
    await Note.deleteMany({ _id: { $in: toDelete } });
    logger.info("Notes deleted successfully");
    res.status(200).json({ message: "Notes deleted successfully" });
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
    logger.info("Note updated successfully");
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
};
