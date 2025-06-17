import { create } from 'zustand';

type Project = {
  _id: string;
  title: string;
  description: string;
};

type ProjectStore = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
};

export const useProject = create<ProjectStore>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));
