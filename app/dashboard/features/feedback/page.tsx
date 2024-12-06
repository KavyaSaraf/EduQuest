"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { feedbackApi } from '@/app/services/api';
import { Feedback, FeedbackResponse, FeedbackSubmission } from '@/app/types/feedback';
import { MessageSquare, Star, AlertCircle } from 'lucide-react';

export default function FeedbackPage() {
  const [feedbackData, setFeedbackData] = useState<FeedbackResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [newFeedback, setNewFeedback] = useState<FeedbackSubmission>({
    type: 'general',
    title: '',
    description: '',
    rating: 5,
  });

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const data = await feedbackApi.getFeedback();
      setFeedbackData(data);
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await feedbackApi.submitFeedback(newFeedback);
      setNewFeedback({
        type: 'general',
        title: '',
        description: '',
        rating: 5,
      });
      await loadFeedback();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const getFeedbackTypeIcon = (type: Feedback['type']) => {
    switch (type) {
      case 'bug':
        return <AlertCircle className="h-4 w-4" />;
      case 'feature':
        return <Star className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Feedback</h1>
        {feedbackData?.statistics && (
          <div className="flex gap-4">
            <Badge variant="outline">
              Total: {feedbackData.statistics.totalFeedback}
            </Badge>
            <Badge variant="outline">
              Average Rating: {feedbackData.statistics.averageRating.toFixed(1)}
            </Badge>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>Share your thoughts and help us improve</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={newFeedback.type}
                onChange={(e) => setNewFeedback({
                  ...newFeedback,
                  type: e.target.value as Feedback['type']
                })}
              >
                <option value="general">General</option>
                <option value="course">Course</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={newFeedback.title}
                onChange={(e) => setNewFeedback({
                  ...newFeedback,
                  title: e.target.value
                })}
                placeholder="Brief summary of your feedback"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md h-24"
                value={newFeedback.description}
                onChange={(e) => setNewFeedback({
                  ...newFeedback,
                  description: e.target.value
                })}
                placeholder="Provide detailed feedback..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={newFeedback.rating === rating ? "default" : "outline"}
                    onClick={() => setNewFeedback({
                      ...newFeedback,
                      rating
                    })}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Previous Feedback</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {feedbackData?.userFeedback.map((feedback) => (
            <Card key={feedback.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFeedbackTypeIcon(feedback.type)}
                    <CardTitle className="text-lg">{feedback.title}</CardTitle>
                  </div>
                  <Badge>{feedback.status}</Badge>
                </div>
                <CardDescription>{new Date(feedback.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{feedback.description}</p>
                {feedback.rating && (
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
