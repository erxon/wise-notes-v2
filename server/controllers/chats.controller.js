const Chat = require("../models/chats.model");

const isAuthorized = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (chat.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

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
    const { page } = req.query;

    const chats = await Chat.find({ userId: req.user.id })
      .sort({
        createdAt: "descending",
      })
      .limit(page * 3);

    const reverse = chats.reverse();
    res.status(200).json(reverse);
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

module.exports = {
  getChat,
  getChatHistory,
  deleteChat,
  updateChat,
  isAuthorized,
};
