import Todo from "../models/Todo.model.js";

// Create todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, status, priority, category, dueDate } =
      req.body;

    const todo = await Todo.create({
      title,
      description,
      status,
      priority,
      category,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create todo",
      error: error.message,
    });
  }
};

// Get all todos with filtering
export const getAllTodos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      category,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    let query = { user: req.user._id };

    // Apply filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    // Apply search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query
    const todos = await Todo.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Todo.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        todos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};

// Get single todo
export const getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todo",
      error: error.message,
    });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, category, dueDate } =
      req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      {
        title,
        description,
        status,
        priority,
        category,
        dueDate,
      },
      { new: true, runValidators: true },
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
      error: error.message,
    });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
      error: error.message,
    });
  }
};

// Toggle todo status
export const toggleTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.status = todo.status === "pending" ? "completed" : "pending";
    await todo.save();

    res.status(200).json({
      success: true,
      message: "Todo status updated",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update todo status",
      error: error.message,
    });
  }
};

// Get todo statistics
export const getTodoStats = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    const stats = {
      total: todos.length,
      pending: todos.filter((t) => t.status === "pending").length,
      completed: todos.filter((t) => t.status === "completed").length,
      byPriority: {
        high: todos.filter((t) => t.priority === "high").length,
        medium: todos.filter((t) => t.priority === "medium").length,
        low: todos.filter((t) => t.priority === "low").length,
      },
    };

    // Get unique categories
    const categories = [
      ...new Set(todos.map((t) => t.category).filter(Boolean)),
    ];
    stats.categories = categories;

    res.status(200).json({
      success: true,
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todo statistics",
      error: error.message,
    });
  }
};
