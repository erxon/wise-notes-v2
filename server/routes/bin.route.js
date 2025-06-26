const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth.middleware");
const {
  getDeletedNotes,
  getDeletedNotebooks,
} = require("../controllers/bin.controller");

router.route("/").get(isAuthenticated, getDeletedNotes);
router.route("/notebooks").get(isAuthenticated, getDeletedNotebooks);

module.exports = router;
