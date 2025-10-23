import React from 'react';
import { FileExplorer } from '../FileExplorer/FileExplorer';
import { FileSystemItem } from '../../types';

interface SidebarProps {
  open: boolean;
  files: Record<string, FileSystemItem>;
  getFileIcon: (filename: string) => string;
  onFileClick: (path: string, file: FileSystemItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  files,
  getFileIcon,
  onFileClick
}) => {
  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <FileExplorer 
        files={files}
        getFileIcon={getFileIcon}
        onFileClick={onFileClick}
      />
    </div>
  );
};
