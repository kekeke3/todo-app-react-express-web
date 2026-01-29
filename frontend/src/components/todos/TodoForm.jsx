// components/todos/TodoForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { Calendar, Tag, Flag, FileText } from "lucide-react";

const TodoForm = ({
  open,
  onClose,
  onSubmit,
  initialData = {},
  categories = [],
}) => {
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      category: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (initialData._id) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "pending",
        priority: initialData.priority || "medium",
        category: initialData.category || "",
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
      });
      setShowNewCategory(false);
      setNewCategory("");
    } else {
      reset({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        category: "",
        dueDate: "",
      });
      setShowNewCategory(false);
      setNewCategory("");
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    // Prepare the data for submission
    const submitData = { ...data };

    // Handle category - if user selected "__new__" and entered a new category
    if (submitData.category === "__new__" && newCategory.trim()) {
      submitData.category = newCategory.trim();
    } else if (submitData.category === "__new__" && !newCategory.trim()) {
      delete submitData.category; // Remove category if no new category entered
    } else if (!submitData.category || submitData.category === "") {
      delete submitData.category; // Remove empty category
    }

    // Remove empty dueDate
    if (!submitData.dueDate || submitData.dueDate === "") {
      delete submitData.dueDate;
    }

    // Remove empty description
    if (!submitData.description || submitData.description.trim() === "") {
      delete submitData.description;
    }

    console.log("Form submitting data:", submitData);
    onSubmit(submitData);
    reset();
    setNewCategory("");
    setShowNewCategory(false);
  };

  const handleClose = () => {
    reset();
    setNewCategory("");
    setShowNewCategory(false);
    onClose();
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setValue("category", value);

    if (value === "__new__") {
      setShowNewCategory(true);
      setValue("category", "__new__");
    } else {
      setShowNewCategory(false);
      setNewCategory("");
    }
  };

  if (!open) return null;

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const categoryOptions = [
    { value: "", label: "No category" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
    { value: "__new__", label: "-- Create new category --" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-modal w-full max-w-md animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {initialData._id ? "Edit Task" : "New Task"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {initialData._id
                  ? "Update your task details"
                  : "Add a new task to your list"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="p-6 space-y-4"
          >
            <Input
              label="Title"
              placeholder="What needs to be done?"
              error={errors.title?.message}
              required
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 255,
                  message: "Title must be less than 255 characters",
                },
              })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="textarea"
                placeholder="Add details, notes, or instructions..."
                rows={3}
                {...register("description", {
                  maxLength: {
                    value: 1000,
                    message: "Description must be less than 1000 characters",
                  },
                })}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-danger-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Status"
                options={statusOptions}
                icon={FileText}
                {...register("status")}
              />

              <Select
                label="Priority"
                options={priorityOptions}
                icon={Flag}
                {...register("priority")}
              />
            </div>

            <Select
              label="Category"
              options={categoryOptions}
              icon={Tag}
              onChange={handleCategoryChange}
              value={watch("category")}
            />

            {showNewCategory && (
              <Input
                label="New Category Name"
                placeholder="Enter new category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                maxLength={50}
              />
            )}

            <Input
              label="Due Date"
              type="date"
              icon={Calendar}
              {...register("dueDate")}
              min={new Date().toISOString().split("T")[0]}
            />

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {initialData._id ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
