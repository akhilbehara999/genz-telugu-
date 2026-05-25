import { useEffect, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
import { useStore } from '../store/useStore';
import { KEYWORDS } from '../translator/translator';

const teluguKeywords = Object.keys(KEYWORDS);

export function CodeEditor() {
  const { currentProject, updateCode, settings } = useStore();
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    monaco.languages.register({ id: 'genztelugu' });

    monaco.languages.setMonarchTokensProvider('genztelugu', {
      keywords: teluguKeywords,
      tokenizer: {
        root: [
          [/#.*$/, 'comment'],
          [/"([^"\\]|\\.)*$/, 'string'],
          [/'([^'\\]|\\.)*$/, 'string'],
          [/"[^"\\]*"/, 'string'],
          [/'[^'\\]*'/, 'string'],
          [/\b(\d+)\b/, 'number'],
          [
            new RegExp(`\\b(${teluguKeywords.join('|')})\\b`),
            'keyword',
          ],
          [/[a-zA-Z_]\w*/, 'identifier'],
          [/[{}()\[\]]/, '@brackets'],
        ],
      },
    });

    monaco.editor.defineTheme('genz-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'C084FC', fontStyle: 'bold' },
        { token: 'string', foreground: '34D399' },
        { token: 'comment', foreground: '64748B', fontStyle: 'italic' },
        { token: 'number', foreground: 'F97316' },
        { token: 'identifier', foreground: 'E2E8F0' },
      ],
      colors: {
        'editor.background': '#0F172A',
        'editor.foreground': '#E2E8F0',
        'editor.lineHighlightBackground': '#1E293B',
        'editorCursor.foreground': '#6D28D9',
      },
    });

    editor.updateOptions({
      theme: 'genz-dark',
      fontSize: settings.fontSize,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      wordWrap: 'on',
      padding: { top: 16, bottom: 16 },
    });
  }, [settings.fontSize]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize: settings.fontSize });
    }
  }, [settings.fontSize]);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <div className="text-center">
          <p className="text-lg font-medium">No project open</p>
          <p className="text-sm mt-1">Create a new project or load an example</p>
        </div>
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      language="genztelugu"
      value={currentProject.code}
      onChange={(value) => value && updateCode(value)}
      onMount={handleEditorDidMount}
      theme="genz-dark"
      options={{
        fontSize: settings.fontSize,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        wordWrap: 'on',
        padding: { top: 16, bottom: 16 },
        fontFamily: "'JetBrains Mono', monospace",
      }}
    />
  );
}
