import React, { useState } from 'react';
import { FileItem } from './FileItem';
import { FileSystemItem } from '../../types';
import { FilePlus, FolderPlus, RefreshCw } from 'lucide-react';

interface FileExplorerProps {
  files: Record<string, FileSystemItem>;
  getFileIcon: (filename: string) => string;
  onFileClick: (path: string, file: FileSystemItem) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  getFileIcon,
  onFileClick
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const createNewFile = () => {
    const fileName = prompt('Enter file name (e.g., style.css):');
    if (fileName) {
      console.log('Create file:', fileName);
    }
  };

  const createNewFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      console.log('Create folder:', folderName);
    }
  };

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <span>EXPLORER</span>
        <div className="explorer-actions">
          <button 
            className="icon-btn"
            onClick={createNewFile}
            title="New File"
          >
            <FilePlus size={14} />
          </button>
          <button 
            className="icon-btn"
            onClick={createNewFolder}
            title="New Folder"
          >
            <FolderPlus size={14} />
          </button>
          <button 
            className="icon-btn"
            onClick={() => window.location.reload()}
            title="Refresh"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      <div className="file-tree">
        {Object.entries(files).map(([name, item]) => (
          <FileItem
            key={name}
            name={name}
            item={item}
            path={name}
            level={0}
            getFileIcon={getFileIcon}
            expandedFolders={expandedFolders}
            onToggleFolder={toggleFolder}
            onFileClick={onFileClick}
          />
        ))}
      </div>
    </div>
  );
};
