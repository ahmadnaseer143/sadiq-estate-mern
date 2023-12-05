import express from "express";
import {
  google,
  signin,
  signup,
  updateUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.put("/:userId", updateUser);

export default router;
