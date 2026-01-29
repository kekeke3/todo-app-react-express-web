import React from "react";
import { CheckCircle2, Clock, TrendingUp, Calendar } from "lucide-react";

const TodoStats = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total || 0,
      icon: CheckCircle2,
      color: "text-primary-600",
      bgColor: "bg-primary-100",
    },
    {
      label: "Pending",
      value: stats.pending || 0,
      icon: Clock,
      color: "text-warning-600",
      bgColor: "bg-warning-100",
    },
    {
      label: "Completed",
      value: stats.completed || 0,
      icon: CheckCircle2,
      color: "text-success-600",
      bgColor: "bg-success-100",
    },
    {
      label: "Completion Rate",
      value: `${stats.completionRate || 0}%`,
      icon: TrendingUp,
      color: "text-primary-600",
      bgColor: "bg-primary-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="card p-4 hover:shadow-card-hover transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div
              className={`h-10 w-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>

          {stat.label === "Completion Rate" && (
            <div className="mt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{ width: `${stats.completionRate || 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoStats;
