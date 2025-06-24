const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { getDeletedNotes } = require("../controllers/bin.controller");

router.route("/").get(isAuthenticated, getDeletedNotes);

module.exports = router;
