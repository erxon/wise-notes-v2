const { createUser } = require("../controllers/user.controller");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signIn };
