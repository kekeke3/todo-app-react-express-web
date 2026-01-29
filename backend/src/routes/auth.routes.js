import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
} from "../validations/auth.validation.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.patch(
  "/profile",
  authMiddleware,
  updateProfileValidation,
  validate,
  updateProfile,
);
router.patch(
  "/change-password",
  authMiddleware,
  changePasswordValidation,
  validate,
  changePassword,
);

router.post("/logout", authMiddleware, logout);

export default router;
