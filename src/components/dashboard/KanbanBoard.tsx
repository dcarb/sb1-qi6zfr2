import React from 'react';
import { useTaskStore, Task } from '../../stores/taskStore';
import { useProjectStore } from '../../stores/projectStore';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' }
];

export default function KanbanBoard() {
  const { tasks, updateTaskStatus, categories } = useTaskStore();
  const { projects } = useProjectStore();
  const [selectedProject, setSelectedProject] = React.useState<string>('');

  const filteredTasks = selectedProject
    ? tasks.filter(task => task.projectId === selectedProject)
    : tasks;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as Task['status'];
      updateTaskStatus(taskId, newStatus);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => (
            <SortableContext
              key={column.id}
              items={filteredTasks.filter((task) => task.status === column.id).map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                title={column.title}
                columnId={column.id as Task['status']}
                tasks={filteredTasks.filter((task) => task.status === column.id)}
                categories={categories}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}