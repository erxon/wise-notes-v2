const { Router } = require("express");
const {
  getUser,
  createUser,
  updateUserBasicInfo,
  updatePassword,
  updateEmail,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = Router();

router.use(isAuthenticated).get("/", getUser);
router.post("/", createUser);

router.route("/update/basic-info").put(isAuthenticated, updateUserBasicInfo);

router.route("/update/change-password").put(isAuthenticated, updatePassword);

router.route("/update/email").put(isAuthenticated, updateEmail);

module.exports = router;
