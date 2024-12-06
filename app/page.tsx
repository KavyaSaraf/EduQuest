"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Lightbulb, Rocket } from 'lucide-react';
import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">EduQuest</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard/features/ai-tutor">
            AI Tutor
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard/features/analytics">
            Analytics
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard/features/ai-learning-path">
            Learning Path
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard/features/collaborative">
            Collaborative
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard/features/feedback">
            Feedback
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Unlock Your AI Potential with EduQuest
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Embark on a journey of AI discovery. Learn, create, and innovate with our cutting-edge AI learning platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => router.push('/dashboard')}>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 EduQuest. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
