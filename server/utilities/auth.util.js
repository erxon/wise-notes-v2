const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticateToken = async (req, res, next) => {
  const token = req.header("authorization");
  console.log(token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    const userData = await User.findOne({ _id: user.id });
    req.user = userData;
    next();
  });
};

module.exports = { authenticateToken };
