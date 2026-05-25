import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
import { useStore } from '../store/useStore';
import { FileCode } from 'lucide-react';

export function PythonPreview() {
  const { translatedCode, settings } = useStore();
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(translatedCode || '# Translated Python will appear here');
    }
  }, [translatedCode]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    editor.updateOptions({
      theme: 'genz-dark',
      fontSize: settings.fontSize,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      wordWrap: 'on',
      readOnly: true,
      padding: { top: 16, bottom: 16 },
      lineNumbers: 'on',
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0B1120]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-[#0F172A]">
        <FileCode className="w-4 h-4 text-green-400" />
        <span className="text-sm font-medium text-slate-300">Translated Python</span>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="python"
          value={translatedCode || '# Run or translate to see Python code here'}
          onMount={handleEditorDidMount}
          theme="genz-dark"
          options={{
            fontSize: settings.fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            readOnly: true,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        />
      </div>
    </div>
  );
}
