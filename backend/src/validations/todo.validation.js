import { body, param, query } from "express-validator";

/* Todo ID Validation */
export const todoIdParam = [
  param("id")
    .exists()
    .withMessage("Todo ID is required")
    .isMongoId()
    .withMessage("Invalid Todo ID format"),
];

/* Pagination & Filtering */
export const todoQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),

  query("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be either 'pending' or 'completed'"),

  query("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  query("category")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),

  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search query cannot exceed 100 characters"),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "updatedAt", "dueDate", "title", "priority"])
    .withMessage("Invalid sort field"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be 'asc' or 'desc'"),
];

/* Create Todo Validation */
export const createTodoValidation = [
  body("title")
    .trim()
    .exists()
    .withMessage("Title is required")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Title cannot exceed 255 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be either 'pending' or 'completed'"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("category")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date")
    .custom((value) => {
      const dueDate = new Date(value);
      const today = new Date();

      // Set both dates to start of day for fair comparison
      const dueDateStart = new Date(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate(),
      );
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      if (dueDateStart < todayStart) {
        throw new Error("Due date cannot be in the past");
      }
      return true;
    }),
];

/* Update Todo Validation */
export const updateTodoValidation = [
  ...todoIdParam,

  body("title")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Title cannot exceed 255 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be either 'pending' or 'completed'"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("category")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date"),
];
