import { git, plugins, HttpClient } from 'isomorphic-git';
import { fs } from '@isomorphic-git/lightning-fs';

// Create a virtual file system for git operations
const gitFs = new fs('credencode-git');

export class GitService {
  private static instance: GitService;
  private currentProjectId: string = '';

  private constructor() {}

  static getInstance(): GitService {
    if (!GitService.instance) {
      GitService.instance = new GitService();
    }
    return GitService.instance;
  }

  setProject(projectId: string) {
    this.currentProjectId = projectId;
  }

  async initRepo(): Promise<boolean> {
    try {
      const dir = `/${this.currentProjectId}`;
      
      await git.init({
        fs: gitFs,
        dir,
        defaultBranch: 'main'
      });

      console.log('Git repository initialized');
      return true;
    } catch (error) {
      console.error('Failed to init repo:', error);
      return false;
    }
  }

  async getStatus(): Promise<Array<{ path: string; status: string }>> {
    try {
      const dir = `/${this.currentProjectId}`;
      const status = await git.statusMatrix({
        fs: gitFs,
        dir,
        filter: (f) => !f.startsWith('.git/')
      });

      return status.map(([file, head, workdir, stage]) => {
        let status = 'unmodified';
        
        if (head === 1 && workdir === 1 && stage === 1) {
          status = 'unmodified';
        } else if (head === 1 && workdir === 2 && stage === 1) {
          status = 'modified';
        } else if (head === 0 && workdir === 2 && stage === 1) {
          status = 'added';
        } else if (head === 1 && workdir === 0 && stage === 0) {
          status = 'deleted';
        } else if (head === 1 && workdir === 1 && stage === 0) {
          status = 'deleted';
        }

        return { path: file, status };
      }).filter(file => file.status !== 'unmodified');
    } catch (error) {
      console.error('Failed to get status:', error);
      return [];
    }
  }

  async stageFiles(filepaths: string[]): Promise<boolean> {
    try {
      const dir = `/${this.currentProjectId}`;
      
      for (const filepath of filepaths) {
        await git.add({
          fs: gitFs,
          dir,
          filepath
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to stage files:', error);
      return false;
    }
  }

  async commit(message: string, author: { name: string; email: string }): Promise<boolean> {
    try {
      const dir = `/${this.currentProjectId}`;
      
      await git.commit({
        fs: gitFs,
        dir,
        message,
        author
      });

      return true;
    } catch (error) {
      console.error('Failed to commit:', error);
      return false;
    }
  }

  async getCommits(limit: number = 10): Promise<Array<{ hash: string; message: string; author: string; date: string }>> {
    try {
      const dir = `/${this.currentProjectId}`;
      const commits = await git.log({
        fs: gitFs,
        dir,
        depth: limit
      });

      return commits.map(commit => ({
        hash: commit.oid.slice(0, 7),
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: new Date(commit.commit.author.timestamp * 1000).toLocaleDateString()
      }));
    } catch (error) {
      console.error('Failed to get commits:', error);
      return [];
    }
  }

  async getBranches(): Promise<string[]> {
    try {
      const dir = `/${this.currentProjectId}`;
      const branches = await git.listBranches({
        fs: gitFs,
        dir
      });

      return branches;
    } catch (error) {
      console.error('Failed to get branches:', error);
      return ['main'];
    }
  }

  async createBranch(name: string): Promise<boolean> {
    try {
      const dir = `/${this.currentProjectId}`;
      
      await git.branch({
        fs: gitFs,
        dir,
        ref: name
      });

      return true;
    } catch (error) {
      console.error('Failed to create branch:', error);
      return false;
    }
  }

  async checkoutBranch(name: string): Promise<boolean> {
    try {
      const dir = `/${this.currentProjectId}`;
      
      await git.checkout({
        fs: gitFs,
        dir,
        ref: name
      });

      return true;
    } catch (error) {
      console.error('Failed to checkout branch:', error);
      return false;
    }
  }

  // Sync project files with git file system
  async syncProjectFiles(files: Record<string, any>): Promise<void> {
    const dir = `/${this.currentProjectId}`;
    
    // Clear existing files in git FS
    try {
      const existingFiles = await gitFs.promises.readdir(dir);
      for (const file of existingFiles) {
        if (file !== '.git') {
          await gitFs.promises.unlink(`${dir}/${file}`);
        }
      }
    } catch (error) {
      // Directory might not exist yet
    }

    // Write current project files to git FS
    const writeFiles = async (fileObj: Record<string, any>, currentPath: string = '') => {
      for (const [name, item] of Object.entries(fileObj)) {
        const fullPath = currentPath ? `${currentPath}/${name}` : name;
        
        if (item.type === 'file' && item.content) {
          await gitFs.promises.writeFile(`${dir}/${fullPath}`, item.content);
        } else if (item.type === 'folder' && item.children) {
          await gitFs.promises.mkdir(`${dir}/${fullPath}`);
          await writeFiles(item.children, fullPath);
        }
      }
    };

    await writeFiles(files);
  }
}

export const gitService = GitService.getInstance();
