import React from 'react';
import { Task, TaskCategory } from '../../stores/taskStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'lucide-react';

type Props = {
  title: string;
  columnId: Task['status'];
  tasks: Task[];
  categories: TaskCategory[];
};

export default function KanbanColumn({ title, tasks, categories }: Props) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">{title} ({tasks.length})</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} categories={categories} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, categories }: { task: Task; categories: TaskCategory[] }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const category = categories.find(c => c.id === task.categoryId);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium">{task.title}</h4>
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
      
      <div className="flex items-center justify-between text-sm">
        <span className={`px-2 py-1 rounded-full ${
          task.priority === 'high' 
            ? 'bg-red-100 text-red-600'
            : task.priority === 'medium'
            ? 'bg-yellow-100 text-yellow-600'
            : 'bg-green-100 text-green-600'
        }`}>
          {task.priority}
        </span>
        
        <div className="flex items-center gap-2">
          {task.dependencies.length > 0 && (
            <span className="flex items-center text-gray-500">
              <Link className="h-4 w-4 mr-1" />
              {task.dependencies.length}
            </span>
          )}
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
}