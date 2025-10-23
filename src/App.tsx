import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/UI/Header';
import { Sidebar } from './components/UI/Sidebar';
import { TabManager } from './components/Tabs/TabManager';
import { MonacoEditor } from './components/Editor/MonacoEditor';
import { ProjectModal } from './components/ProjectManager/ProjectModal';
import { useFileSystem } from './hooks/useFileSystem';
import { useGit } from './hooks/useGit';
import { Tab, FileSystemItem } from './types';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'explorer' | 'git'>('explorer');
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

  // Initialize Git
  const {
    isInitialized: gitInitialized,
    fileStatus: gitFileStatus,
    commits: gitCommits,
    branches: gitBranches,
    currentBranch: gitCurrentBranch,
    user: gitUser,
    stageFiles: gitStageFiles,
    commit: gitCommit,
    createBranch: gitCreateBranch,
    checkoutBranch: gitCheckoutBranch,
    setUserInfo: gitSetUserInfo,
    refreshGitData: gitRefreshData
  } = useGit(currentProject, currentProjectFiles);

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

  // Refresh git data when files change
  useEffect(() => {
    if (gitInitialized) {
      gitRefreshData();
    }
  }, [currentProjectFiles, gitInitialized, gitRefreshData]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (activeTab) {
      setTabs(prev => prev.map(tab => 
        tab.id === activeTab ? { ...tab, content: value || '' } : tab
      ));
      updateFileContent(activeTab, value || '');
      
      // Refresh git status after file change
      if (gitInitialized) {
        setTimeout(() => gitRefreshData(), 100);
      }
    }
  }, [activeTab, updateFileContent, gitInitialized, gitRefreshData]);

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

  // Git handlers
  const handleGitStageFiles = useCallback(async (filepaths: string[]) => {
    await gitStageFiles(filepaths);
  }, [gitStageFiles]);

  const handleGitCommit = useCallback(async (message: string) => {
    const success = await gitCommit(message);
    if (success) {
      console.log('Commit successful!');
    }
  }, [gitCommit]);

  const handleGitCreateBranch = useCallback(async (name: string) => {
    const success = await gitCreateBranch(name);
    if (success) {
      console.log('Branch created successfully!');
    }
  }, [gitCreateBranch]);

  const handleGitCheckoutBranch = useCallback(async (name: string) => {
    const success = await gitCheckoutBranch(name);
    if (success) {
      console.log('Switched to branch:', name);
    }
  }, [gitCheckoutBranch]);

  const handleGitUserChange = useCallback((user: { name: string; email: string }) => {
    gitSetUserInfo(user);
  }, [gitSetUserInfo]);

  // Handle project import
  const handleProjectImport = useCallback((projectData: { name: string; files: Record<string, FileSystemItem> }) => {
    const projectId = projectData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const newProjects = {
      ...projects,
      [projectId]: {
        id: projectId,
        name: projectData.name,
        files: projectData.files
      }
    };
    
    localStorage.setItem('credencode_projects', JSON.stringify(newProjects));
    setCurrentProject(projectId);
    setTabs([]);
    setActiveTab(null);
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
        activePanel={activePanel}
        setActivePanel={setActivePanel}
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
          activePanel={activePanel}
          gitFileStatus={gitFileStatus}
          gitCommits={gitCommits}
          gitBranches={gitBranches}
          gitCurrentBranch={gitCurrentBranch}
          gitUser={gitUser}
          onGitStageFiles={handleGitStageFiles}
          onGitCommit={handleGitCommit}
          onGitCreateBranch={handleGitCreateBranch}
          onGitCheckoutBranch={handleGitCheckoutBranch}
          onGitUserChange={handleGitUserChange}
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
                    <p>🚀 <strong>New Feature:</strong> Git Version Control!</p>
                    <p>Click the Git icon in header to access version control.</p>
                    {gitInitialized && (
                      <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
                        Git repository initialized for this project
                      </p>
                    )}
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
