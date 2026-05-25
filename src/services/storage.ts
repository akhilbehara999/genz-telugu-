import type { Project, Settings } from '../types';

const PROJECTS_KEY = 'genz_projects';
const SETTINGS_KEY = 'genz_settings';
const RECENT_KEY = 'genz_recent';

export const storage = {
  getProjects: (): Project[] => {
    try {
      const data = localStorage.getItem(PROJECTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveProject: (project: Project): void => {
    const projects = storage.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    storage.updateRecent(project.id);
  },

  deleteProject: (id: string): void => {
    const projects = storage.getProjects().filter((p) => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    const recent = storage.getRecent().filter((rid) => rid !== id);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  },

  getProject: (id: string): Project | undefined => {
    return storage.getProjects().find((p) => p.id === id);
  },

  getRecent: (): string[] => {
    try {
      const data = localStorage.getItem(RECENT_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  updateRecent: (id: string): void => {
    const recent = storage.getRecent().filter((rid) => rid !== id);
    recent.unshift(id);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 10)));
  },

  getSettings: (): Settings => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data
        ? JSON.parse(data)
        : { theme: 'dark', fontSize: 14, autoSave: true };
    } catch {
      return { theme: 'dark', fontSize: 14, autoSave: true };
    }
  },

  saveSettings: (settings: Settings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },
};
