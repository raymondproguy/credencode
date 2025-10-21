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
