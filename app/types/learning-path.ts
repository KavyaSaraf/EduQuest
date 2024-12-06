export interface LearningPathModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  topics: string[];
  estimatedTime: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  modules: LearningPathModule[];
  totalProgress: number;
  createdAt: string;
  updatedAt: string;
}

export interface LearningPathResponse {
  paths: LearningPath[];
  currentPath?: LearningPath;
  recommendations?: LearningPath[];
}
