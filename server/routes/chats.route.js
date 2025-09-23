const router = require("express").Router();
const {
  getChat,
  getChatHistory,
  deleteChat,
  updateChat,
} = require("../controllers/chats.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.route("/").get(isAuthenticated, getChatHistory);

router
  .route("/:id")
  .get(isAuthenticated, getChat)
  .put(isAuthenticated, updateChat)
  .delete(isAuthenticated, deleteChat);

module.exports = router;
