import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Play, Save, Copy, Download, FilePlus, ArrowLeftRight, Share2, FileCode } from 'lucide-react';
import { generateShareUrl } from '../utils/share';

export function Toolbar() {
  const { currentProject, runCode, saveProject, translateCode, createNewProject } = useStore();
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!currentProject) return null;

  const handleCopy = () => {
    const code = currentProject.pythonCode || currentProject.code;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPy = () => {
    const code = currentProject.pythonCode || currentProject.code;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.name.replace(/\s+/g, '_')}.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadGzt = () => {
    const data = JSON.stringify({
      name: currentProject.name,
      code: currentProject.code,
      version: '1.0',
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.name.replace(/\s+/g, '_')}.gzt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const url = generateShareUrl({
      code: currentProject.code,
      name: currentProject.name,
    });
    await navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleRun = async () => {
    translateCode();
    await runCode();
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-[#0F172A] flex-wrap">
      <button
        onClick={handleRun}
        className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/80 text-white text-sm font-medium transition-all hover:scale-105 active:scale-95"
        title="Run (Ctrl+Enter)"
      >
        <Play className="w-4 h-4" />
        Run
      </button>

      <button
        onClick={translateCode}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all"
        title="Translate to Python"
      >
        <ArrowLeftRight className="w-4 h-4" />
        Translate
      </button>

      <button
        onClick={saveProject}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all"
        title="Save (Ctrl+S)"
      >
        <Save className="w-4 h-4" />
        Save
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all"
        title="Copy Python code"
      >
        <Copy className="w-4 h-4" />
        {copied ? 'Copied!' : 'Copy'}
      </button>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <button
        onClick={handleDownloadPy}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all"
        title="Download as .py"
      >
        <Download className="w-4 h-4" />
        .py
      </button>

      <button
        onClick={handleDownloadGzt}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all"
        title="Download as .gzt project file"
      >
        <FileCode className="w-4 h-4" />
        .gzt
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all"
        title="Copy shareable link"
      >
        <Share2 className="w-4 h-4" />
        {shareCopied ? 'Link Copied!' : 'Share'}
      </button>

      <div className="flex-1" />

      <button
        onClick={createNewProject}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-sm font-medium transition-all"
      >
        <FilePlus className="w-4 h-4" />
        New
      </button>
    </div>
  );
}
