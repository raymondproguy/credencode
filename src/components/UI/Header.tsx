import React from 'react';
import { Menu, Play, Moon, Sun, FolderOpen } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onFormatCode: () => void;
  onRunCode: () => void;
  onShowProjects: () => void;
  currentProjectName: string;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  theme,
  setTheme,
  onFormatCode,
  onRunCode,
  onShowProjects,
  currentProjectName
}) => {
  return (
    <header className="header glass-effect">
      <div className="header-left">
        <button 
          className="icon-btn mobile-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        <a 
          href="https://credencode.com" 
          className="logo-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div className="logo-design">
            <span className="logo-brackets">&lt;/&gt;</span>
            <span className="logo-text">CredenCode</span>
          </div>
        </a>

        <div className="project-switcher">
          <button 
            className="icon-btn" 
            onClick={onShowProjects}
            title="Projects"
          >
            <FolderOpen size={18} />
          </button>
          <span className="project-name">{currentProjectName}</span>
        </div>
      </div>

      <div className="header-actions">
        <button 
          className="icon-btn" 
          onClick={onFormatCode}
          title="Format Code"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17h18v2H3zm0-4h12v2H3zm0-4h18v2H3zm0-4h12v2H3z"/>
          </svg>
        </button>

        <button 
          className="icon-btn run-btn" 
          onClick={onRunCode}
          title="Run Code"
        >
          <Play size={18} />
        </button>

        <button 
          className="icon-btn" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};
