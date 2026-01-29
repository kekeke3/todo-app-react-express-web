import { body } from "express-validator";

/* Register Validation */
export const registerValidation = [
  body("name")
    .trim()
    .exists()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .normalizeEmail()
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, "i")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),

 
];

/* Login Validation */
export const loginValidation = [
  body("email")
    .trim()
    .normalizeEmail()
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password").exists().withMessage("Password is required"),
];

/* Update Profile Validation */
export const updateProfileValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email address"),
];

/* Change Password Validation */
export const changePasswordValidation = [
  body("currentPassword").exists().withMessage("Current password is required"),

  body("newPassword")
    .exists()
    .withMessage("New password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, "i")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    )
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error("New password must be different from current password");
      }
      return true;
    }),

];
