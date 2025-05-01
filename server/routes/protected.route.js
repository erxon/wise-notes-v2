const { authenticateToken } = require("../utilities/auth.util");
const router = require("express").Router();

router.get("/", authenticateToken, (req, res) =>
  res.status(200).json(req.user)
);

module.exports = router;
