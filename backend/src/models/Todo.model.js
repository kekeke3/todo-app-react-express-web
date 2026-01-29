import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [255, "Title cannot exceed 255 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    category: {
      type: String,
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
    },

    dueDate: {
      type: Date,
      validate: {
        validator: function (v) {
          if (!v) return true;

          const dueDate = new Date(v);
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

          return dueDateStart >= todayStart;
        },
        message: "Due date cannot be in the past",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Todo must belong to a user"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Indexes for better query performance
todoSchema.index({ user: 1, status: 1 });
todoSchema.index({ user: 1, priority: 1 });
todoSchema.index({ user: 1, dueDate: 1 });
todoSchema.index({ user: 1, category: 1 });

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
