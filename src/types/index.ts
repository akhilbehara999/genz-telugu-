export interface Project {
  id: string;
  name: string;
  code: string;
  pythonCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  theme: 'dark' | 'light';
  fontSize: number;
  autoSave: boolean;
}

export interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
}

export type OutputType = 'stdout' | 'stderr' | 'info' | 'error';

export interface OutputLine {
  type: OutputType;
  content: string;
  timestamp: number;
}
