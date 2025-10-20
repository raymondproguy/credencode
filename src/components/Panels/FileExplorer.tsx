import React from 'react'
import { useEditor } from '../../contexts/EditorContext'

const FileExplorer = () => {
  const { files, setActiveFile } = useEditor()

  const fileIcons = {
    'html': 'fab fa-html5',
    'css': 'fab fa-css3-alt',
    'js': 'fab fa-js'
  }

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop()
    return fileIcons[ext] || 'fa-file'
  }

  return (
    <div className="file-explorer">
      <div style={{ marginBottom: '16px', fontWeight: '600', fontSize: '15px' }}>
        CREDENCODE
      </div>
      
      {Object.keys(files).map(filename => (
        <div
          key={filename}
          className="file-item"
          onClick={() => setActiveFile(filename)}
        >
          <i className={getFileIcon(filename)}></i>
          <span>{filename}</span>
        </div>
      ))}
      
      <div style={{ marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
        <div>index.html</div>
        <div>style.css</div> 
        <div>script.js</div>
      </div>
    </div>
  )
}

export default FileExplorer
