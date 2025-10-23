import JSZip from 'jszip';
import { Project, FileSystemItem } from '../types';

export class ProjectExporter {
  static async exportProject(project: Project): Promise<Blob> {
    const zip = new JSZip();
    
    // Add all files to zip
    const addFilesToZip = (files: Record<string, FileSystemItem>, path: string = '') => {
      Object.entries(files).forEach(([name, item]) => {
        const fullPath = path ? `${path}/${name}` : name;
        
        if (item.type === 'file' && item.content) {
          zip.file(fullPath, item.content);
        } else if (item.type === 'folder' && item.children) {
          addFilesToZip(item.children, fullPath);
        }
      });
    };
    
    addFilesToZip(project.files);
    return await zip.generateAsync({ type: 'blob' });
  }

  static downloadProject(project: Project, filename: string = 'project.zip') {
    this.exportProject(project).then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.name}-${filename}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}

export class ProjectImporter {
  static async importFromZip(zipFile: File): Promise<{ name: string; files: Record<string, FileSystemItem> }> {
    const zip = await JSZip.loadAsync(zipFile);
    const files: Record<string, FileSystemItem> = {};
    
    // Process all files in zip
    const processZipEntries = async (entries: JSZip.JSZipObject[]) => {
      for (const entry of entries) {
        if (!entry.dir) {
          const content = await entry.async('text');
          this.addFileToStructure(files, entry.name, content);
        }
      }
    };
    
    await processZipEntries(Object.values(zip.files));
    
    // Use zip filename or default name
    const projectName = zipFile.name.replace('.zip', '') || 'Imported Project';
    
    return { name: projectName, files };
  }

  private static addFileToStructure(
    structure: Record<string, FileSystemItem>, 
    path: string, 
    content: string
  ) {
    const parts = path.split('/');
    const filename = parts.pop()!;
    let current = structure;
    
    // Navigate/create folder structure
    for (const part of parts) {
      if (!current[part]) {
        current[part] = { type: 'folder', children: {} };
      }
      current = (current[part] as any).children;
    }
    
    // Determine file type by extension
    const extension = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'html': 'html',
      'css': 'css', 
      'js': 'javascript',
      'json': 'json',
      'md': 'markdown',
      'txt': 'plaintext'
    };
    
    current[filename] = {
      type: 'file',
      content,
      language: languageMap[extension || ''] || 'plaintext'
    };
  }
}
