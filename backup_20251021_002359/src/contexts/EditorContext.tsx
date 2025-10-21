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
