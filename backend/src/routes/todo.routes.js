import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  getTodoStats,
} from "../controllers/todo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  todoIdParam,
  todoQuery,
  createTodoValidation,
  updateTodoValidation,
} from "../validations/todo.validation.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Routes with validation
router.get("/", todoQuery, validate, getAllTodos);
router.post("/", createTodoValidation, validate, createTodo);
router.get("/stats", getTodoStats);
router.get("/:id", todoIdParam, validate, getTodo);
router.patch("/:id", updateTodoValidation, validate, updateTodo);
router.delete("/:id", todoIdParam, validate, deleteTodo);
router.patch("/:id/toggle", todoIdParam, validate, toggleTodoStatus);

export default router;
