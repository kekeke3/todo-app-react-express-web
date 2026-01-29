// services/todo.service.js
import api from "./api";

export const todoService = {
  async getTodos(params = {}) {
    const filteredParams = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== "") {
        filteredParams[key] = params[key];
      }
    });

    return api.get("/todos", { params: filteredParams });
  },

  async getTodoById(id) {
    return api.get(`/todos/${id}`);
  },

  // services/todo.service.js - Update createTodo method
  async createTodo(todoData) {
    try {
      console.log("Creating todo with data:", todoData);
      const response = await api.post("/todos", todoData);
      return response;
    } catch (error) {
      console.error("Create todo error details:", error);

      // Log the specific validation errors
      if (error.data?.errors) {
        console.error("Validation errors:", error.data.errors);
      }

      // Return the error in a consistent format
      return {
        success: false,
        message: error.message,
        data: error.data,
        status: error.status,
      };
    }
  },

  async updateTodo(id, todoData) {
    return api.patch(`/todos/${id}`, todoData);
  },

  async deleteTodo(id) {
    return api.delete(`/todos/${id}`);
  },

  async toggleTodoStatus(id) {
    return api.patch(`/todos/${id}/toggle`);
  },

  async getStats() {
    return api.get("/todos/stats");
  },

  async getCategories() {
    const response = await this.getTodos();
    const todos = response.data?.todos || [];
    const categories = [
      ...new Set(todos.map((todo) => todo.category).filter(Boolean)),
    ];
    return categories;
  },
};
