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
