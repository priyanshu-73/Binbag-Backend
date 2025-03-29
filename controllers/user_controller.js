import bcryptjs from "bcryptjs";
import User from "../modal/user_modal.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = bcryptjs.hashSync(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    await user.save();

    res
      .cookie("access_token", token)
      .status(200)
      .json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "All fields are required!" });
  }

  try {
    const user = await User.findOne({ email });

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res
      .cookie("access_token", token)
      .status(200)
      .json({ name: user.name, email: user.email, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    await User.findOneAndDelete({ email });
    return res.status(200).json({ message: "User Deleted" });
  }

  const loggedInUserEmail = req.user.email;
  const loggedInUser = await User.findOne({ loggedInUserEmail });

  if (loggedInUser && loggedInUser._id !== id) {
    return res
      .status(200)
      .json({ message: "You can only update your own profile!" });
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return res.json({ message: "Email already exists!" });
  }

  try {
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid User" });
    }
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = bcryptjs.hashSync(password);

    const user = await User.findOneAndUpdate({ _id: id }, updatedData, {
      new: true,
    });

    res.status(200).json({ message: "Profile Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
