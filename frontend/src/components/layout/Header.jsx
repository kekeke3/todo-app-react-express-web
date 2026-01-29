import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Settings,
  Bell,
  ChevronDown,
  Search,
  Menu,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

const Header = ({ onNewTask, onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  // Navigation handlers
  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    navigate("/settings");
  };

  return (
    <header className="bg-white px-8 shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="page-container py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and brand */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-sm text-gray-600">Productivity Dashboard</p>
            </div>
          </div>

          {/* Center - Search (Desktop only) */}
          {onSearch && (
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="input pl-10"
                />
              </div>
            </div>
          )}

          {/* Right side - User actions */}
          <div className="flex items-center gap-4">
            {/* Mobile search button */}
            {onSearch && (
              <button className="md:hidden p-2 text-gray-500 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </button>
            )}

            {/* Notifications */}
            <button
              onClick={() => navigate("/notifications")}
              className="relative p-2 text-gray-500 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-danger-500 rounded-full border border-white"></span>
            </button>

            {/* New Task Button (Desktop) */}
            {onNewTask && (
              <Button
                variant="primary"
                onClick={onNewTask}
                icon={Plus}
                className="hidden md:inline-flex"
              >
                New Task
              </Button>
            )}

            {/* User profile and dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />

                  {/* Dropdown content */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 animate-slide-down">
                    {/* User info */}
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </button>
                      <button
                        onClick={handleSettingsClick}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
