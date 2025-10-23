import React from 'react';
import { Project } from '../../types';
import { X, Folder, Play, Edit, Trash2, Plus, Upload } from 'lucide-react';

interface ProjectModalProps {
  projects: Record<string, Project>;
  currentProject: string;
  onProjectSelect: (projectId: string) => void;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  projects,
  currentProject,
  onProjectSelect,
  onClose
}) => {
  const projectList = Object.values(projects);

  const createNewProject = () => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
      console.log('Create project:', projectName);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Projects</h2>
          <button className="icon-btn close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
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
                    onClick={() => console.log('Rename:', project.id)}
                    title="Rename project"
                  >
                    <Edit size={14} />
                  </button>
                  
                  {projectList.length > 1 && (
                    <button
                      className="icon-btn danger"
                      onClick={() => console.log('Delete:', project.id)}
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
            <button className="btn btn-secondary">
              <Upload size={16} />
              Import Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
