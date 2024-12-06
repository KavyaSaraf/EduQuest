import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Features - EduQuest',
  description: 'Advanced AI-powered learning features of EduQuest',
}

interface FeaturesLayoutProps {
  children: React.ReactNode
}

export default function FeaturesLayout({ children }: FeaturesLayoutProps) {
  return (
    <ClerkProvider>
    <div className="min-h-screen bg-background">
      <div className="flex-1">
        {children}
      </div>
    </div>
    </ClerkProvider>
  )
}

