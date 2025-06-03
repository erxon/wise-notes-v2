const createNoteWithEmbeddings = require("../controllers/test.controller");

const router = require("express").Router();

router.post("/", createNoteWithEmbeddings);

module.exports = router;
