const router = require("express").Router();
const {
  getChat,
  getChatHistory,
  deleteChat,
  updateChat,
  isAuthorized,
} = require("../controllers/chats.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.route("/").get(isAuthenticated, getChatHistory);

router
  .route("/:id")
  .get(isAuthenticated, isAuthorized, getChat)
  .put(isAuthenticated, isAuthorized, updateChat)
  .delete(isAuthenticated, isAuthorized, deleteChat);

module.exports = router;
