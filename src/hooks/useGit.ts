import { useState, useCallback, useEffect } from 'react';
import { gitService } from '../utils/git-service';
import { GitFileStatus, GitCommit, GitUser } from '../types/git';

export const useGit = (projectId: string, projectFiles: Record<string, any>) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [fileStatus, setFileStatus] = useState<GitFileStatus[]>([]);
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [branches, setBranches] = useState<string[]>(['main']);
  const [currentBranch, setCurrentBranch] = useState<string>('main');
  const [user, setUser] = useState<GitUser>({
    name: 'CredenCode User',
    email: 'user@credencode.com'
  });

  // Initialize git for project
  useEffect(() => {
    const initializeGit = async () => {
      if (!projectId) return;

      gitService.setProject(projectId);
      
      // Sync project files with git file system
      await gitService.syncProjectFiles(projectFiles);
      
      // Try to init repo if not exists
      const initialized = await gitService.initRepo();
      if (initialized) {
        setIsInitialized(true);
        await refreshGitData();
      }
    };

    initializeGit();
  }, [projectId, projectFiles]);

  const refreshGitData = useCallback(async () => {
    if (!projectId) return;

    const [status, commitHistory, branchList] = await Promise.all([
      gitService.getStatus(),
      gitService.getCommits(),
      gitService.getBranches()
    ]);

    setFileStatus(status);
    setCommits(commitHistory);
    setBranches(branchList);
    
    // For simplicity, assume first branch is current
    if (branchList.length > 0) {
      setCurrentBranch(branchList[0]);
    }
  }, [projectId]);

  const stageFiles = useCallback(async (filepaths: string[]) => {
    const success = await gitService.stageFiles(filepaths);
    if (success) {
      await refreshGitData();
    }
    return success;
  }, [refreshGitData]);

  const commit = useCallback(async (message: string) => {
    const success = await gitService.commit(message, user);
    if (success) {
      await refreshGitData();
    }
    return success;
  }, [user, refreshGitData]);

  const createBranch = useCallback(async (name: string) => {
    const success = await gitService.createBranch(name);
    if (success) {
      await refreshGitData();
    }
    return success;
  }, [refreshGitData]);

  const checkoutBranch = useCallback(async (name: string) => {
    const success = await gitService.checkoutBranch(name);
    if (success) {
      setCurrentBranch(name);
      await refreshGitData();
    }
    return success;
  }, [refreshGitData]);

  const setUserInfo = useCallback((newUser: GitUser) => {
    setUser(newUser);
    // Save to localStorage
    localStorage.setItem('git_user', JSON.stringify(newUser));
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('git_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return {
    isInitialized,
    fileStatus,
    commits,
    branches,
    currentBranch,
    user,
    stageFiles,
    commit,
    createBranch,
    checkoutBranch,
    setUserInfo,
    refreshGitData
  };
};
