const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.post("/signin", passport.authenticate("local"), (req, res) => {
  req.isAuthenticated()
    ? res.status(200).json({ id: req.user.id, email: req.user.email })
    : res.status(401).json({ message: "Invalid credentials" });
});

router.get("/signout", (req, res) => {
  req.logout(() => res.send("Logged out"));
});

module.exports = router;
