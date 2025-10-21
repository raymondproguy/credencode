import React from 'react'
import { useEditor } from '../../contexts/EditorContext'

const Preview = () => {
  const { executeCode } = useEditor()

  return (
    <div className="preview-pane">
      <div className="pane-header">
        <span>PREVIEW</span>
        <div className="pane-actions">
          <button className="icon-btn" title="Refresh Preview">
            <i className="fas fa-redo"></i>
          </button>
          <button className="preview-button" onClick={executeCode}>
            Open Preview
          </button>
        </div>
      </div>
      
      <div className="preview-content">
        <div className="preview-placeholder">
          <i className="fas fa-eye" style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}></i>
          <p>Click "Open Preview" to view your code</p>
        </div>
      </div>
    </div>
  )
}

export default Preview
