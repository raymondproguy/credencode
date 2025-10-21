import React from 'react'

const Header = ({ onMenuToggle, isDarkMode, onThemeToggle }) => {
  return (
    <header className="header">
      <div className="logo">
        <button className="icon-btn mobile-menu-btn" onClick={onMenuToggle}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="logo-design">
          <span className="logo-brackets">&lt;/&gt;</span>
          <span className="logo-text">CredenCode</span>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="icon-btn" title="Format Code">
          <i className="fas fa-indent"></i>
        </button>
        <button className="icon-btn" title="Run Code">
          <i className="fas fa-play"></i>
        </button>
        <label className="theme-toggle" title="Toggle Theme">
          <input 
            type="checkbox" 
            checked={!isDarkMode}
            onChange={(e) => onThemeToggle(!e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  )
}

export default Header
