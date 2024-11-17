import React from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';

type Props = {
  taskId: string;
  onClose: () => void;
};

export default function DependencyModal({ taskId, onClose }: Props) {
  const { tasks, getTaskDependencies, addDependency, removeDependency } = useTaskStore();
  const task = tasks.find(t => t.id === taskId);
  const { blockedBy, blocking } = getTaskDependencies(taskId);
  
  const availableTasks = tasks.filter(t => 
    t.id !== taskId && 
    !blockedBy.find(b => b.id === t.id) &&
    !blocking.find(b => b.id === t.id)
  );

  if (!task) return null;

  const handleAddDependency = (dependencyId: string, direction: 'blockedBy' | 'blocking') => {
    if (direction === 'blockedBy') {
      addDependency(taskId, dependencyId);
    } else {
      addDependency(dependencyId, taskId);
    }
  };

  const handleRemoveDependency = (dependencyId: string, direction: 'blockedBy' | 'blocking') => {
    if (direction === 'blockedBy') {
      removeDependency(taskId, dependencyId);
    } else {
      removeDependency(dependencyId, taskId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Dependencies for: {task.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Blocked By */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Blocked By
            </h3>
            <div className="space-y-2">
              {blockedBy.map(dependency => (
                <div key={dependency.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span>{dependency.title}</span>
                  <button
                    onClick={() => handleRemoveDependency(dependency.id, 'blockedBy')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <select
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddDependency(e.target.value, 'blockedBy');
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Add dependency...</option>
                {availableTasks.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Blocking */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              Blocking
              <ArrowRight className="h-4 w-4" />
            </h3>
            <div className="space-y-2">
              {blocking.map(dependency => (
                <div key={dependency.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span>{dependency.title}</span>
                  <button
                    onClick={() => handleRemoveDependency(dependency.id, 'blocking')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <select
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddDependency(e.target.value, 'blocking');
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Add dependency...</option>
                {availableTasks.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}