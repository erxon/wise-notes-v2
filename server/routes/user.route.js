const { Router } = require("express");
const { getUser, createUser } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = Router();

router.use(isAuthenticated).get("/", getUser);
router.post("/", createUser);

module.exports = router;
