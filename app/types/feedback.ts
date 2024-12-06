export interface Feedback {
  id: string;
  userId: string;
  type: 'general' | 'course' | 'feature' | 'bug';
  title: string;
  description: string;
  rating?: number;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
  updatedAt: string;
  category?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface FeedbackResponse {
  feedback: Feedback[];
  userFeedback: Feedback[];
  statistics: {
    totalFeedback: number;
    averageRating: number;
    resolvedCount: number;
    pendingCount: number;
  };
}

export interface FeedbackSubmission {
  type: Feedback['type'];
  title: string;
  description: string;
  rating?: number;
  category?: string;
}
