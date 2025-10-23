const { Router } = require("express");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const {
  getPreferences,
  updateNotesLayout,
  updateTheme,
} = require("../controllers/preferences.controller");

const router = Router();

router.get("/", isAuthenticated, getPreferences);
router.put("/notes-layout", isAuthenticated, updateNotesLayout);

module.exports = router;
