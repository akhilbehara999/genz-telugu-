import { create } from 'zustand';
import type { Project, Settings, OutputLine, Example } from '../types';
import { storage } from '../services/storage';
import { translateToPython } from '../translator/translator';
import { runPythonCode, loadPyodide } from '../runtime/pyodide';
import { examples } from '../data/examples';

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  settings: Settings;
  output: OutputLine[];
  translatedCode: string;
  isRunning: boolean;
  pyodideStatus: 'idle' | 'loading' | 'ready';
  pyodideMessage: string;
  examples: Example[];

  setCurrentProject: (project: Project | null) => void;
  updateCode: (code: string) => void;
  translateCode: () => void;
  runCode: () => Promise<void>;
  saveProject: () => void;
  deleteProject: (id: string) => void;
  loadProject: (id: string) => void;
  createNewProject: () => void;
  updateSettings: (settings: Partial<Settings>) => void;
  clearOutput: () => void;
  loadExample: (example: Example) => void;
  initPyodide: () => Promise<void>;
}

const createDefaultProject = (): Project => ({
  id: crypto.randomUUID(),
  name: 'Untitled Project',
  code: 'cheppu("Hello ra mama! 🔥")',
  pythonCode: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useStore = create<AppState>((set, get) => ({
  projects: storage.getProjects(),
  currentProject: null,
  settings: storage.getSettings(),
  output: [],
  translatedCode: '',
  isRunning: false,
  pyodideStatus: 'idle',
  pyodideMessage: '',
  examples,

  setCurrentProject: (project) => set({ currentProject: project }),

  updateCode: (code) => {
    const current = get().currentProject;
    if (current) {
      const updated = { ...current, code, updatedAt: new Date().toISOString() };
      set({ currentProject: updated });
      if (get().settings.autoSave) {
        storage.saveProject(updated);
        set({ projects: storage.getProjects() });
      }
    }
  },

  translateCode: () => {
    const current = get().currentProject;
    if (current) {
      const python = translateToPython(current.code);
      const updated = {
        ...current,
        pythonCode: python,
        updatedAt: new Date().toISOString(),
      };
      set({ currentProject: updated, translatedCode: python });
    }
  },

  runCode: async () => {
    const current = get().currentProject;
    if (!current) return;

    const python = translateToPython(current.code);
    const updated = { ...current, pythonCode: python };
    set({ currentProject: updated, translatedCode: python, isRunning: true, output: [] });

    const { output } = await runPythonCode(python);

    set({
      output,
      isRunning: false,
      currentProject: { ...updated, updatedAt: new Date().toISOString() },
    });

    if (get().settings.autoSave) {
      storage.saveProject({ ...updated, updatedAt: new Date().toISOString() });
      set({ projects: storage.getProjects() });
    }
  },

  saveProject: () => {
    const current = get().currentProject;
    if (current) {
      const python = translateToPython(current.code);
      const updated = {
        ...current,
        pythonCode: python,
        updatedAt: new Date().toISOString(),
      };
      storage.saveProject(updated);
      set({ currentProject: updated, projects: storage.getProjects() });
    }
  },

  deleteProject: (id) => {
    storage.deleteProject(id);
    const current = get().currentProject;
    if (current?.id === id) {
      set({ currentProject: null });
    }
    set({ projects: storage.getProjects() });
  },

  loadProject: (id) => {
    const project = storage.getProject(id);
    if (project) {
      const python = translateToPython(project.code);
      set({
        currentProject: { ...project, pythonCode: python },
        translatedCode: python,
        output: [],
      });
    }
  },

  createNewProject: () => {
    const project = createDefaultProject();
    const python = translateToPython(project.code);
    set({
      currentProject: { ...project, pythonCode: python },
      translatedCode: python,
      output: [],
    });
    storage.saveProject({ ...project, pythonCode: python });
    set({ projects: storage.getProjects() });
  },

  updateSettings: (newSettings) => {
    const updated = { ...get().settings, ...newSettings };
    storage.saveSettings(updated);
    set({ settings: updated });
  },

  clearOutput: () => set({ output: [] }),

  loadExample: (example) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name: example.title,
      code: example.code,
      pythonCode: translateToPython(example.code),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set({
      currentProject: project,
      translatedCode: project.pythonCode,
      output: [],
    });
    storage.saveProject(project);
    set({ projects: storage.getProjects() });
  },

  initPyodide: async () => {
    if (get().pyodideStatus !== 'idle') return;
    set({ pyodideStatus: 'loading', pyodideMessage: 'Loading Python engine...' });
    try {
      await loadPyodide((msg) => {
        set({ pyodideMessage: msg });
        if (msg.includes('ready')) {
          set({ pyodideStatus: 'ready' });
        }
      });
    } catch {
      set({ pyodideStatus: 'idle', pyodideMessage: 'Failed to load Python engine' });
    }
  },
}));
