import React from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useTaskStore } from '../../stores/taskStore';
import { GanttChart, Users, Clock, BarChart2 } from 'lucide-react';

export default function ProjectList() {
  const { projects, themes } = useProjectStore();
  const { tasks } = useTaskStore();

  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  const getProjectTheme = (themeId: string) => {
    return themes.find(theme => theme.id === themeId);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Active Projects</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="divide-y divide-gray-100">
        {projects.map((project) => {
          const progress = getProjectProgress(project.id);
          const theme = getProjectTheme(project.themeId);
          const projectTasks = tasks.filter(task => task.projectId === project.id);
          
          return (
            <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <span 
                    className="inline-block px-2 py-1 text-xs rounded-full mt-1"
                    style={{ 
                      backgroundColor: `${theme?.color}20`,
                      color: theme?.color 
                    }}
                  >
                    {theme?.name}
                  </span>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  project.status === 'completed' 
                    ? 'bg-green-100 text-green-600'
                    : project.status === 'on-hold'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="w-full max-w-xs">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="rounded-full h-2"
                      style={{ 
                        width: `${progress}%`,
                        backgroundColor: theme?.color 
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{projectTasks.length} tasks</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}