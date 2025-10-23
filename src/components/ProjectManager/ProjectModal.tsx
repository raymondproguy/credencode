import React, { useState } from 'react';
import { Project } from '../../types';
import { X, Folder, Play, Edit, Trash2, Plus, Upload, Download } from 'lucide-react';
import { ExportImport } from './ExportImport';

interface ProjectModalProps {
  projects: Record<string, Project>;
  currentProject: string;
  onProjectSelect: (projectId: string) => void;
  onProjectImport: (projectData: { name: string; files: Record<string, FileSystemItem> }) => void;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  projects,
  currentProject,
  onProjectSelect,
  onProjectImport,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'export-import'>('projects');
  const projectList = Object.values(projects);

  const createNewProject = () => {
    const projectName = prompt('Enter project name:');
    if (projectName && projectName.trim()) {
      // Create project using the same method as import
      const projectId = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      const newProject = {
        id: projectId,
        name: projectName.trim(),
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
      onProjectSelect(projectId);
      onClose();
      window.location.reload();
    }
  };

  const currentProjectData = projects[currentProject];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Projects</h2>
          <button className="icon-btn close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Folder size={16} />
            Projects
          </button>
          <button 
            className={`tab-button ${activeTab === 'export-import' ? 'active' : ''}`}
            onClick={() => setActiveTab('export-import')}
          >
            <Download size={16} />
            Export/Import
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'projects' ? (
            <>
              <div className="projects-list">
                {projectList.map(project => (
                  <div
                    key={project.id}
                    className={`project-item ${currentProject === project.id ? 'active' : ''}`}
                  >
                    <div className="project-info">
                      <Folder size={20} className="project-icon" />
                      <div className="project-details">
                        <span className="project-name">{project.name}</span>
                        <span className="project-file-count">
                          {Object.keys(project.files).length} files
                        </span>
                      </div>
                    </div>

                    <div className="project-actions">
                      {currentProject === project.id && (
                        <span className="current-badge">Current</span>
                      )}
                      
                      {currentProject !== project.id && (
                        <button
                          className="icon-btn"
                          onClick={() => onProjectSelect(project.id)}
                          title="Switch to project"
                        >
                          <Play size={14} />
                        </button>
                      )}
                      
                      <button
                        className="icon-btn"
                        onClick={() => {
                          const newName = prompt('Enter new name:', project.name);
                          if (newName && newName.trim()) {
                            // Simple rename - reload page to see changes
                            const updatedProjects = { ...projects };
                            updatedProjects[project.id].name = newName.trim();
                            localStorage.setItem('credencode_projects', JSON.stringify(updatedProjects));
                            window.location.reload();
                          }
                        }}
                        title="Rename project"
                      >
                        <Edit size={14} />
                      </button>
                      
                      {projectList.length > 1 && (
                        <button
                          className="icon-btn danger"
                          onClick={() => {
                            if (confirm(`Delete project "${project.name}"?`)) {
                              const updatedProjects = { ...projects };
                              delete updatedProjects[project.id];
                              localStorage.setItem('credencode_projects', JSON.stringify(updatedProjects));
                              window.location.reload();
                            }
                          }}
                          title="Delete project"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button className="btn btn-primary" onClick={createNewProject}>
                  <Plus size={16} />
                  New Project
                </button>
              </div>
            </>
          ) : (
            <ExportImport 
              currentProject={currentProjectData}
              onProjectImport={onProjectImport}
            />
          )}
        </div>
      </div>
    </div>
  );
};
