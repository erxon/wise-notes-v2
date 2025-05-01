const { Router } = require("express");
const { signIn } = require("../controllers/auth.controller");
const router = Router();

router.post("/sign-in", signIn);

module.exports = router;
