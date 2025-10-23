import React from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { FileSystemItem } from '../../types';

interface FileItemProps {
  name: string;
  item: FileSystemItem;
  path: string;
  level: number;
  getFileIcon: (filename: string) => string;
  expandedFolders: Set<string>;
  onToggleFolder: (path: string) => void;
  onFileClick: (path: string, file: FileSystemItem) => void;
}

export const FileItem: React.FC<FileItemProps> = ({
  name,
  item,
  path,
  level,
  getFileIcon,
  expandedFolders,
  onToggleFolder,
  onFileClick
}) => {
  const isExpanded = expandedFolders.has(path);
  const isFolder = item.type === 'folder';

  const iconProps = { size: 16 };

  const getIconComponent = () => {
    if (isFolder) {
      return <Folder {...iconProps} className="folder-icon" />;
    }
    
    const iconType = getFileIcon(name);
    switch (iconType) {
      case 'file-code': return <File {...iconProps} className="file-icon html" />;
      case 'file-css': return <File {...iconProps} className="file-icon css" />;
      case 'file-js': return <File {...iconProps} className="file-icon js" />;
      default: return <File {...iconProps} className="file-icon" />;
    }
  };

  return (
    <div className="file-item">
      <div 
        className={`file-item-header ${isFolder ? 'folder' : 'file'}`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => {
          if (isFolder) {
            onToggleFolder(path);
          } else {
            onFileClick(path, item);
          }
        }}
      >
        {isFolder && (
          <span className="folder-arrow">
            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        )}
        
        <span className="file-icon-wrapper">
          {getIconComponent()}
        </span>
        
        <span className="file-name">{name}</span>
      </div>

      {isFolder && isExpanded && item.children && (
        <div className="folder-children">
          {Object.entries(item.children).map(([childName, childItem]) => (
            <FileItem
              key={childName}
              name={childName}
              item={childItem}
              path={`${path}/${childName}`}
              level={level + 1}
              getFileIcon={getFileIcon}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
