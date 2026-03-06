// Centralized module types

export interface ModuleChapter {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  locked?: boolean;
  completed?: boolean;
}

export interface ModuleExercise {
  id: string;
  title: string;
  type: 'qcm' | 'exercise' | 'practice';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  locked?: boolean;
  completed?: boolean;
}

export interface ModuleResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'file';
  url: string;
  description?: string;
}

export interface ModuleData {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  chapters: ModuleChapter[];
  exercises?: ModuleExercise[];
  resources?: ModuleResource[];
}

export type ChapterType = 'cours' | 'td' | 'qcm' | 'annexe';
