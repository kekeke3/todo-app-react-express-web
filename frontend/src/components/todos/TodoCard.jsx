import React, { useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import {
  CheckCircle2,
  Circle,
  Calendar,
  Tag,
  Edit2,
  Trash2,
  MoreVertical,
  Clock,
  Flag,
} from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const TodoCard = ({ todo, onToggle, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <Flag className="h-4 w-4 text-danger-500" />;
      case "medium":
        return <Flag className="h-4 w-4 text-warning-500" />;
      case "low":
        return <Flag className="h-4 w-4 text-success-500" />;
      default:
        return <Flag className="h-4 w-4 text-gray-400" />;
    }
  };

  const isOverdue =
    todo.dueDate &&
    new Date(todo.dueDate) < new Date() &&
    todo.status !== "completed";

  return (
    <div
      className={clsx(
        "card card-hover p-4",
        todo.status === "completed" && "opacity-75",
        isOverdue && "border-danger-200",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(todo._id)}
          className="mt-1 flex-shrink-0 focus:outline-none"
          aria-label={
            todo.status === "completed"
              ? "Mark as pending"
              : "Mark as completed"
          }
        >
          {todo.status === "completed" ? (
            <CheckCircle2 className="h-6 w-6 text-success-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-300 hover:text-primary-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3
                className={clsx(
                  "font-medium text-gray-900",
                  todo.status === "completed" && "line-through text-gray-500",
                )}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {todo.description}
                </p>
              )}
            </div>

            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="More options"
              >
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-modal border border-gray-200 z-20">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onEdit(todo);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDelete(todo._id);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge
              variant={todo.status === "completed" ? "completed" : "pending"}
            >
              {todo.status === "completed" ? "Completed" : "Pending"}
            </Badge>

            {todo.priority && (
              <Badge variant={todo.priority}>
                {getPriorityIcon(todo.priority)}
                {todo.priority} priority
              </Badge>
            )}

            {todo.category && (
              <Badge variant="primary">
                <Tag className="h-3 w-3" />
                {todo.category}
              </Badge>
            )}

            {todo.dueDate && (
              <Badge variant={isOverdue ? "danger" : "default"}>
                <Calendar className="h-3 w-3" />
                {format(new Date(todo.dueDate), "MMM dd, yyyy")}
                {isOverdue && " (Overdue)"}
              </Badge>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Created {format(new Date(todo.createdAt), "MMM dd, yyyy")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
