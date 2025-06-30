const router = require("express").Router();
const {
  getChat,
  getChatHistory,
  deleteChat,
} = require("../controllers/chats.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.route("/").get(isAuthenticated, getChatHistory);
router
  .route("/:id")
  .get(isAuthenticated, getChat)
  .delete(isAuthenticated, deleteChat);

module.exports = router;
