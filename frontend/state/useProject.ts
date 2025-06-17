import { create } from 'zustand';

type Project = {
  _id: string;
  title: string;
  description: string;
};

type State = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
};

export const useProject = create<State>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));
