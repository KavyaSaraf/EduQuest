"use client";

import { LearningPathChart } from '@/components/LearningPathChart';
import { LearningPathForm } from '@/components/LearningPathForm';
import { LearningPath } from '@/types/learning-path';
import { useState } from 'react';


export default function LearningPathPage() {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI-Powered Learning Path Generator</h1>
      <LearningPathForm setLearningPath={setLearningPath} />
      {learningPath && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Learning Path for {learningPath.subject}</h2>
          <p className="mb-4">Click on a node to view more details about each topic in your learning path.</p>
          <LearningPathChart learningPath={learningPath} />
        </div>
      )}
    </div>
  );
}