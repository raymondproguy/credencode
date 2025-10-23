import * as monaco from 'monaco-editor';

// Enhanced language configurations and suggestions
export const configureCodeIntelligence = () => {
  // HTML Auto-completions
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      // Common HTML tags
      const htmlSuggestions = [
        // Basic tags
        { label: 'div', kind: monaco.languages.CompletionItemKind.Class, insertText: 'div' },
        { label: 'span', kind: monaco.languages.CompletionItemKind.Class, insertText: 'span' },
        { label: 'p', kind: monaco.languages.CompletionItemKind.Class, insertText: 'p' },
        { label: 'h1', kind: monaco.languages.CompletionItemKind.Class, insertText: 'h1' },
        { label: 'h2', kind: monaco.languages.CompletionItemKind.Class, insertText: 'h2' },
        { label: 'button', kind: monaco.languages.CompletionItemKind.Class, insertText: 'button' },
        { label: 'input', kind: monaco.languages.CompletionItemKind.Class, insertText: 'input' },
        { label: 'form', kind: monaco.languages.CompletionItemKind.Class, insertText: 'form' },
        
        // Semantic tags
        { label: 'header', kind: monaco.languages.CompletionItemKind.Class, insertText: 'header' },
        { label: 'footer', kind: monaco.languages.CompletionItemKind.Class, insertText: 'footer' },
        { label: 'main', kind: monaco.languages.CompletionItemKind.Class, insertText: 'main' },
        { label: 'section', kind: monaco.languages.CompletionItemKind.Class, insertText: 'section' },
        { label: 'article', kind: monaco.languages.CompletionItemKind.Class, insertText: 'article' },
        { label: 'nav', kind: monaco.languages.CompletionItemKind.Class, insertText: 'nav' },
        
        // Media tags
        { label: 'img', kind: monaco.languages.CompletionItemKind.Class, insertText: 'img' },
        { label: 'video', kind: monaco.languages.CompletionItemKind.Class, insertText: 'video' },
        { label: 'audio', kind: monaco.languages.CompletionItemKind.Class, insertText: 'audio' },
      ];

      return {
        suggestions: htmlSuggestions.map(suggestion => ({
          ...suggestion,
          range
        }))
      };
    }
  });

  // CSS Auto-completions
  monaco.languages.registerCompletionItemProvider('css', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      // Common CSS properties
      const cssProperties = [
        // Layout
        { label: 'display', kind: monaco.languages.CompletionItemKind.Property, insertText: 'display: $0;' },
        { label: 'position', kind: monaco.languages.CompletionItemKind.Property, insertText: 'position: $0;' },
        { label: 'flex', kind: monaco.languages.CompletionItemKind.Property, insertText: 'flex: $0;' },
        { label: 'grid', kind: monaco.languages.CompletionItemKind.Property, insertText: 'grid: $0;' },
        { label: 'margin', kind: monaco.languages.CompletionItemKind.Property, insertText: 'margin: $0;' },
        { label: 'padding', kind: monaco.languages.CompletionItemKind.Property, insertText: 'padding: $0;' },
        
        // Typography
        { label: 'font-size', kind: monaco.languages.CompletionItemKind.Property, insertText: 'font-size: $0;' },
        { label: 'font-weight', kind: monaco.languages.CompletionItemKind.Property, insertText: 'font-weight: $0;' },
        { label: 'color', kind: monaco.languages.CompletionItemKind.Property, insertText: 'color: $0;' },
        { label: 'text-align', kind: monaco.languages.CompletionItemKind.Property, insertText: 'text-align: $0;' },
        { label: 'line-height', kind: monaco.languages.CompletionItemKind.Property, insertText: 'line-height: $0;' },
        
        // Background
        { label: 'background', kind: monaco.languages.CompletionItemKind.Property, insertText: 'background: $0;' },
        { label: 'background-color', kind: monaco.languages.CompletionItemKind.Property, insertText: 'background-color: $0;' },
        { label: 'background-image', kind: monaco.languages.CompletionItemKind.Property, insertText: 'background-image: $0;' },
        
        // Effects
        { label: 'border', kind: monaco.languages.CompletionItemKind.Property, insertText: 'border: $0;' },
        { label: 'border-radius', kind: monaco.languages.CompletionItemKind.Property, insertText: 'border-radius: $0;' },
        { label: 'box-shadow', kind: monaco.languages.CompletionItemKind.Property, insertText: 'box-shadow: $0;' },
        { label: 'opacity', kind: monaco.languages.CompletionItemKind.Property, insertText: 'opacity: $0;' },
        { label: 'transform', kind: monaco.languages.CompletionItemKind.Property, insertText: 'transform: $0;' },
        
        // Animation
        { label: 'animation', kind: monaco.languages.CompletionItemKind.Property, insertText: 'animation: $0;' },
        { label: 'transition', kind: monaco.languages.CompletionItemKind.Property, insertText: 'transition: $0;' },
      ];

      // CSS values
      const cssValues = [
        // Display values
        { label: 'flex', kind: monaco.languages.CompletionItemKind.Value, insertText: 'flex' },
        { label: 'grid', kind: monaco.languages.CompletionItemKind.Value, insertText: 'grid' },
        { label: 'block', kind: monaco.languages.CompletionItemKind.Value, insertText: 'block' },
        { label: 'inline', kind: monaco.languages.CompletionItemKind.Value, insertText: 'inline' },
        { label: 'none', kind: monaco.languages.CompletionItemKind.Value, insertText: 'none' },
        
        // Position values
        { label: 'relative', kind: monaco.languages.CompletionItemKind.Value, insertText: 'relative' },
        { label: 'absolute', kind: monaco.languages.CompletionItemKind.Value, insertText: 'absolute' },
        { label: 'fixed', kind: monaco.languages.CompletionItemKind.Value, insertText: 'fixed' },
        { label: 'sticky', kind: monaco.languages.CompletionItemKind.Value, insertText: 'sticky' },
        
        // Color values
        { label: 'red', kind: monaco.languages.CompletionItemKind.Value, insertText: 'red' },
        { label: 'blue', kind: monaco.languages.CompletionItemKind.Value, insertText: 'blue' },
        { label: 'green', kind: monaco.languages.CompletionItemKind.Value, insertText: 'green' },
        { label: 'white', kind: monaco.languages.CompletionItemKind.Value, insertText: 'white' },
        { label: 'black', kind: monaco.languages.CompletionItemKind.Value, insertText: 'black' },
        { label: 'transparent', kind: monaco.languages.CompletionItemKind.Value, insertText: 'transparent' },
      ];

      const suggestions = [...cssProperties, ...cssValues];

      return {
        suggestions: suggestions.map(suggestion => ({
          ...suggestion,
          range
        }))
      };
    }
  });

  // JavaScript Auto-completions
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      // Common JavaScript keywords and functions
      const jsSuggestions = [
        // Console methods
        { label: 'console.log', kind: monaco.languages.CompletionItemKind.Function, insertText: 'console.log($0)' },
        { label: 'console.error', kind: monaco.languages.CompletionItemKind.Function, insertText: 'console.error($0)' },
        { label: 'console.warn', kind: monaco.languages.CompletionItemKind.Function, insertText: 'console.warn($0)' },
        
        // DOM methods
        { label: 'document.querySelector', kind: monaco.languages.CompletionItemKind.Function, insertText: 'document.querySelector(\'$0\')' },
        { label: 'document.getElementById', kind: monaco.languages.CompletionItemKind.Function, insertText: 'document.getElementById(\'$0\')' },
        { label: 'addEventListener', kind: monaco.languages.CompletionItemKind.Function, insertText: 'addEventListener(\'$1\', $0)' },
        
        // Array methods
        { label: 'forEach', kind: monaco.languages.CompletionItemKind.Method, insertText: 'forEach(($1) => {$0})' },
        { label: 'map', kind: monaco.languages.CompletionItemKind.Method, insertText: 'map(($1) => {$0})' },
        { label: 'filter', kind: monaco.languages.CompletionItemKind.Method, insertText: 'filter(($1) => {$0})' },
        { label: 'find', kind: monaco.languages.CompletionItemKind.Method, insertText: 'find(($1) => {$0})' },
        
        // String methods
        { label: 'toString', kind: monaco.languages.CompletionItemKind.Method, insertText: 'toString()' },
        { label: 'toLowerCase', kind: monaco.languages.CompletionItemKind.Method, insertText: 'toLowerCase()' },
        { label: 'toUpperCase', kind: monaco.languages.CompletionItemKind.Method, insertText: 'toUpperCase()' },
        
        // Common functions
        { label: 'setTimeout', kind: monaco.languages.CompletionItemKind.Function, insertText: 'setTimeout(() => {$0}, $1)' },
        { label: 'setInterval', kind: monaco.languages.CompletionItemKind.Function, insertText: 'setInterval(() => {$0}, $1)' },
        { label: 'fetch', kind: monaco.languages.CompletionItemKind.Function, insertText: 'fetch(\'$0\')' },
        
        // Keywords
        { label: 'function', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'function $1($2) {$0}' },
        { label: 'const', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'const ' },
        { label: 'let', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'let ' },
        { label: 'var', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'var ' },
        { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if ($1) {$0}' },
        { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for ($1; $2; $3) {$0}' },
        { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while ($1) {$0}' },
      ];

      return {
        suggestions: jsSuggestions.map(suggestion => ({
          ...suggestion,
          range
        }))
      };
    }
  });

  console.log('Code intelligence features loaded! 🧠');
};

// Error checking configuration
export const configureErrorChecking = () => {
  // Basic JavaScript validation
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });

  // Set compiler options
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    lib: ['ES2020', 'DOM']
  });
};

// Snippet provider
export const registerSnippets = () => {
  // HTML snippets
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: (model, position) => {
      const snippets = [
        {
          label: 'div',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '<div>${1:content}</div>',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a div element'
        },
        {
          label: 'button',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '<button onclick="${1:handleClick}">${2:Click me}</button>',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a button element'
        },
        {
          label: 'input',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '<input type="${1:text}" placeholder="${2:Enter text}" />',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create an input element'
        },
        {
          label: 'form',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            '<form onsubmit="${1:handleSubmit}">',
            '  ${2:<!-- form content -->}',
            '</form>'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a form element'
        }
      ];

      return { suggestions: snippets };
    }
  });

  // CSS snippets
  monaco.languages.registerCompletionItemProvider('css', {
    provideCompletionItems: (model, position) => {
      const snippets = [
        {
          label: 'flex-center',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'display: flex;',
            'justify-content: center;',
            'align-items: center;'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Flexbox centering'
        },
        {
          label: 'grid-layout',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'display: grid;',
            'grid-template-columns: ${1:1fr 1fr};',
            'gap: ${2:1rem};'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'CSS Grid layout'
        },
        {
          label: 'button-style',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'padding: ${1:0.5rem 1rem};',
            'background: ${2:#007acc};',
            'color: white;',
            'border: none;',
            'border-radius: ${3:4px};',
            'cursor: pointer;'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Basic button styling'
        }
      ];

      return { suggestions: snippets };
    }
  });

  // JavaScript snippets
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model, position) => {
      const snippets = [
        {
          label: 'function',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'function ${1:functionName}(${2:params}) {',
            '  ${3:// code}',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a function'
        },
        {
          label: 'arrow-function',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'const ${1:functionName} = (${2:params}) => {${3:// code}}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create an arrow function'
        },
        {
          label: 'event-listener',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            '${1:element}.addEventListener(\'${2:click}\', (${3:event}) => {',
            '  ${4:// handler code}',
            '});'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Add event listener'
        },
        {
          label: 'fetch-api',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'fetch(\'${1:url}\')',
            '  .then(response => response.json())',
            '  .then(data => {',
            '    ${2:// handle data}',
            '  })',
            '  .catch(error => {',
            '    console.error(\'Error:\', error);',
            '  });'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Fetch API call'
        }
      ];

      return { suggestions: snippets };
    }
  });
};
