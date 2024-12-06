// // types/learning-path.ts
// export interface Module {
//     id: string;
//     title: string;
//     description?: string;
//     status: 'not-started' | 'in-progress' | 'completed';
//     progress: number;
//   }
  
//   export interface LearningPath {
//     id: number;
//     title: string;
//     modules: Module[];
//     achievements: { 
//       id: string;
//       title: string; 
//       date: string 
//     }[];
//   }

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  children: RoadmapStep[];
}

export interface CareerRoadmap {
  career: string;
  steps: RoadmapStep[];
}

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  children: LearningStep[];
}

export interface LearningPath {
  subject: string;
  steps: LearningStep[];
}