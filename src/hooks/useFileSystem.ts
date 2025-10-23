import { useState, useCallback } from 'react';
import { FileSystemItem, Project } from '../types';
import { StorageManager } from '../utils/storage';

const defaultProject: Project = {
  id: 'credencode',
  name: 'CredenCode',
  files: {
    'index.html': {
      type: 'file',
      content: `<!DOCTYPE html>
<html>
<head>
    <title>CredenCode</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        h1 { margin-bottom: 20px; }
        .card {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 20px auto;
            max-width: 500px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <h1>Welcome to CredenCode</h1>
    <div class="card">
        <p>Edit this code and see the live preview!</p>
        <button onclick="showMessage()">Click Me</button>
    </div>
    <script>
        function showMessage() {
            alert('Hello from CredenCode!');
        }
    <\/script>
</body>
</html>`,
      language: 'html'
    },
    'style.css': {
      type: 'file',
      content: `/* Add your styles here */\nbody {\n    margin: 0;\n    padding: 20px;\n    font-family: Arial, sans-serif;\n}`,
      language: 'css'
    },
    'script.js': {
      type: 'file',
      content: `// JavaScript code here\nfunction showMessage() {\n    alert('Hello from CredenCode!');\n}`,
      language: 'javascript'
    }
  }
};

export const useFileSystem = () => {
  const [projects, setProjects] = useState<Record<string, Project>>(() => 
    StorageManager.load('credencode_projects', { [defaultProject.id]: defaultProject })
  );
  const [currentProject, setCurrentProject] = useState<string>(
    StorageManager.load('credencode_current_project', defaultProject.id)
  );

  const saveToStorage = useCallback(() => {
    StorageManager.save('credencode_projects', projects);
    StorageManager.save('credencode_current_project', currentProject);
  }, [projects, currentProject]);

  const getFileIcon = (filename: string): string => {
    const ext = filename.split('.').pop();
    const icons: Record<string, string> = {
      'html': 'file-code',
      'css': 'file-css',
      'js': 'file-js',
      'json': 'file-json',
      'md': 'file-markdown',
      'txt': 'file-text',
      'folder': 'folder'
    };
    return icons[ext || ''] || 'file';
  };

  const createFile = useCallback((path: string, content: string = '', language: string = 'plaintext') => {
    setProjects(prev => {
      const newProjects = { ...prev };
      const project = newProjects[currentProject];
      project.files[path] = { type: 'file', content, language };
      return newProjects;
    });
  }, [currentProject]);

  const updateFileContent = useCallback((path: string, content: string) => {
    setProjects(prev => {
      const newProjects = { ...prev };
      const file = newProjects[currentProject].files[path];
      if (file && file.type === 'file') {
        file.content = content;
      }
      return newProjects;
    });
  }, [currentProject]);

  const getFileContent = useCallback((path: string): string => {
    const file = projects[currentProject]?.files[path];
    return file?.type === 'file' ? file.content || '' : '';
  }, [projects, currentProject]);

  const getFileLanguage = useCallback((path: string): string => {
    const file = projects[currentProject]?.files[path];
    return file?.type === 'file' ? file.language || 'plaintext' : 'plaintext';
  }, [projects, currentProject]);

  return {
    projects,
    currentProject,
    setCurrentProject,
    getFileIcon,
    createFile,
    updateFileContent,
    getFileContent,
    getFileLanguage,
    saveToStorage,
    currentProjectFiles: projects[currentProject]?.files || {}
  };
};
