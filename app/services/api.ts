const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// AI Tutor API calls
export const aiTutorApi = {
  sendMessage: async (message: string) => {
    return apiRequest('/ai-tutors', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
  getHistory: async () => {
    return apiRequest('/ai-tutors');
  },
};

// Analytics API calls
export const analyticsApi = {
  getAnalytics: async () => {
    return apiRequest('/analytics');
  },
  updateAnalytics: async (data: any) => {
    return apiRequest('/analytics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Learning Path API calls
export const learningPathApi = {
  getLearningPaths: async () => {
    return apiRequest('/learning-paths');
  },
  createLearningPath: async (data: any) => {
    return apiRequest('/learning-paths', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  startModule: async (moduleId: string) => {
    return apiRequest(`/learning-paths/modules/${moduleId}/start`, {
      method: 'POST',
    });
  },
};

// Collaborative API calls
export const collaborativeApi = {
  getCollaborativeSessions: async () => {
    return apiRequest('/collaborative');
  },
  createSession: async (data: any) => {
    return apiRequest('/collaborative', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Feedback API calls
export const feedbackApi = {
  submitFeedback: async (data: any) => {
    return apiRequest('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getFeedback: async () => {
    return apiRequest('/feedback');
  },
};
