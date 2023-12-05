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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 19);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username if provided
    if (username) {
      user.username = username;
    }

    // Update email if provided
    if (email) {
      user.email = email;
    }

    // Update password if provided
    if (password && newPassword) {
      const validPassword = bcryptjs.compareSync(password, user.password);

      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      const hashedPassword = bcryptjs.hashSync(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const { password: pass, ...updatedUser } = user._doc;
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
