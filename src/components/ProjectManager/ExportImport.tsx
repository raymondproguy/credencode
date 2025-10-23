import React, { useRef } from 'react';
import { Download, Upload, FolderDown, FolderUp } from 'lucide-react';
import { Project } from '../../types';
import { ProjectExporter, ProjectImporter } from '../../utils/export-import';

interface ExportImportProps {
  currentProject: Project;
  onProjectImport: (projectData: { name: string; files: Record<string, FileSystemItem> }) => void;
}

export const ExportImport: React.FC<ExportImportProps> = ({
  currentProject,
  onProjectImport
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    ProjectExporter.downloadProject(currentProject, `${currentProject.name}.zip`);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const projectData = await ProjectImporter.importFromZip(file);
      onProjectImport(projectData);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert('Failed to import project. Please make sure it\'s a valid ZIP file.');
      console.error('Import error:', error);
    }
  };

  return (
    <div className="export-import">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".zip"
        style={{ display: 'none' }}
      />
      
      <div className="export-import-buttons">
        <button 
          className="btn btn-secondary"
          onClick={handleExport}
          title="Export project as ZIP"
        >
          <Download size={16} />
          Export Project
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={handleImportClick}
          title="Import project from ZIP"
        >
          <Upload size={16} />
          Import Project
        </button>
      </div>

      <div className="export-import-info">
        <p>Export your project as a ZIP file or import existing projects.</p>
      </div>
    </div>
  );
};
