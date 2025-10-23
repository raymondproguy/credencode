import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/UI/Header';
import { Sidebar } from './components/UI/Sidebar';
import { TabManager } from './components/Tabs/TabManager';
import { MonacoEditor } from './components/Editor/MonacoEditor';
import { ProjectModal } from './components/ProjectManager/ProjectModal';
import { useFileSystem } from './hooks/useFileSystem';
import { Tab } from './types';
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
    currentProjectFiles
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
          onClose={() => setShowProjects(false)}
        />
      )}
    </div>
  );
}

export default App;
