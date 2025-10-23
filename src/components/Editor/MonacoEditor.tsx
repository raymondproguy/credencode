import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { 
  configureCodeIntelligence, 
  configureErrorChecking, 
  registerSnippets 
} from '../../utils/monaco-intelligence';

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
  // Configure code intelligence when component mounts
  useEffect(() => {
    // This will run when the Monaco editor is loaded
    const initializeIntelligence = async () => {
      configureCodeIntelligence();
      configureErrorChecking();
      registerSnippets();
    };

    // We'll initialize when the editor mounts
  }, []);

  const handleEditorMount = (editor: any, monaco: any) => {
    // Configure code intelligence features
    configureCodeIntelligence();
    configureErrorChecking();
    registerSnippets();

    // Enable additional editor features
    editor.updateOptions({
      quickSuggestions: true,
      parameterHints: { enabled: true },
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on',
      wordBasedSuggestions: true,
      snippetSuggestions: 'inline'
    });

    // Call the original onMount callback if provided
    if (onMount) {
      onMount(editor);
    }
  };

  return (
    <div className="editor-container">
      <Editor
        height="100%"
        value={value}
        language={language}
        theme={theme}
        onChange={onChange}
        onMount={handleEditorMount}
        loading={<div style={{ padding: '20px', color: '#ccc' }}>Loading Editor...</div>}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Courier New', monospace",
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          matchBrackets: 'always',
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8
          },
          // Intelligence options
          quickSuggestions: true,
          parameterHints: { enabled: true },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: 'on',
          wordBasedSuggestions: true,
          snippetSuggestions: 'inline',
          // Error checking
          glyphMargin: true,
          lightbulb: { enabled: true },
          renderLineHighlight: 'all'
        }}
      />
    </div>
  );
};
