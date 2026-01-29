import React from "react";
import clsx from "clsx";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon: Icon,
  ...props
}) => {
  const baseClasses = "badge inline-flex items-center gap-1.5";

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-warning-100 text-warning-800",
    danger: "bg-danger-100 text-danger-800",
    pending: "badge-pending",
    completed: "badge-completed",
    high: "badge-high",
    medium: "badge-medium",
    low: "badge-low",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
};

export default Badge;
