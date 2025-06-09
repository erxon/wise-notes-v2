const router = require("express").Router();
const {
  createNotebook,
  getNotebooks,
  getNotebookById,
  getNotebook,
  deleteNotebook,
  updateNotebook,
} = require("../controllers/notebook.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router
  .route("/")
  .post(isAuthenticated, createNotebook)
  .get(isAuthenticated, getNotebooks);

router
  .route("/:id")
  .get(isAuthenticated, getNotebookById, getNotebook)
  .delete(isAuthenticated, getNotebookById, deleteNotebook)
  .put(isAuthenticated, getNotebookById, updateNotebook);

module.exports = router;
