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
  isAuthorized,
} = require("../controllers/notebook.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router
  .route("/")
  .post(isAuthenticated, createNotebook)
  .get(isAuthenticated, getNotebooks);

router
  .route("/restore/:id")
  .put(isAuthenticated, isAuthorized, getNotebookById, restoreNotebook);

router
  .route("/permanent-delete/:id")
  .delete(
    isAuthenticated,
    isAuthorized,
    getNotebookById,
    permanentDeleteNotebook
  );

router
  .route("/:id/notes")
  .get(isAuthenticated, isAuthorized, getNotesInNotebook);

router
  .route("/:id")
  .get(isAuthenticated, isAuthorized, getNotebookById, getNotebook)
  .delete(isAuthenticated, isAuthorized, getNotebookById, deleteNotebook)
  .put(isAuthenticated, isAuthorized, getNotebookById, updateNotebook);

module.exports = router;
