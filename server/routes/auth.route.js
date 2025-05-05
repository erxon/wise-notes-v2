const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/protected",
    failureRedirect: "/",
  })
);

router.get("/signout", (req, res) => {
  req.logout(() => res.send("Logged out"));
});

module.exports = router;
