import React from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { format, differenceInDays, addDays, startOfWeek, endOfWeek } from 'date-fns';

export default function GanttChart() {
  const tasks = useTaskStore((state) => state.tasks);
  const today = new Date();
  const startDate = startOfWeek(today);
  const endDate = endOfWeek(addDays(today, 28));
  const totalDays = differenceInDays(endDate, startDate) + 1;

  const dateHeaders = Array.from({ length: totalDays }, (_, i) => 
    addDays(startDate, i)
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex">
          <div className="w-48 flex-shrink-0 p-4 border-r border-gray-200">
            <h3 className="font-semibold">Tasks</h3>
          </div>
          <div className="flex-1 grid grid-cols-7 gap-px bg-gray-200">
            {dateHeaders.map((date) => (
              <div
                key={date.toISOString()}
                className="bg-white p-2 text-center text-sm"
              >
                {format(date, 'MMM d')}
              </div>
            ))}
          </div>
        </div>

        {tasks.map((task) => (
          <div key={task.id} className="flex border-t border-gray-200">
            <div className="w-48 flex-shrink-0 p-4 border-r border-gray-200">
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-gray-600">{task.assignee}</p>
            </div>
            <div className="flex-1 grid grid-cols-7 gap-px bg-gray-200">
              {dateHeaders.map((date) => {
                const isTaskDay = format(date, 'yyyy-MM-dd') === task.dueDate;
                return (
                  <div
                    key={date.toISOString()}
                    className={`bg-white ${
                      isTaskDay ? 'bg-blue-100' : ''
                    }`}
                  >
                    {isTaskDay && (
                      <div className="h-full bg-blue-600 opacity-75" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}