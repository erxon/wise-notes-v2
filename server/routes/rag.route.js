const { isAuthenticated } = require("../middlewares/auth.middleware");
const { query } = require("../controllers/rag.controller");

const router = require("express").Router();
require("dotenv").config();

router.route("/query").post(isAuthenticated, query);

module.exports = router;
