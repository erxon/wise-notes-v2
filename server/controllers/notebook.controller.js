const Notebook = require("../models/notebooks.model");
const Note = require("../models/notes.model");
const Chunk = require("../models/chunks.model");
const logger = require("../utilities/logger.util");

const createNotebook = async (req, res) => {
  try {
    const { title } = req.body;

    const notebook = new Notebook({ userId: req.user.id, title });

    await notebook.save();

    res.status(200).json({ data: notebook, message: "Notebook created" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getNotebooks = async (req, res) => {
  try {
    const notebooks = await Notebook.find({ userId: req.user.id });

    logger.info("Successfully fetched notebooks");
    res.status(200).json({ data: notebooks });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getNotebookById = async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id);

    if (!notebook) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    req.notebook = notebook;
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getNotebook = async (req, res) => {
  try {
    res.status(200).json({ data: req.notebook });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateNotebook = async (req, res) => {
  try {
    const { title } = req.body;

    const notebook = req.notebook;

    notebook.title = title;

    logger.info("Saving...");

    await notebook.save();

    logger.info(`Successfully updated notebook with id: ${req.params.id}`);

    res.status(200).json({ data: notebook, message: "Notebook updated" });
  } catch (error) {
    logger.error(error);

    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteNotebook = async (req, res) => {
  try {
    const notebook = req.notebook;

    //Updating the notebook
    logger.info("Updating the notebook...");
    notebook.deletedAt = new Date.now();

    await notebook.save();
    logger.info("Notebook saved");

    //Updating the notes belonging on the notebook
    logger.info("Updating the notes belonging to the notebook");
    const updateNotes = await Note.updateMany(
      { notebookId: notebook._id },
      { deletedAt: new Date.now() }
    );

    console.log(updateNotes);
    logger.info("Notes updated");

    //Deleting the chunks
    logger.info("Updating note chunks...");
    await Chunk.updateMany(
      { notebookId: notebook._id },
      { deletedAt: new Date.now() }
    );
    logger.info("Note chunks updated");

    res.status(200).json({ data: notebook, message: "Notebook deleted" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const restoreNotebook = async (req, res) => {
  try {
    const notebook = req.notebook;

    //Updating the notebook
    logger.info("Updating the notebook...");
    notebook.deletedAt = null;

    await notebook.save();
    logger.info("Notebook saved");

    logger.info("Updating the notes belonging to the notebook...");
    await Note.updateMany({ notebookId: notebook._id }, { deletedAt: null });
    logger.info("Notes updated");

    logger.info("Updating the chunks...");
    await Chunk.updateMany({ notebookId: notebook._id }, { deletedAt: null });
    logger.info("Chunks updated");

    res.status(200).json({ data: notebook, message: "Notebook restored" });
  } catch (error) {
    logger.error(error);

    res.status(400).json({ message: "Something went wrong." });
  }
};

const permanentDeleteNotebook = async (req, res) => {
  try {
    const notebook = req.notebook;

    logger.info("Deleting the noteboook...");
    await Notebook.deleteOne({ _id: notebook._id });
    logger.info("Note deleted");

    logger.info("Deleting the notes belonging to the notebook...");
    await Note.deleteMany({ notebookId: notebook._id });
    logger.info("Notes deleted");

    logger.info("Deleting chunks...");
    await Chunk.deleteMany({ notebookId: notebook._id });
    logger.info("Chunks deleted");

    res.status(200).json({ message: "Notebook deleted permanently" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createNotebook,
  getNotebooks,
  getNotebookById,
  getNotebook,
  updateNotebook,
  deleteNotebook,
  permanentDeleteNotebook,
  restoreNotebook,
};
