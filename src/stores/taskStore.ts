import { create } from 'zustand';
import { format } from 'date-fns';

export type TaskCategory = {
  id: string;
  name: string;
  color: string;
};

export type StoryType = 'story' | 'task' | 'bug' | 'epic';

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee?: string;
  categoryId?: string;
  dependencies: string[];
  estimatedHours?: number;
  type: StoryType;
  parentId?: string; // For sub-tasks or stories under epics
  storyPoints?: number;
  acceptanceCriteria?: string[];
};

type TaskStore = {
  tasks: Task[];
  categories: TaskCategory[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  deleteTask: (id: string) => void;
  addCategory: (category: Omit<TaskCategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
  addDependency: (taskId: string, dependencyId: string) => void;
  removeDependency: (taskId: string, dependencyId: string) => void;
  getTaskDependencies: (taskId: string) => {
    blockedBy: Task[];
    blocking: Task[];
  };
  getEpicChildren: (epicId: string) => Task[];
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  categories: [
    { id: '1', name: 'Frontend', color: '#3B82F6' },
    { id: '2', name: 'Backend', color: '#10B981' },
    { id: '3', name: 'UI/UX', color: '#8B5CF6' },
    { id: '4', name: 'Testing', color: '#F59E0B' },
    { id: '5', name: 'Documentation', color: '#6B7280' }
  ],
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9) }]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) => 
      task.id === id ? { ...task, ...updates } : task
    )
  })),
  
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),
  
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, { ...category, id: Math.random().toString(36).substr(2, 9) }]
  })),
  
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id)
  })),
  
  addDependency: (taskId, dependencyId) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId
        ? { ...task, dependencies: [...task.dependencies, dependencyId] }
        : task
    )
  })),
  
  removeDependency: (taskId, dependencyId) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId
        ? { ...task, dependencies: task.dependencies.filter(id => id !== dependencyId) }
        : task
    )
  })),

  getTaskDependencies: (taskId) => {
    const state = get();
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return { blockedBy: [], blocking: [] };

    return {
      // Tasks that this task depends on
      blockedBy: state.tasks.filter(t => task.dependencies.includes(t.id)),
      // Tasks that depend on this task
      blocking: state.tasks.filter(t => t.dependencies.includes(taskId))
    };
  },

  getEpicChildren: (epicId) => {
    const state = get();
    return state.tasks.filter(task => task.parentId === epicId);
  }
}));