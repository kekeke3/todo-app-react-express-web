import React from "react";
import clsx from "clsx";

const Loader = ({ size = "md", variant = "primary", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4",
  };

  const variantClasses = {
    primary: "border-primary-500 border-t-transparent",
    secondary: "border-gray-500 border-t-transparent",
    white: "border-white border-t-transparent",
    danger: "border-danger-500 border-t-transparent",
    success: "border-success-500 border-t-transparent",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "animate-spin rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Loader size="lg" variant="primary" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

const InlineLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader size="sm" variant="primary" />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
};

Loader.Page = PageLoader;
Loader.Inline = InlineLoader;

export default Loader;
