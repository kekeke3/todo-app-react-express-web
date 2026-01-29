import React from "react";
import { ClipboardList, Filter, PlusCircle } from "lucide-react";
import Button from "../ui/Button";

const EmptyState = ({ onAddTask, hasFilters = false }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto h-24 w-24 text-gray-300">
        <ClipboardList className="h-full w-full" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {hasFilters ? "No tasks match your filters" : "No tasks yet"}
      </h3>

      <p className="mt-2 text-gray-600 max-w-md mx-auto">
        {hasFilters
          ? "Try adjusting your filters to see more tasks, or create a new task."
          : "Get started by creating your first task. Keep track of what needs to be done and when."}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" onClick={onAddTask} icon={PlusCircle}>
          Create New Task
        </Button>

        {hasFilters && (
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            icon={Filter}
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {!hasFilters && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Tips</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="space-y-1">
              <div className="font-medium">Prioritize</div>
              <div>Set priority levels to focus on what matters</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Categorize</div>
              <div>Organize tasks by project or context</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Schedule</div>
              <div>Set due dates to stay on track</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
