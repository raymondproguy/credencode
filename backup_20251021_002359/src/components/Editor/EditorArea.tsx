import React from 'react'
import { useEditor } from '../../contexts/EditorContext'
import MonacoWrapper from './MonacoWrapper'

const EditorArea = () => {
  const { files, activeFile, setActiveFile, updateFile } = useEditor()
  
  const fileIcons = {
    'html': 'fab fa-html5',
    'css': 'fab fa-css3-alt', 
    'js': 'fab fa-js'
  }

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop()
    return fileIcons[ext] || 'fa-file'
  }

  const tabs = Object.keys(files).map(filename => ({
    id: filename,
    name: filename,
    icon: getFileIcon(filename)
  }))

  return (
    <div className="editor-area">
      <div className="tabs-container">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeFile === tab.id ? 'active' : ''}`}
            onClick={() => setActiveFile(tab.id)}
          >
            <i className={tab.icon}></i>
            <span>{tab.name}</span>
            <i className="fas fa-times tab-close"></i>
          </div>
        ))}
      </div>
      
      <div className="editor-pane">
        <div className="pane-header">
          <span>EDITOR</span>
          <div className="pane-actions">
            <button className="icon-btn" title="Split View">
              <i className="fas fa-columns"></i>
            </button>
          </div>
        </div>
        
        <MonacoWrapper
          value={files[activeFile]}
          language={activeFile.split('.').pop()}
          onChange={(value) => updateFile(activeFile, value)}
        />
      </div>
    </div>
  )
}

export default EditorArea
