import React, { useState } from 'react';
import { useTaskStore, Task, StoryType } from '../../stores/taskStore';
import { useProjectStore } from '../../stores/projectStore';
import { ChevronDown, ChevronRight, Link, Plus } from 'lucide-react';
import DependencyModal from './DependencyModal';

export default function StoryBoard() {
  const { tasks, getTaskDependencies, getEpicChildren } = useTaskStore();
  const { projects } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [expandedEpics, setExpandedEpics] = useState<Set<string>>(new Set());
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showDependencyModal, setShowDependencyModal] = useState(false);

  const filteredTasks = selectedProject
    ? tasks.filter(task => task.projectId === selectedProject)
    : tasks;

  const epics = filteredTasks.filter(task => task.type === 'epic');

  const toggleEpic = (epicId: string) => {
    const newExpanded = new Set(expandedEpics);
    if (newExpanded.has(epicId)) {
      newExpanded.delete(epicId);
    } else {
      newExpanded.add(epicId);
    }
    setExpandedEpics(newExpanded);
  };

  const handleDependencyClick = (taskId: string) => {
    setSelectedTask(taskId);
    setShowDependencyModal(true);
  };

  const renderTask = (task: Task, level: number = 0) => {
    const { blockedBy, blocking } = getTaskDependencies(task.id);
    const isEpic = task.type === 'epic';
    const isExpanded = expandedEpics.has(task.id);
    const children = isEpic ? getEpicChildren(task.id) : [];

    return (
      <div key={task.id} className="border-b border-gray-100">
        <div 
          className="flex items-center p-4 hover:bg-gray-50 transition-colors"
          style={{ paddingLeft: `${level * 2 + 1}rem` }}
        >
          {isEpic && (
            <button 
              onClick={() => toggleEpic(task.id)}
              className="mr-2"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                task.type === 'epic' ? 'bg-purple-100 text-purple-600' :
                task.type === 'story' ? 'bg-blue-100 text-blue-600' :
                task.type === 'bug' ? 'bg-red-100 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {task.type.toUpperCase()}
              </span>
              <h3 className="font-medium">{task.title}</h3>
            </div>
            
            {task.storyPoints && (
              <span className="text-sm text-gray-500 ml-2">
                {task.storyPoints} points
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleDependencyClick(task.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <Link className="h-4 w-4" />
              <span>{blockedBy.length + blocking.length}</span>
            </button>
            
            <span className={`px-2 py-1 text-xs rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-600' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
              'bg-green-100 text-green-600'
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

        {isExpanded && children.length > 0 && (
          <div className="ml-4">
            {children.map(child => renderTask(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Stories & Epics</h2>
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New Story
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {epics.map(epic => renderTask(epic))}
      </div>

      {showDependencyModal && selectedTask && (
        <DependencyModal
          taskId={selectedTask}
          onClose={() => {
            setShowDependencyModal(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}