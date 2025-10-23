export interface FileSystemItem {
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: Record<string, FileSystemItem>;
}

export interface Project {
  id: string;
  name: string;
  files: Record<string, FileSystemItem>;
}

export interface Tab {
  id: string;
  name: string;
  path: string;
  language: string;
  content: string;
}

export interface AppState {
  currentProject: string;
  projects: Record<string, Project>;
  tabs: Tab[];
  activeTab: string | null;
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
}
