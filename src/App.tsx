import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/UI/Header';
import { Sidebar } from './components/UI/Sidebar';
import { TabManager } from './components/Tabs/TabManager';
import { MonacoEditor } from './components/Editor/MonacoEditor';
import { ProjectModal } from './components/ProjectManager/ProjectModal';
import { useFileSystem } from './hooks/useFileSystem';
import { Tab, FileSystemItem } from './types';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const [editor, setEditor] = useState<any>(null);

  const {
    projects,
    currentProject,
    setCurrentProject,
    getFileIcon,
    updateFileContent,
    getFileContent,
    getFileLanguage,
    currentProjectFiles,
    createFile,
    createFolder
  } = useFileSystem();

  // Open default file on startup
  useEffect(() => {
    if (Object.keys(currentProjectFiles).length > 0 && tabs.length === 0) {
      const openDefaultFile = (path: string) => {
        const content = getFileContent(path);
        const language = getFileLanguage(path);
        const newTab: Tab = {
          id: path,
          name: path.split('/').pop() || path,
          path,
          language,
          content
        };
        setTabs([newTab]);
        setActiveTab(path);
      };

      // Try to open index.html first, then any other file
      if (currentProjectFiles['index.html']) {
        openDefaultFile('index.html');
      } else {
        const firstFile = Object.keys(currentProjectFiles)[0];
        if (firstFile) openDefaultFile(firstFile);
      }
    }
  }, [currentProjectFiles, getFileContent, getFileLanguage, tabs.length]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (activeTab) {
      setTabs(prev => prev.map(tab => 
        tab.id === activeTab ? { ...tab, content: value || '' } : tab
      ));
      updateFileContent(activeTab, value || '');
    }
  }, [activeTab, updateFileContent]);

  const handleRunCode = useCallback(() => {
    if (activeTab) {
      const content = getFileContent(activeTab);
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(content);
        newWindow.document.close();
      }
    }
  }, [activeTab, getFileContent]);

  const handleFormatCode = useCallback(() => {
    if (editor) {
      editor.getAction('editor.action.formatDocument').run();
    }
  }, [editor]);

  // Handle project import
  const handleProjectImport = useCallback((projectData: { name: string; files: Record<string, FileSystemItem> }) => {
    // Create a new project ID
    const projectId = projectData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Add the imported project to our projects
    const newProjects = {
      ...projects,
      [projectId]: {
        id: projectId,
        name: projectData.name,
        files: projectData.files
      }
    };
    
    // Update localStorage (we'll need to update our hook for this)
    // For now, we'll use a simple approach
    localStorage.setItem('credencode_projects', JSON.stringify(newProjects));
    
    // Switch to the new project
    setCurrentProject(projectId);
    
    // Close all tabs
    setTabs([]);
    setActiveTab(null);
    
    // Close the modal
    setShowProjects(false);
    
    // Reload the page to see the new project
    window.location.reload();
  }, [projects, setCurrentProject]);

  // Simple project creation (we'll enhance this later)
  const handleCreateProject = useCallback((projectName: string) => {
    const projectId = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const newProject = {
      id: projectId,
      name: projectName,
      files: {
        'index.html': {
          type: 'file',
          content: `<!DOCTYPE html>
<html>
<head>
    <title>${projectName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
            color: #333;
        }
        h1 { color: #007acc; }
    </style>
</head>
<body>
    <h1>Welcome to ${projectName}</h1>
    <p>Start coding your amazing project!</p>
</body>
</html>`,
          language: 'html'
        },
        'style.css': {
          type: 'file',
          content: `/* ${projectName} Styles */\nbody {\n    margin: 0;\n    padding: 20px;\n    font-family: Arial, sans-serif;\n}`,
          language: 'css'
        },
        'script.js': {
          type: 'file',
          content: `// ${projectName} JavaScript\nconsole.log('Hello from ${projectName}!');`,
          language: 'javascript'
        }
      }
    };
    
    const newProjects = {
      ...projects,
      [projectId]: newProject
    };
    
    localStorage.setItem('credencode_projects', JSON.stringify(newProjects));
    setCurrentProject(projectId);
    setShowProjects(false);
    window.location.reload();
  }, [projects, setCurrentProject]);

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={`app ${theme}`}>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        setTheme={setTheme}
        onFormatCode={handleFormatCode}
        onRunCode={handleRunCode}
        onShowProjects={() => setShowProjects(true)}
        currentProjectName={projects[currentProject]?.name || 'CredenCode'}
      />

      <div className="main-container">
        <Sidebar
          open={sidebarOpen}
          files={currentProjectFiles}
          getFileIcon={getFileIcon}
          onFileClick={(path, file) => {
            const existingTab = tabs.find(tab => tab.id === path);
            if (!existingTab) {
              const newTab: Tab = {
                id: path,
                name: path.split('/').pop() || path,
                path,
                language: file.language || 'plaintext',
                content: file.content || ''
              };
              setTabs(prev => [...prev, newTab]);
            }
            setActiveTab(path);
            setSidebarOpen(false);
          }}
        />

        <div className="editor-area">
          <TabManager
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            onTabClose={(tabId) => {
              setTabs(prev => prev.filter(tab => tab.id !== tabId));
              if (activeTab === tabId) {
                const remainingTabs = tabs.filter(tab => tab.id !== tabId);
                setActiveTab(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null);
              }
            }}
          />

          <div className="editor-pane">
            {currentTab ? (
              <MonacoEditor
                value={currentTab.content}
                language={currentTab.language}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                onChange={handleEditorChange}
                onMount={setEditor}
              />
            ) : (
              <div className="editor-placeholder">
                <div className="placeholder-content">
                  <h3>Welcome to CredenCode</h3>
                  <p>Select a file from the sidebar to start editing</p>
                  <div style={{ marginTop: '20px', fontSize: '14px', color: '#969696' }}>
                    <p>💡 <strong>New Feature:</strong> Export/Import projects as ZIP files!</p>
                    <p>Click the folder icon in header to access Project Manager.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showProjects && (
        <ProjectModal
          projects={projects}
          currentProject={currentProject}
          onProjectSelect={setCurrentProject}
          onProjectImport={handleProjectImport}
          onClose={() => setShowProjects(false)}
        />
      )}
    </div>
  );
}

export default App;
