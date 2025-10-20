import React, { useState } from 'react'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import EditorArea from './components/Editor/EditorArea'
import Preview from './components/Editor/Preview'
import FileExplorer from './components/Panels/FileExplorer'
import SearchPanel from './components/Panels/SearchPanel'
import SettingsPanel from './components/Panels/SettingsPanel'
import { EditorProvider } from './contexts/EditorContext'
import './App.css'

function App() {
  const [activePanel, setActivePanel] = useState('explorer')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const renderPanel = () => {
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

  return (
    <EditorProvider>
      <div className={`app ${isDarkMode ? '' : 'light-mode'}`}>
        <Header 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          onThemeToggle={setIsDarkMode}
        />
        
        <div className="main-container">
          <Sidebar 
            activePanel={activePanel}
            onPanelChange={setActivePanel}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              {activePanel === 'explorer' && 'Explorer'}
              {activePanel === 'search' && 'Search'}
              {activePanel === 'settings' && 'Settings'}
            </div>
            <div className="panel-container">
              {renderPanel()}
            </div>
          </div>
          
          <div className="editor-container">
            <EditorArea />
          </div>
        </div>
      </div>
    </EditorProvider>
  )
}

export default App
