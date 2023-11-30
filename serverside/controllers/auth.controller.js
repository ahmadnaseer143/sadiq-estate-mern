import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hasedPassword = bcryptjs.hashSync(password, 19);
    const newUser = new User({ username, email, password: hasedPassword });
    await newUser.save();
    res.status(201).json("User Added Succesfully");
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      res.status(400).json("Username already exists");
    } else if (error.code === 11000 && error.keyPattern.email) {
      res.status(400).json("Email already exists");
    } else {
      res.status(500).json(error.message);
    }
  }
};
