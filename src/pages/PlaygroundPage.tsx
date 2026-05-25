import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { useSharedCode } from '../hooks/useSharedCode';
import { CodeEditor } from '../components/CodeEditor';
import { OutputConsole } from '../components/OutputConsole';
import { PythonPreview } from '../components/PythonPreview';
import { PyodideStatusBar } from '../components/PyodideStatusBar';
import { Toolbar } from '../components/Toolbar';
import { KeywordReference } from '../components/KeywordReference';
import { Code2, Terminal, FileCode } from 'lucide-react';

type Tab = 'editor' | 'python' | 'output';

export function PlaygroundPage() {
  const { currentProject, createNewProject } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('editor');

  useSharedCode();

  useEffect(() => {
    if (!currentProject) {
      createNewProject();
    }
  }, [currentProject, createNewProject]);

  const tabs: { id: Tab; icon: typeof Code2; label: string }[] = [
    { id: 'editor', icon: Code2, label: 'GenZ Telugu' },
    { id: 'python', icon: FileCode, label: 'Python' },
    { id: 'output', icon: Terminal, label: 'Output' },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] pt-16 flex flex-col">
      <Toolbar />
      <PyodideStatusBar />

      {/* Mobile tabs */}
      <div className="flex lg:hidden border-b border-white/5 bg-[#0F172A]">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-all ${
              activeTab === id
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0">
          {/* Desktop: 3-column layout */}
          <div className="hidden lg:grid grid-cols-3 h-full">
            <div className="border-r border-white/5 min-h-0">
              <CodeEditor />
            </div>
            <div className="border-r border-white/5 min-h-0">
              <PythonPreview />
            </div>
            <div className="min-h-0">
              <OutputConsole />
            </div>
          </div>

          {/* Mobile: tabbed */}
          <div className="lg:hidden h-full">
            {activeTab === 'editor' && <CodeEditor />}
            {activeTab === 'python' && <PythonPreview />}
            {activeTab === 'output' && <OutputConsole />}
          </div>
        </div>

        {/* Keyword Reference (collapsible) */}
        <KeywordReference />
      </div>
    </div>
  );
}
