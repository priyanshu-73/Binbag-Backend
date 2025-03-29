import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/user_controller.js";
import { body } from "express-validator";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create",
  body("name").isString().withMessage("Name must be string!"),
  body("email").isEmail().withMessage("Invalid Email!"),
  body("password").isStrongPassword().withMessage("Weak password!"),
  createProfile
);

router.post("/get", getProfile);

router.put("/update/:id", isAuth, updateProfile);

export default router;
