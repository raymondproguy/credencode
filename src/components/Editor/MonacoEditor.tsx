import React from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  language: string;
  theme: 'vs-dark' | 'vs';
  onChange: (value: string | undefined) => void;
  onMount?: (editor: any) => void;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language,
  theme,
  onChange,
  onMount
}) => {
  return (
    <div className="editor-container">
      <Editor
        height="100%"
        value={value}
        language={language}
        theme={theme}
        onChange={onChange}
        onMount={onMount}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Fira Code', monospace",
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'mouseover',
          matchBrackets: 'always',
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8
          }
        }}
      />
    </div>
  );
};
