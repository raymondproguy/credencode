export interface GitFileStatus {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'unmodified';
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
  fullHash?: string;
}

export interface GitBranch {
  name: string;
  isCurrent: boolean;
}

export interface GitUser {
  name: string;
  email: string;
}
