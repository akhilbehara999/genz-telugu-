import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Loader2, CheckCircle2 } from 'lucide-react';

export function PyodideStatusBar() {
  const { pyodideStatus, pyodideMessage, initPyodide } = useStore();

  useEffect(() => {
    if (pyodideStatus === 'idle') {
      initPyodide();
    }
  }, [pyodideStatus, initPyodide]);

  if (pyodideStatus === 'idle') return null;

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 border-b border-primary/20 text-xs">
      {pyodideStatus === 'loading' && (
        <>
          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
          <span className="text-primary">{pyodideMessage}</span>
        </>
      )}
      {pyodideStatus === 'ready' && (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          <span className="text-success">Python engine ready! Run your code 🔥</span>
        </>
      )}
    </div>
  );
}
