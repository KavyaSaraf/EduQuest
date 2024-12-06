import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Clock, Medal, Trophy } from 'lucide-react'

interface Activity {
  id: string
  title: string
  type: 'course' | 'achievement' | 'quiz' | 'certificate'
  time: string
  description: string
  icon: JSX.Element
  score?: string
  badge?: string
}

const activities: Activity[] = [
  {
    id: '1',
    title: "Machine Learning Fundamentals",
    type: 'course',
    description: "Completed Chapter: Neural Networks",
    time: "2 hours ago",
    icon: <BookOpen className="h-4 w-4" />,
    badge: "Course Progress"
  },
  {
    id: '2',
    title: "Python Master",
    type: 'achievement',
    description: "Earned new achievement",
    time: "3 hours ago",
    icon: <Trophy className="h-4 w-4" />,
    badge: "Achievement"
  },
  {
    id: '3',
    title: "Data Structures Quiz",
    type: 'quiz',
    description: "Scored 95% in advanced quiz",
    time: "5 hours ago",
    icon: <Medal className="h-4 w-4" />,
    score: "95%",
    badge: "Quiz Complete"
  },
  {
    id: '4',
    title: "AI Ethics",
    type: 'course',
    description: "Started new module",
    time: "1 day ago",
    icon: <BookOpen className="h-4 w-4" />,
    badge: "New Module"
  },
  {
    id: '5',
    title: "Deep Learning",
    type: 'certificate',
    description: "Earned course certificate",
    time: "2 days ago",
    icon: <Medal className="h-4 w-4" />,
    badge: "Certificate"
  }
]

export function RecentActivities() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/placeholder.svg?text=${activity.title[0]}`} alt={activity.title} />
                  <AvatarFallback>{activity.title[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <Badge variant="secondary" className="ml-2">
                      {activity.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {activity.icon}
                    <span className="ml-1">{activity.description}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
                    </div>
                    {activity.score && (
                      <div className="text-sm font-medium text-green-600">
                        Score: {activity.score}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {activity.type === 'course' && (
                <Button variant="link" className="absolute bottom-2 right-2 h-8 px-2 text-sm">
                  Continue Learning
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

