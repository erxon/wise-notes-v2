const router = require("express").Router();
const {
  createNotebook,
  getNotebooks,
  getNotebookById,
  getNotebook,
  deleteNotebook,
  updateNotebook,
  restoreNotebook,
  permanentDeleteNotebook,
  getNotesInNotebook,
} = require("../controllers/notebook.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router
  .route("/")
  .post(isAuthenticated, createNotebook)
  .get(isAuthenticated, getNotebooks);

router
  .route("/restore/:id")
  .put(isAuthenticated, getNotebookById, restoreNotebook);

router
  .route("/permanent-delete/:id")
  .delete(isAuthenticated, getNotebookById, permanentDeleteNotebook);

router.route("/:id/notes").get(isAuthenticated, getNotesInNotebook);

router
  .route("/:id")
  .get(isAuthenticated, getNotebookById, getNotebook)
  .delete(isAuthenticated, getNotebookById, deleteNotebook)
  .put(isAuthenticated, getNotebookById, updateNotebook);

module.exports = router;
