"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { learningPathApi } from '@/app/services/api';
import { LearningPath, LearningPathModule, LearningPathResponse } from '@/app/types/learning-path';

export default function AILearningPathPage() {
  const [learningPaths, setLearningPaths] = useState<LearningPathResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLearningPaths();
  }, []);

  const loadLearningPaths = async () => {
    try {
      const data = await learningPathApi.getLearningPaths();
      setLearningPaths(data);
    } catch (error) {
      console.error('Error loading learning paths:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartModule = async (moduleId: string) => {
    try {
      // Implement module start functionality
      await learningPathApi.startModule(moduleId);
      await loadLearningPaths(); // Reload data to reflect changes
    } catch (error) {
      console.error('Error starting module:', error);
    }
  };

if (loading) {
    return <div>Loading learning paths...</div>;
}
if (!learningPaths || !learningPaths.currentPath) {
    return <div>No learning paths available at the moment.</div>;
}

if (loading) {
    return <div>Loading learning paths...</div>;
}

if (!learningPaths || !learningPaths.currentPath) {
    return <div>No learning paths available at the moment.</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Learning Path</h1>
        <Button variant="outline">Generate New Path</Button>
      </div>

      {learningPaths?.currentPath && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{learningPaths.currentPath.title}</CardTitle>
                <CardDescription>{learningPaths.currentPath.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{learningPaths.currentPath.totalProgress}%</span>
                </div>
                <Progress value={learningPaths.currentPath.totalProgress} />
              </div>

              <div className="space-y-4">
                {learningPaths.currentPath.modules.map((module) => (
                  <Card key={module.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {module.estimatedTime}
                            </div>
                            <Badge variant={
                              module.status === 'completed' ? 'default' :
                              module.status === 'in-progress' ? 'secondary' : 'outline'
                            }>
                              {module.status === 'completed' ? 'Completed' :
                               module.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleStartModule(module.id)}
                          disabled={module.status === 'completed'}
                        >
                          {module.status === 'completed' ? 'Completed' : 'Start'}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      {module.progress > 0 && (
                        <div className="mt-4">
                          <Progress value={module.progress} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {learningPaths?.recommendations && learningPaths.recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recommended Paths</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {learningPaths.recommendations.map((path) => (
              <Card key={path.id} className="cursor-pointer hover:bg-accent/50">
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge>{path.level}</Badge>
                    <Button variant="outline" size="sm">
                      Start Path
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
