const { Router } = require("express");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const {
  createNote,
  deleteOneNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteManyNotes,
  permanentDelete,
  restoreNote,
  moveNotesToNotebook,
  removeFromNotebook,
} = require("../controllers/notes.controller");
const {
  addItemToListNote,
  deleteItemFromListNote,
  updateItemFromListNote,
  getListItems,
} = require("../controllers/notes/notes.lists.controller");

const router = Router();

router
  .route("/")
  .post(isAuthenticated, createNote)
  .get(isAuthenticated, getNotes)
  .delete(isAuthenticated, deleteManyNotes);

router.route("/delete").delete(isAuthenticated, permanentDelete);

router.route("/restore/:id").put(isAuthenticated, restoreNote);

router.put("/organize", isAuthenticated, moveNotesToNotebook);

router.put("/remove-from-notebook", isAuthenticated, removeFromNotebook);

router
  .route("/:id")
  .delete(isAuthenticated, getNoteById, deleteOneNote)
  .put(isAuthenticated, getNoteById, updateNote);

router
  .route("/list/:id")
  .get(isAuthenticated, getListItems)
  .post(isAuthenticated, addItemToListNote)
  .delete(isAuthenticated, deleteItemFromListNote)
  .put(isAuthenticated, updateItemFromListNote);

module.exports = router;
