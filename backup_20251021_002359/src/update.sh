#!/bin/bash

echo "🚀 Starting CredenCode update..."
echo "📁 Current directory: $(pwd)"

# Check if we're in the credencode directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Please run this script from your credencode project root"
    exit 1
fi

# Backup current files
echo "📦 Creating backup..."
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup important files
cp -r src "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  No src directory to backup"
cp public/index.html "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  No public/index.html to backup"
cp package.json "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  No package.json to backup"

echo "✅ Backup created: $BACKUP_DIR"

# Install Monaco types if not already installed
echo "📦 Installing Monaco TypeScript types..."
npm install @types/monaco-editor

# Create updated files
echo "🔄 Updating files..."

# Update main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

console.log('🚀 main.tsx: Starting CredenCode app...')

const rootElement = document.getElementById('root')
console.log('🔍 main.tsx: Root element:', rootElement)

if (!rootElement) {
  console.error('❌ main.tsx: Failed to find the root element!')
  throw new Error('Failed to find the root element')
}

try {
  console.log('🔄 main.tsx: Creating React root...')
  const root = ReactDOM.createRoot(rootElement)
  console.log('✅ main.tsx: React root created successfully')
  
  console.log('🔄 main.tsx: Rendering App component...')
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('✅ main.tsx: App rendered successfully')
} catch (error) {
  console.error('❌ main.tsx: Error rendering app:', error)
  throw error
}
EOF
echo "✅ Updated src/main.tsx"

# Update App.tsx
cat > src/App.tsx << 'EOF'
import React, { useState, useEffect } from 'react'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import EditorArea from './components/Editor/EditorArea'
import FileExplorer from './components/Panels/FileExplorer'
import SearchPanel from './components/Panels/SearchPanel'
import SettingsPanel from './components/Panels/SettingsPanel'
import { EditorProvider } from './contexts/EditorContext'
import './App.css'

console.log('📦 App.tsx: Loading App component...')

function App() {
  console.log('🔄 App.tsx: Component rendering started')
  
  const [activePanel, setActivePanel] = useState('explorer')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  console.log('📊 App.tsx: State values -', {
    activePanel,
    isSidebarOpen, 
    isDarkMode
  })

  useEffect(() => {
    console.log('🎨 App.tsx: Theme changed to', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const renderPanel = () => {
    console.log('📁 App.tsx: Rendering panel:', activePanel)
    switch (activePanel) {
      case 'explorer':
        return <FileExplorer />
      case 'search':
        return <SearchPanel />
      case 'settings':
        return <SettingsPanel isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode} />
      default:
        return <FileExplorer />
    }
  }

  console.log('🔄 App.tsx: Returning JSX...')

  return (
    <EditorProvider>
      <div className={`app ${isDarkMode ? '' : 'light-mode'}`}>
        <Header 
          onMenuToggle={() => {
            console.log('📱 App.tsx: Menu toggle clicked')
            setIsSidebarOpen(!isSidebarOpen)
          }}
          isDarkMode={isDarkMode}
          onThemeToggle={(isDark) => {
            console.log('🌙 App.tsx: Theme toggle:', isDark ? 'dark' : 'light')
            setIsDarkMode(isDark)
          }}
        />
        
        <div className="main-container">
          <Sidebar 
            activePanel={activePanel}
            onPanelChange={(panel) => {
              console.log('📊 App.tsx: Panel changed to:', panel)
              setActivePanel(panel)
            }}
            isOpen={isSidebarOpen}
            onClose={() => {
              console.log('📱 App.tsx: Sidebar closed')
              setIsSidebarOpen(false)
            }}
          />
          
          {/* Panel Container */}
          <div className={`panel-container ${isSidebarOpen ? 'open' : ''}`}>
            <div className="panel-header">
              {activePanel === 'explorer' && 'EXPLORER'}
              {activePanel === 'search' && 'SEARCH'} 
              {activePanel === 'settings' && 'SETTINGS'}
            </div>
            {renderPanel()}
          </div>
          
          {/* Editor Area */}
          <div className="editor-area">
            <EditorArea isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </EditorProvider>
  )
}

console.log('✅ App.tsx: Component defined')

export default App
EOF
echo "✅ Updated src/App.tsx"

# Update EditorContext.tsx
cat > src/contexts/EditorContext.tsx << 'EOF'
import React, { createContext, useContext, useState, ReactNode } from 'react'

console.log('📁 EditorContext.tsx: Loading context...')

interface FileContent {
  [key: string]: string
}

interface EditorContextType {
  files: FileContent
  activeFile: string
  setActiveFile: (file: string) => void
  updateFile: (filename: string, content: string) => void
  executeCode: () => { success: boolean; url: string }
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export const useEditor = () => {
  console.log('🔄 EditorContext: useEditor hook called')
  const context = useContext(EditorContext)
  if (!context) {
    console.error('❌ EditorContext: useEditor must be used within an EditorProvider')
    throw new Error('useEditor must be used within an EditorProvider')
  }
  console.log('✅ EditorContext: Context found', Object.keys(context.files))
  return context
}

interface EditorProviderProps {
  children: ReactNode
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  console.log('🔄 EditorProvider: Component rendering')

  const [files, setFiles] = useState<FileContent>({
    'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome to CredenCode</h1>
    <p>Edit this code!</p>
</body>
</html>`,
    'style.css': `/* Add your CSS here */`,
    'script.js': `// Add your JavaScript here`
  })

  const [activeFile, setActiveFile] = useState<string>('index.html')

  console.log('📊 EditorProvider: State initialized', {
    files: Object.keys(files),
    activeFile
  })

  const updateFile = (filename: string, content: string) => {
    console.log('📝 EditorProvider: Updating file', filename, 'content length:', content.length)
    setFiles(prev => ({
      ...prev,
      [filename]: content
    }))
  }

  const executeCode = () => {
    console.log('🚀 EditorProvider: Executing code...')
    const htmlContent = files['index.html'] || ''
    const cssContent = files['style.css'] || ''
    const jsContent = files['script.js'] || ''
    
    console.log('📊 EditorProvider: File contents', {
      htmlLength: htmlContent.length,
      cssLength: cssContent.length, 
      jsLength: jsContent.length
    })
    
    const fullHTML = htmlContent
      .replace('</head>', `<style>${cssContent}</style></head>`)
      .replace('</body>', `<script>${jsContent}</script></body>`)
    
    console.log('📄 EditorProvider: Generated HTML length:', fullHTML.length)
    
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    console.log('🔗 EditorProvider: Opening preview URL')
    window.open(url, '_blank')
    
    return { success: true, url }
  }

  const value: EditorContextType = {
    files,
    activeFile,
    setActiveFile: (file: string) => {
      console.log('📁 EditorProvider: Setting active file to', file)
      setActiveFile(file)
    },
    updateFile,
    executeCode
  }

  console.log('✅ EditorProvider: Returning context provider')

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}
EOF
echo "✅ Updated src/contexts/EditorContext.tsx"

# Update MonacoWrapper.tsx
cat > src/components/Editor/MonacoWrapper.tsx << 'EOF'
import React, { useEffect, useRef } from 'react'
import { useEditor } from '../../contexts/EditorContext'

console.log('📁 MonacoWrapper.tsx: Loading component...')

interface MonacoWrapperProps {
  value: string
  language: string
  isDarkMode: boolean
}

const MonacoWrapper: React.FC<MonacoWrapperProps> = ({ value, language, isDarkMode }) => {
  console.log('🔄 MonacoWrapper: Component rendering', { language, isDarkMode, valueLength: value?.length })

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { updateFile, activeFile } = useEditor()

  // Check if Monaco is available
  useEffect(() => {
    console.log('🔍 MonacoWrapper: Checking Monaco availability...')
    console.log('🔍 MonacoWrapper: window.monaco:', window.monaco)
    console.log('🔍 MonacoWrapper: global.monaco:', global.monaco)
    console.log('🔍 MonacoWrapper: typeof monaco:', typeof monaco)
  }, [])

  useEffect(() => {
    console.log('🔄 MonacoWrapper: useEffect - Initializing editor')
    
    if (!containerRef.current) {
      console.error('❌ MonacoWrapper: Container ref is null!')
      return
    }

    console.log('🔍 MonacoWrapper: Container element:', containerRef.current)
    console.log('🔍 MonacoWrapper: Monaco global object:', window.monaco)

    if (!window.monaco) {
      console.error('❌ MonacoWrapper: Monaco editor is not available!')
      console.log('💡 MonacoWrapper: Make sure Monaco script is loaded in index.html')
      return
    }

    try {
      console.log('🚀 MonacoWrapper: Creating Monaco editor instance...')
      
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: value || '',
        language: language || 'html',
        theme: isDarkMode ? 'vs-dark' : 'vs',
        fontSize: 14,
        fontFamily: "'Fira Code', monospace",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on'
      })

      console.log('✅ MonacoWrapper: Editor created successfully!')

      // Handle content changes
      editorRef.current.onDidChangeModelContent(() => {
        if (editorRef.current) {
          const newValue = editorRef.current.getValue()
          console.log('📝 MonacoWrapper: Content changed, length:', newValue.length)
          updateFile(activeFile, newValue)
        }
      })

    } catch (error) {
      console.error('❌ MonacoWrapper: Error creating editor:', error)
      console.log('💡 MonacoWrapper: Trying fallback textarea...')
      
      // Fallback: Create a simple textarea
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <textarea 
            style="width:100%; height:100%; background:#1e1e1e; color:white; border:none; padding:15px; font-family:monospace; font-size:14px;"
            spellcheck="false"
          >${value}</textarea>
        `
        const textarea = containerRef.current.querySelector('textarea')
        if (textarea) {
          textarea.addEventListener('input', (e) => {
            updateFile(activeFile, (e.target as HTMLTextAreaElement).value)
          })
        }
      }
    }

    return () => {
      console.log('🧹 MonacoWrapper: Cleaning up editor')
      if (editorRef.current) {
        editorRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    console.log('🎨 MonacoWrapper: Theme changed to', isDarkMode ? 'dark' : 'light')
    if (editorRef.current) {
      try {
        editorRef.current.updateOptions({
          theme: isDarkMode ? 'vs-dark' : 'vs'
        })
        console.log('✅ MonacoWrapper: Theme updated successfully')
      } catch (error) {
        console.error('❌ MonacoWrapper: Error updating theme:', error)
      }
    }
  }, [isDarkMode])

  useEffect(() => {
    console.log('📝 MonacoWrapper: Value prop changed, length:', value?.length)
    if (editorRef.current && value !== undefined) {
      try {
        const currentValue = editorRef.current.getValue()
        if (currentValue !== value) {
          console.log('🔄 MonacoWrapper: Updating editor value')
          editorRef.current.setValue(value)
        }
      } catch (error) {
        console.error('❌ MonacoWrapper: Error updating value:', error)
      }
    }
  }, [value])

  useEffect(() => {
    console.log('🔤 MonacoWrapper: Language changed to', language)
    if (editorRef.current) {
      try {
        const model = editorRef.current.getModel()
        if (model) {
          monaco.editor.setModelLanguage(model, language)
          console.log('✅ MonacoWrapper: Language updated successfully')
        }
      } catch (error) {
        console.error('❌ MonacoWrapper: Error updating language:', error)
      }
    }
  }, [language])

  console.log('✅ MonacoWrapper: Returning JSX')

  return <div ref={containerRef} className="monaco-container" style={{ width: '100%', height: '100%' }} />
}

export default MonacoWrapper
EOF
echo "✅ Updated src/components/Editor/MonacoWrapper.tsx"

# Update public/index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CredenCode - Mobile Code Editor</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        margin: 0;
        padding: 0;
        background: #1e1e1e;
        color: #ffffff;
        height: 100vh;
        overflow: hidden;
      }
      
      #root {
        height: 100vh;
      }
      
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading">Loading CredenCode...</div>
    </div>
    
    <!-- Monaco Editor Script -->
    <script>
      console.log('📦 index.html: Loading Monaco Editor...');
      var require = { paths: { 'vs': 'https://unpkg.com/monaco-editor@0.33.0/min/vs' } };
    </script>
    <script src="https://unpkg.com/monaco-editor@0.33.0/min/vs/loader.js"></script>
    <script>
      console.log('✅ index.html: Monaco script loaded');
    </script>
    
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
echo "✅ Updated public/index.html"

# Update App.css with missing styles
cat >> src/App.css << 'EOF'

/* Sidebar overlay for mobile */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 998;
  display: none;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
  }
}

/* Ensure Monaco container is visible */
.monaco-container {
  width: 100% !important;
  height: 100% !important;
}

/* Panel container styles */
.panel-container {
  width: 200px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 15px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-tertiary);
}

.file-explorer {
  padding: 15px;
  flex: 1;
}

.project-files {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.file-item {
  display: flex;b
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
}

.file-item.active {
  background: var(--accent-blue);
  color: white;
}

.search-panel, .settings-panel {
  padding: 15px;
}

.search-input {
  width: 100%;
  padding: 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-primary);
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
}
EOF
echo "✅ Updated src/App.css with missing styles"

echo ""
echo "🎉 Update complete!"
echo ""
echo "📋 Next steps:"
echo "1. Run: npm run dev"
echo "2. Open browser console (F12)"
echo "3. Check for any errors"
echo "4. Look for debug logs starting with 🚀, 🔍, ✅, ❌"
echo ""
echo "💾 Your original files are backed up in: $BACKUP_DIR"
echo "🔄 If anything goes wrong, you can restore from backup"
