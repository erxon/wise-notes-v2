const Chat = require("../models/chats.model");

const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    res.status(200).json({ data: chat });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({
      createdAt: "ascending",
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

const updateChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.status(200).json({ data: chat });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = { getChat, getChatHistory, deleteChat, updateChat };
