const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const logger = require("../utilities/logger.util");

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
  res.status(200).json(req.user);
};

const updateUserBasicInfo = async (req, res) => {
  try {
    const user = req.user;
    const { firstName, lastName } = req.body;

    if (firstName === "" || lastName === "") {
      res.status(400).json({ message: "First name and Last name is required" });
    }

    const result = await User.findByIdAndUpdate(user.id, {
      firstName: firstName,
      lastName: lastName,
      updatedAt: Date.now(),
    });

    res
      .status(200)
      .json({ data: result, message: "User was updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const getUser = await User.findById(user.id);
    const isMatch = await bcrypt.compare(currentPassword, getUser.hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    const result = await User.findByIdAndUpdate(user.id, {
      hash: hash,
      updatedAt: Date.now(),
    });

    res
      .status(200)
      .json({ data: result, message: "Password was updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const user = req.user;

    const getUser = await User.findById(user.id);

    const { newEmail, confirmNewEmail, password } = req.body;

    const isMatch = await bcrypt.compare(password, getUser.hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (newEmail !== confirmNewEmail) {
      return res.status(400).json({ message: "Emails didn't matched" });
    }

    const existingEmailAddress = await User.find({ email: newEmail });

    if (existingEmailAddress.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const result = await User.findByIdAndUpdate(user.id, {
      email: newEmail,
      updatedAt: Date.now(),
    });

    res.status(200).json({
      data: result,
      message: "Email was successfully updated",
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUserBasicInfo,
  updatePassword,
  updateEmail,
};
