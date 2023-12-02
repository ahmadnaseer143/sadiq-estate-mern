import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hasedPassword = bcryptjs.hashSync(password, 19);
    const newUser = new User({ username, email, password: hasedPassword });
    await newUser.save();
    res.status(201).json("User Added Succesfully");
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      next(errorHandler(400, "Username already exists"));
    } else if (error.code === 11000 && error.keyPattern.email) {
      next(errorHandler(400, "Email already exists"));
    } else {
      res.status(500).json(error.message);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
