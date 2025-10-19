import React, { createContext, useContext, useState } from 'react'

const EditorContext = createContext()

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}

export const EditorProvider = ({ children }) => {
  const [files, setFiles] = useState({
    'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            padding: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-align: center;
        }
        .card {
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 20px;
            margin: 20px auto;
            max-width: 500px;
            backdrop-filter: blur(10px);
        }
        button {
            background: #007aff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Welcome to CredenCode</h1>
    <div class="card">
        <p>Edit this code and see the live preview!</p>
        <button onclick="showMessage()">Click Me</button>
    </div>
    
    <script>
        function showMessage() {
            alert('Hello from CredenCode!');
        }
    </script>
</body>
</html>`,
    'style.css': `/* Add your CSS here */
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}`,
    'script.js': `// Add your JavaScript here
console.log('Welcome to CredenCode!');

function welcome() {
    return 'Hello from CredenCode!';
}

// Example function
function calculate(a, b) {
    return a + b;
}`
  })

  const [activeFile, setActiveFile] = useState('index.html')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const updateFile = (filename, content) => {
    setFiles(prev => ({
      ...prev,
      [filename]: content
    }))
  }

  const executeCode = () => {
    const htmlContent = files['index.html'] || ''
    const cssContent = files['style.css'] || ''
    const jsContent = files['script.js'] || ''
    
    const fullHTML = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`)
                               .replace('</body>', `<script>${jsContent}</script></body>`)
    
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    window.open(url, '_blank')
    
    return { success: true, url }
  }

  const value = {
    files,
    activeFile,
    setActiveFile,
    updateFile,
    executeCode,
    isPreviewOpen,
    setIsPreviewOpen
  }

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}
