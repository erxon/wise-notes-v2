const Note = require("../../models/notes.model");
const logger = require("../../utilities/logger.util");

const addItemToListNote = async (req, res) => {
  try {
    const { label } = req.body;

    if (!label) {
      return res.status(400).json({ message: "label is empty" });
    }
    const note = await Note.findById(req.params.id);

    const items = note.items;
    const newItem = {
      label,
      checked: false,
    };

    items.push(newItem);

    const noteUpdated = await Note.findByIdAndUpdate(
      req.params.id,
      { items: items, updatedAt: Date.now() },
      {
        new: true,
      }
    );
    logger.info("Item added to list successfully");
    res
      .status(200)
      .json({ data: noteUpdated, message: "Item added to list successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteItemFromListNote = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      res.status(400).json({ message: "itemId is empty" });
    }

    const note = await Note.findById(req.params.id);

    let items = note.items;
    if (items.find((item) => item.id === itemId) === undefined) {
      return res.status(400).json({ message: "Item not found" });
    }
    items = items.filter((item) => item.id !== itemId);

    const noteUpdated = await Note.findByIdAndUpdate(
      req.params.id,
      { items: items, updatedAt: Date.now() },
      {
        new: true,
      }
    );
    logger.info("Item deleted from list successfully");
    res.status(200).json({
      data: noteUpdated,
      message: "Item deleted from list successfully",
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateItemFromListNote = async (req, res) => {
  try {
    const { itemId, label, checked } = req.body;

    if (!itemId) {
      res.status(400).json({ message: "itemId is empty" });
    }

    const note = await Note.findById(req.params.id);

    let items = note.items;

    items = items.map((item) => {
      if (item.id === itemId) {
        if (label) {
          item.label = label;
        }
        item.checked = checked;
      }
      return item;
    });

    const noteUpdated = await Note.findByIdAndUpdate(
      req.params.id,
      { items: items, updatedAt: Date.now() },
      {
        new: true,
      }
    );

    logger.info("Item updated from list successfully");
    res.status(200).json({
      data: noteUpdated,
      message: "Item updated from list successfully",
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getListItems = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json({ data: note.items });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addItemToListNote,
  deleteItemFromListNote,
  updateItemFromListNote,
  getListItems,
};
