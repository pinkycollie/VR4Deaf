"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Video, FileText, MessageSquare } from "lucide-react"
import type { Checkpoint } from "./CheckpointTracker"

interface CheckpointModuleProps {
  checkpoint: Checkpoint
  onComplete: () => void
  onBack: () => void
  journeyType: "business" | "job"
}

export default function CheckpointModule({ checkpoint, onComplete, onBack, journeyType }: CheckpointModuleProps) {
  const [activeTab, setActiveTab] = useState("content")
  const [progress, setProgress] = useState(checkpoint.completionPercentage)
  const [tasksCompleted, setTasksCompleted] = useState<string[]>([])

  // Sample tasks for the checkpoint
  const tasks = [
    { id: "task1", title: "Read introduction materials", type: "reading" },
    { id: "task2", title: "Watch tutorial video", type: "video" },
    { id: "task3", title: "Complete interactive exercise", type: "exercise" },
    { id: "task4", title: "Schedule mentor meeting", type: "action" },
  ]

  const handleTaskComplete = (taskId: string) => {
    if (tasksCompleted.includes(taskId)) {
      // Task already completed, do nothing
      return
    }

    const newTasksCompleted = [...tasksCompleted, taskId]
    setTasksCompleted(newTasksCompleted)

    // Calculate new progress
    const newProgress = Math.round((newTasksCompleted.length / tasks.length) * 100)
    setProgress(newProgress)
  }

  const isAllTasksCompleted = tasksCompleted.length === tasks.length
  const themeColor = journeyType === "business" ? "purple" : "blue"

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Checkpoints
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{checkpoint.name}</CardTitle>
              <CardDescription className="mt-2">{checkpoint.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium mb-1">Progress: {progress}%</div>
              <Progress value={progress} className={`h-2 w-24 bg-${themeColor}-100`} />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center justify-center">
                <Video className="w-4 h-4 mr-2" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="discussion" className="flex items-center justify-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="pt-4">
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3>Introduction</h3>
                  <p>
                    Welcome to the {checkpoint.name} checkpoint! This module will guide you through the essential steps
                    to
                    {journeyType === "business"
                      ? " establish a strong foundation for your business."
                      : " develop the skills needed for your career advancement."}
                  </p>

                  <h3>What You'll Learn</h3>
                  <ul>
                    <li>Understanding the key components of {checkpoint.name}</li>
                    <li>Practical steps to implement these concepts</li>
                    <li>How to measure success and track progress</li>
                    <li>Common challenges and how to overcome them</li>
                  </ul>

                  <h3>Why This Matters</h3>
                  <p>
                    {journeyType === "business"
                      ? "A solid business foundation is crucial for long-term success and growth. This checkpoint will help you avoid common pitfalls and set your business up for success from the start."
                      : "Developing these skills is essential for career advancement and job satisfaction. This checkpoint will help you stand out in the job market and excel in your chosen field."}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Tasks to Complete</h3>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              tasksCompleted.includes(task.id)
                                ? `bg-${themeColor}-100 text-${themeColor}-600`
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {task.type === "reading" && <FileText className="w-4 h-4" />}
                            {task.type === "video" && <Video className="w-4 h-4" />}
                            {task.type === "exercise" && <MessageSquare className="w-4 h-4" />}
                            {task.type === "action" && <CheckCircle className="w-4 h-4" />}
                          </div>
                          <span>{task.title}</span>
                        </div>
                        <Button
                          variant={tasksCompleted.includes(task.id) ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleTaskComplete(task.id)}
                          disabled={tasksCompleted.includes(task.id)}
                        >
                          {tasksCompleted.includes(task.id) ? "Completed" : "Mark Complete"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Video className="w-4 h-4 mr-2" />
                        Tutorial Video
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">Video placeholder</p>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        A comprehensive guide to {checkpoint.name.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Downloadable Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">{checkpoint.name} Checklist.pdf</span>
                        </li>
                        <li className="flex items-center p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">Quick Start Guide.pdf</span>
                        </li>
                        <li className="flex items-center p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">Template Document.docx</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">External Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          {journeyType === "business"
                            ? "Small Business Administration Guide"
                            : "Career Development Resources"}
                        </a>
                        <p className="text-sm text-gray-600">Official resources and guides from trusted sources</p>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          {journeyType === "business" ? "Business Model Canvas Template" : "Skills Assessment Tools"}
                        </a>
                        <p className="text-sm text-gray-600">Interactive tools to help you plan and execute</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="discussion" className="pt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Community Discussion</CardTitle>
                    <CardDescription>Connect with others working on the same checkpoint</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <p className="text-gray-600">Discussion forum will be available soon</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ask a Mentor</CardTitle>
                    <CardDescription>Get personalized guidance from experienced mentors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <textarea
                        className="w-full p-3 border rounded-md"
                        rows={3}
                        placeholder="Type your question here..."
                      ></textarea>
                      <Button className="w-full">Submit Question</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Save & Exit
          </Button>
          <Button
            onClick={onComplete}
            disabled={!isAllTasksCompleted}
            className={!isAllTasksCompleted ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isAllTasksCompleted ? "Complete Checkpoint" : "Complete All Tasks First"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
