import { create } from 'zustand';

export type ProjectTheme = {
  id: string;
  name: string;
  color: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  themeId: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
};

type ProjectStore = {
  projects: Project[];
  themes: ProjectTheme[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTheme: (theme: Omit<ProjectTheme, 'id'>) => void;
  deleteTheme: (id: string) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  themes: [
    { id: '1', name: 'Development', color: '#3B82F6' },
    { id: '2', name: 'Marketing', color: '#10B981' },
    { id: '3', name: 'Design', color: '#8B5CF6' },
    { id: '4', name: 'Research', color: '#F59E0B' }
  ],
  
  addProject: (project) => set((state) => ({
    projects: [...state.projects, { ...project, id: Math.random().toString(36).substr(2, 9) }]
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((project) => 
      project.id === id ? { ...project, ...updates } : project
    )
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((project) => project.id !== id)
  })),
  
  addTheme: (theme) => set((state) => ({
    themes: [...state.themes, { ...theme, id: Math.random().toString(36).substr(2, 9) }]
  })),
  
  deleteTheme: (id) => set((state) => ({
    themes: state.themes.filter((theme) => theme.id !== id)
  }))
}));