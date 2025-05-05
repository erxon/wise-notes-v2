const { authenticateToken } = require("../utilities/auth.util");
const router = require("express").Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send("Not authenticated");
}

router.get("/", isAuthenticated, (req, res) => res.status(200).json(req.user));

module.exports = router;
