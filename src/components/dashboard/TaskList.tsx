import React from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { useProjectStore } from '../../stores/projectStore';
import { Calendar, CheckCircle2, Clock, Link } from 'lucide-react';

export default function TaskList() {
  const { tasks, categories } = useTaskStore();
  const { projects } = useProjectStore();

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'No Project';
  };

  const getCategory = (categoryId?: string) => {
    return categories.find(c => c.id === categoryId);
  };

  const getDependencyCount = (dependencies: string[]) => {
    return dependencies.length;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Recent Tasks</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {tasks.map((task) => {
          const category = getCategory(task.categoryId);
          const dependencyCount = getDependencyCount(task.dependencies);
          
          return (
            <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <button className="mt-1">
                    <CheckCircle2 className={`h-5 w-5 ${
                      task.status === 'done' 
                        ? 'text-green-500' 
                        : 'text-gray-400 hover:text-green-500'
                    } transition-colors`} />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      {category && (
                        <span 
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: `${category.color}20`,
                            color: category.color 
                          }}
                        >
                          {category.name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{getProjectName(task.projectId)}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{task.estimatedHours}h</span>
                      </div>
                      {dependencyCount > 0 && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Link className="h-4 w-4 mr-1" />
                          <span>{dependencyCount} dependencies</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-600'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {task.priority}
                  </span>
                  {task.assignee && (
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignee)}&background=random`}
                      alt={task.assignee}
                      className="w-6 h-6 rounded-full"
                      title={task.assignee}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}