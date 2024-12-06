"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const data = [
  { week: "Week 1", progress: 40 },
  { week: "Week 2", progress: 45 },
  { week: "Week 3", progress: 55 },
  { week: "Week 4", progress: 67 },
  { week: "Week 5", progress: 72 },
  { week: "Week 6", progress: 78 },
]

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
        <CardDescription>Your weekly learning progress over time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.week}</span>
              <span>{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

