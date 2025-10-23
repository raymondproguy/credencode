import React from 'react';
import { FileExplorer } from '../FileExplorer/FileExplorer';
import { GitSidebar } from '../Git/GitSidebar';
import { FileSystemItem } from '../../types';
import { GitFileStatus, GitCommit } from '../../types/git';

interface SidebarProps {
  open: boolean;
  files: Record<string, FileSystemItem>;
  getFileIcon: (filename: string) => string;
  onFileClick: (path: string, file: FileSystemItem) => void;
  // Git props
  activePanel: 'explorer' | 'git';
  gitFileStatus: GitFileStatus[];
  gitCommits: GitCommit[];
  gitBranches: string[];
  gitCurrentBranch: string;
  gitUser: { name: string; email: string };
  onGitStageFiles: (filepaths: string[]) => void;
  onGitCommit: (message: string) => void;
  onGitCreateBranch: (name: string) => void;
  onGitCheckoutBranch: (name: string) => void;
  onGitUserChange: (user: { name: string; email: string }) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  files,
  getFileIcon,
  onFileClick,
  activePanel,
  gitFileStatus,
  gitCommits,
  gitBranches,
  gitCurrentBranch,
  gitUser,
  onGitStageFiles,
  onGitCommit,
  onGitCreateBranch,
  onGitCheckoutBranch,
  onGitUserChange
}) => {
  if (!open) return null;

  return (
    <div className="sidebar open">
      {activePanel === 'explorer' ? (
        <FileExplorer 
          files={files}
          getFileIcon={getFileIcon}
          onFileClick={onFileClick}
        />
      ) : (
        <GitSidebar
          fileStatus={gitFileStatus}
          commits={gitCommits}
          branches={gitBranches}
          currentBranch={gitCurrentBranch}
          user={gitUser}
          onStageFiles={onGitStageFiles}
          onCommit={onGitCommit}
          onCreateBranch={onGitCreateBranch}
          onCheckoutBranch={onGitCheckoutBranch}
          onUserChange={onGitUserChange}
        />
      )}
    </div>
  );
};
