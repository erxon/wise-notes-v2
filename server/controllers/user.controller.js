const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = User({
      firstName,
      lastName,
      email,
      hash: hash,
      createdAt: new Date(),
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = (req, res) => {
  res.status(200).json({ name: "ericson", password: "ericson" });
};

module.exports = { getUser, createUser };
