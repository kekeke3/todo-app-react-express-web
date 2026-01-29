import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  LogOut,
  User,
  CheckCircle2,
  Clock,
  TrendingUp,
  Grid,
  List,
  Search,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import TodoCard from "../components/todos/TodoCard";
import TodoFilters from "../components/todos/TodoFilters";
import TodoForm from "../components/todos/TodoForm";
import Button from "../components/ui/Button";
import { todoService } from "../services/todo.service";
import EmptyState from "../components/todos/EmptyState";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Memoize fetch functions to prevent unnecessary re-renders
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await todoService.getTodos(filters);
      if (response.success) {
        setTodos(response.data.todos || []);
        setError("");
      } else {
        setError(response.message || "Failed to fetch todos");
      }
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to fetch todos. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await todoService.getTodos({ limit: 1000 });
      if (response.success && response.data.todos) {
        const categories = [
          ...new Set(
            response.data.todos.map((todo) => todo.category).filter(Boolean),
          ),
        ];
        setCategories(categories);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await todoService.getStats();
      if (response.success) {
        setStats(response.data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch all data in parallel
        const [todosResponse, statsResponse] = await Promise.allSettled([
          todoService.getTodos(filters),
          todoService.getStats(),
        ]);

        if (!isMounted) return;

        // Handle todos response
        if (
          todosResponse.status === "fulfilled" &&
          todosResponse.value.success
        ) {
          const todosData = todosResponse.value.data.todos || [];
          setTodos(todosData);

          // Extract categories from todos
          const categories = [
            ...new Set(todosData.map((todo) => todo.category).filter(Boolean)),
          ];
          setCategories(categories);
        } else if (todosResponse.status === "rejected") {
          console.error("Failed to fetch todos:", todosResponse.reason);
          setError("Failed to load todos. Please refresh the page.");
        }

        // Handle stats response
        if (
          statsResponse.status === "fulfilled" &&
          statsResponse.value.success
        ) {
          setStats(statsResponse.value.data.stats);
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array for initial load only

  // Fetch todos when filters change (debounced to prevent rapid calls)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTodos();
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [filters, fetchTodos]);

  const handleCreateTodo = async (todoData) => {
    try {
      console.log("Submitting todo:", todoData);
      const response = await todoService.createTodo(todoData);

      if (response.success) {
        setTodos([response.data.todo, ...todos]);
        setShowForm(false);
        fetchCategories();
        fetchStats();
        setError(""); // Clear any existing errors
      } else {
        // Handle validation errors from backend
        if (response.data?.errors) {
          const errorMessages = response.data.errors
            .map((err) => `${err.field || err.param}: ${err.message}`)
            .join(", ");
          console.error("Validation errors:", response.data.errors);
          setError(`Validation failed: ${errorMessages}`);
        } else {
          setError(response.message || "Failed to create todo");
        }
      }
    } catch (err) {
      console.error("Create todo catch error:", err);
      setError(err.message || "Failed to create todo");
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const response = await todoService.updateTodo(id, todoData);
      if (response.success) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? response.data.todo : todo)),
        );
        setEditingTodo(null);

        // Update categories if needed
        const newCategory = todoData.category;
        if (newCategory && !categories.includes(newCategory)) {
          setCategories((prev) => [...prev, newCategory]);
        }

        fetchStats();
        setError("");
      } else {
        setError(response.message || "Failed to update todo");
      }
    } catch (err) {
      console.error("Update todo error:", err);
      setError(err.message || "Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      const response = await todoService.deleteTodo(id);
      if (response.success) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
        fetchStats();
        setError("");
      } else {
        setError(response.message || "Failed to delete todo");
      }
    } catch (err) {
      console.error("Delete todo error:", err);
      setError(err.message || "Failed to delete todo");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await todoService.toggleTodoStatus(id);
      if (response.success) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? response.data.todo : todo)),
        );
        fetchStats();
      } else {
        setError(response.message || "Failed to update todo status");
      }
    } catch (err) {
      console.error("Toggle status error:", err);
      setError(err.message || "Failed to update todo status");
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleFormSubmit = (data) => {
    if (editingTodo) {
      handleUpdateTodo(editingTodo._id, data);
    } else {
      handleCreateTodo(data);
    }
  };

  const handleClearError = () => {
    setError("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const handleLocalSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const pendingCount = todos.filter((t) => t.status === "pending").length;
  const completedCount = todos.filter((t) => t.status === "completed").length;
  const completionRate =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Include Header inside Dashboard */}
      
      <main className="page-container section-padding">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg flex items-center justify-between animate-fade-in">
            <p className="text-danger-700">{error}</p>
            <button
              onClick={handleClearError}
              className="text-danger-500 hover:text-danger-700"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {todos.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-warning-600 mt-2">
                  {pendingCount}
                </p>
              </div>
              <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-success-600 mt-2">
                  {completedCount}
                </p>
              </div>
              <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-primary-600 mt-2">
                  {completionRate}%
                </p>
              </div>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar with Search in Center */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            {/* Left side: Page title and stats */}
            <div className="lg:w-1/4">
              <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
              <p className="text-gray-600 mt-1">
                {todos.length} task{todos.length !== 1 ? "s" : ""} total
                {pendingCount > 0 && ` • ${pendingCount} pending`}
              </p>
            </div>
            
         
            {/* Right side: Actions */}
            <div className="lg:w-1/4">
              <div className="flex items-center justify-end gap-3">
                {/* View Mode Toggle - Desktop only */}
                <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewMode === "list" ? "bg-primary-100 text-primary-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewMode === "grid" ? "bg-primary-100 text-primary-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                </div>

                {/* New Task Button - Desktop */}
                <Button
                  variant="primary"
                  onClick={() => setShowForm(true)}
                  icon={Plus}
                  className="hidden md:inline-flex"
                >
                  New Task
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Section (below the action bar) */}
          <TodoFilters
            filters={filters}
            onFilterChange={(key, value) => {
              setFilters((prev) => ({ ...prev, [key]: value }));
            }}
            onClearFilters={() => {
              setFilters({
                status: "",
                priority: "",
                category: "",
                search: "",
                sortBy: "createdAt",
                sortOrder: "desc",
              });
              setSearchQuery("");
            }}
            categories={categories}
            stats={stats}
          />
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading your tasks...</p>
          </div>
        ) : todos.length === 0 ? (
          <EmptyState
            onAddTask={() => setShowForm(true)}
            hasFilters={Object.values(filters).some((f) => f)}
          />
        ) : (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }`}
          >
            {todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={handleToggleStatus}
                onEdit={handleEdit}
                onDelete={handleDeleteTodo}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Mobile Floating Button */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 md:hidden bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 z-10 transition-transform hover:scale-105"
          aria-label="Add new task"
        >
          <Plus className="h-6 w-6" />
        </button>
      </main>

      {/* Todo Form Modal */}
      <TodoForm
        open={showForm || !!editingTodo}
        onClose={() => {
          setShowForm(false);
          setEditingTodo(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingTodo || {}}
        categories={categories}
      />
    </div>
  );
};

export default Dashboard;