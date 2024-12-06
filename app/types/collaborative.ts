export interface CollaborativeSession {
  id: string;
  title: string;
  description: string;
  participants: Participant[];
  topic: string;
  status: 'active' | 'scheduled' | 'completed';
  startTime: string;
  endTime?: string;
  maxParticipants: number;
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  role: 'host' | 'participant';
  status: 'online' | 'offline';
  joinedAt: string;
}

export interface CollaborativeResponse {
  sessions: CollaborativeSession[];
  activeSessions: CollaborativeSession[];
  upcomingSessions: CollaborativeSession[];
}
