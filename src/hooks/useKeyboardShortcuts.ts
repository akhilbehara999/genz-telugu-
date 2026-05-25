import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useKeyboardShortcuts() {
  const { runCode, saveProject, createNewProject } = useStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'Enter') {
          e.preventDefault();
          runCode();
        } else if (e.key === 's') {
          e.preventDefault();
          saveProject();
        } else if (e.key === 'n') {
          e.preventDefault();
          createNewProject();
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [runCode, saveProject, createNewProject]);
}
