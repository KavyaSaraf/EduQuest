"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { collaborativeApi } from '@/app/services/api';
import { CollaborativeSession } from '@/app/types/collaborative';

export default function CollaborativePage() {
  const [sessions, setSessions] = useState<CollaborativeSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollaborativeSessions();
  }, []);

  const loadCollaborativeSessions = async () => {
    try {
      const data = await collaborativeApi.getCollaborativeSessions();
      setSessions(data.sessions);
    } catch (error) {
      console.error('Error loading collaborative sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading collaborative sessions...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Collaborative Learning</h1>
      <Button variant="outline" onClick={() => {/* Implement create session functionality */}}>
        Create New Session
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <CardTitle>{session.title}</CardTitle>
              <CardDescription>{session.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Participants: {session.participants.length}/{session.maxParticipants}</p>
              <p>Status: {session.status}</p>
              <Button onClick={() => {/* Implement join session functionality */}}>
                Join Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
