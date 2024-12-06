export interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  icon?: string;
}

export interface Course {
  name: string;
  progress: number;
  lastAccessed: string;
  remainingTime: string;
}

export interface PerformanceMetric {
  name: string;
  description: string;
  value: string;
  score: number;
  trend: 'up' | 'down';
}

export interface AnalyticsData {
  metrics: AnalyticsMetric[];
  courses: Course[];
  performance: PerformanceMetric[];
}
