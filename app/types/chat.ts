export interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
}

export interface QuickTopic {
  title: string;
  description: string;
  category: string;
}

export interface AITutorResponse {
  message: string;
  status: string;
}
