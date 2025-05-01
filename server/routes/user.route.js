const { Router } = require("express");
const { getUser, createUser } = require("../controllers/user.controller");

const router = Router();

router.get("/", getUser).post("/", createUser);

module.exports = router;
