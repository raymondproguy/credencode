import React from 'react'

const SettingsPanel = ({ isDarkMode, onThemeToggle }) => {
  return (
    <div className="settings-panel">
      <div className="setting-item">
        <span>Dark Mode</span>
        <label className="theme-toggle">
          <input 
            type="checkbox" 
            checked={!isDarkMode}
            onChange={(e) => onThemeToggle(!e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="setting-item">
        <span>Font Size</span>
        <span>14px</span>
      </div>
      
      <div className="setting-item">
        <span>Word Wrap</span>
        <span>On</span>
      </div>
      
      <div className="setting-item">
        <span>Auto Save</span>
        <span>Enabled</span>
      </div>
    </div>
  )
}

export default SettingsPanel
