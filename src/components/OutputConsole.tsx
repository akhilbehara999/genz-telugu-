import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Trash2, Terminal } from 'lucide-react';

export function OutputConsole() {
  const { output, clearOutput, isRunning } = useStore();
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="flex flex-col h-full bg-[#0B1120]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#0F172A]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-slate-300">Output</span>
          {isRunning && (
            <span className="text-xs text-accent animate-pulse">Running...</span>
          )}
        </div>
        <button
          onClick={clearOutput}
          className="p-1.5 rounded-md hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
          title="Clear console"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={consoleRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {output.length === 0 && !isRunning ? (
          <div className="text-slate-600 italic">
            Run your code to see output here...
          </div>
        ) : (
          output.map((line, index) => (
            <div
              key={index}
              className={`py-0.5 ${
                line.type === 'error'
                  ? 'text-red-400'
                  : line.type === 'stderr'
                  ? 'text-yellow-400'
                  : line.type === 'info'
                  ? 'text-blue-400'
                  : 'text-slate-300'
              }`}
            >
              {line.type === 'error' && <span className="text-red-500 mr-2">Error:</span>}
              {line.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
