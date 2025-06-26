"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Users, ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react"
import CheckpointTracker, { type CheckpointJourney } from "@/components/Checkpoints/CheckpointTracker"
import CheckpointModule from "@/components/Checkpoints/CheckpointModule"
import CheckpointFeedback from "@/components/Checkpoints/CheckpointFeedback"

// Sample data for Business Magician journey
const businessJourney: CheckpointJourney = {
  id: "business-magician",
  name: "Business Magician Journey",
  description: "Transform your business idea into reality with our guided checkpoints",
  overallProgress: 35,
  phases: [
    {
      id: "idea",
      name: "Idea",
      completionPercentage: 100,
      checkpoints: [
        {
          id: "business-vision",
          name: "Business Vision",
          description: "Define your mission, niche, and goals",
          status: "completed",
          completionPercentage: 100,
        },
      ],
    },
    {
      id: "build",
      name: "Build",
      completionPercentage: 50,
      checkpoints: [
        {
          id: "structure-legal",
          name: "Structure & Legal",
          description: "File documents, register business, EIN",
          status: "completed",
          completionPercentage: 100,
        },
        {
          id: "financial-setup",
          name: "Financial Setup",
          description: "Open bank account, credit building",
          status: "in-progress",
          completionPercentage: 60,
        },
      ],
    },
    {
      id: "grow",
      name: "Grow",
      completionPercentage: 0,
      checkpoints: [
        {
          id: "market-ops",
          name: "Market & Ops",
          description: "Marketing plan, automation setup",
          status: "not-started",
          completionPercentage: 0,
        },
        {
          id: "funding-strategy",
          name: "Funding Strategy",
          description: "Capital sources, revenue streams",
          status: "not-started",
          completionPercentage: 0,
        },
      ],
    },
    {
      id: "manage",
      name: "Manage",
      completionPercentage: 0,
      checkpoints: [
        {
          id: "compliance-scaling",
          name: "Compliance & Scaling",
          description: "SOPs, tax filing, HR, etc.",
          status: "not-started",
          completionPercentage: 0,
        },
      ],
    },
  ],
}

// Sample data for Job Coach journey
const jobJourney: CheckpointJourney = {
  id: "job-coach",
  name: "Job Coach Journey",
  description: "Navigate your career path with our guided checkpoints",
  overallProgress: 40,
  phases: [
    {
      id: "assessment",
      name: "Assessment",
      completionPercentage: 100,
      checkpoints: [
        {
          id: "career-mapping",
          name: "Career Mapping",
          description: "Explore paths based on personality + goals",
          status: "completed",
          completionPercentage: 100,
        },
      ],
    },
    {
      id: "skills",
      name: "Skills",
      completionPercentage: 75,
      checkpoints: [
        {
          id: "soft-hard-skills",
          name: "Soft + Hard Skills",
          description: "Rate & train on job-essential skills",
          status: "in-progress",
          completionPercentage: 75,
        },
      ],
    },
    {
      id: "training",
      name: "Training",
      completionPercentage: 25,
      checkpoints: [
        {
          id: "enroll-learn",
          name: "Enroll + Learn",
          description: "Assign training courses, track progress",
          status: "in-progress",
          completionPercentage: 25,
        },
      ],
    },
    {
      id: "resume",
      name: "Résumé",
      completionPercentage: 0,
      checkpoints: [
        {
          id: "resume-linkedin",
          name: "Résumé + LinkedIn",
          description: "Build assets, review with AI + mentor",
          status: "not-started",
          completionPercentage: 0,
        },
      ],
    },
    {
      id: "placement",
      name: "Placement",
      completionPercentage: 0,
      checkpoints: [
        {
          id: "job-app-followup",
          name: "Job App & Followup",
          description: "Apply, track apps, interview prep",
          status: "not-started",
          completionPercentage: 0,
        },
      ],
    },
  ],
}

export default function Home() {
  const [activeView, setActiveView] = useState<"tracker" | "module" | "feedback">("tracker")
  const [activeJourney, setActiveJourney] = useState<"business" | "job">("business")
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<{
    phaseId: string
    checkpointId: string
  } | null>(null)
  const [recentActivity, setRecentActivity] = useState<
    Array<{
      id: string
      type: string
      description: string
      timestamp: string
    }>
  >([
    {
      id: "act1",
      type: "checkpoint_completed",
      description: "Completed Business Vision checkpoint",
      timestamp: "2 days ago",
    },
    {
      id: "act2",
      type: "checkpoint_started",
      description: "Started Financial Setup checkpoint",
      timestamp: "1 day ago",
    },
  ])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleCheckpointSelect = (phaseId: string, checkpointId: string) => {
    setSelectedCheckpoint({ phaseId, checkpointId })
    setActiveView("module")
  }

  const handleBackToTracker = () => {
    setActiveView("tracker")
  }

  const handleCompleteCheckpoint = () => {
    setActiveView("feedback")
  }

  const handleSubmitFeedback = (feedback: string, rating: number) => {
    // In a real app, this would save the feedback to the database
    const currentCheckpoint = getCurrentCheckpoint()

    if (currentCheckpoint) {
      // Add to recent activity
      setRecentActivity([
        {
          id: `act-${Date.now()}`,
          type: "checkpoint_completed",
          description: `Completed ${currentCheckpoint.name} checkpoint`,
          timestamp: "Just now",
        },
        ...recentActivity,
      ])

      // In a real implementation, we would update the checkpoint status in the database
      // For now, we'll just go back to the tracker
    }

    setActiveView("tracker")
  }

  const getCurrentCheckpoint = () => {
    if (!selectedCheckpoint) return null

    const journey = activeJourney === "business" ? businessJourney : jobJourney
    const phase = journey.phases.find((p) => p.id === selectedCheckpoint.phaseId)
    if (!phase) return null

    return phase.checkpoints.find((c) => c.id === selectedCheckpoint.checkpointId) || null
  }

  const getNextRecommendedCheckpoint = () => {
    const journey = activeJourney === "business" ? businessJourney : jobJourney

    // Find the first in-progress checkpoint
    for (const phase of journey.phases) {
      const inProgressCheckpoint = phase.checkpoints.find((c) => c.status === "in-progress")
      if (inProgressCheckpoint) {
        return { checkpoint: inProgressCheckpoint, phaseId: phase.id }
      }
    }

    // If no in-progress, find the first not-started
    for (const phase of journey.phases) {
      const notStartedCheckpoint = phase.checkpoints.find((c) => c.status === "not-started")
      if (notStartedCheckpoint) {
        return { checkpoint: notStartedCheckpoint, phaseId: phase.id }
      }
    }

    return null
  }

  const currentCheckpoint = getCurrentCheckpoint()
  const nextRecommended = getNextRecommendedCheckpoint()

  const journeyColor = activeJourney === "business" ? "purple" : "blue"

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Interactive Checkpoint System</h1>
      <p className="text-gray-500 text-center mb-8">Track your progress through guided checkpoints</p>

      <div className="mb-6">
        <Tabs
          defaultValue={activeJourney}
          onValueChange={(value) => setActiveJourney(value as "business" | "job")}
          className="w-full max-w-md mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business" className="flex items-center justify-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Business Magician
            </TabsTrigger>
            <TabsTrigger value="job" className="flex items-center justify-center">
              <Users className="w-4 h-4 mr-2" />
              Job Coach
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeView === "tracker" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CheckpointTracker
              journey={activeJourney === "business" ? businessJourney : jobJourney}
              onCheckpointSelect={handleCheckpointSelect}
              isBusinessJourney={activeJourney === "business"}
            />
          </div>

          <div className="space-y-6">
            {/* Journey Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-${journeyColor}-600`}>
                  {activeJourney === "business" ? "Business Magician" : "Job Coach"} Journey
                </CardTitle>
                <CardDescription>
                  {activeJourney === "business" ? businessJourney.description : jobJourney.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm font-medium">
                        {activeJourney === "business" ? businessJourney.overallProgress : jobJourney.overallProgress}%
                      </span>
                    </div>
                    <Progress
                      value={
                        activeJourney === "business" ? businessJourney.overallProgress : jobJourney.overallProgress
                      }
                      className={`h-2 bg-${journeyColor}-100`}
                    />
                  </div>

                  {nextRecommended && (
                    <div className={`p-4 bg-${journeyColor}-50 rounded-lg`}>
                      <h3 className="font-medium mb-2">Next Recommended Checkpoint</h3>
                      <div className="flex items-start space-x-3">
                        {nextRecommended.checkpoint.status === "in-progress" ? (
                          <Clock className={`w-5 h-5 text-${journeyColor}-500 mt-0.5 flex-shrink-0`} />
                        ) : (
                          <AlertCircle className={`w-5 h-5 text-${journeyColor}-500 mt-0.5 flex-shrink-0`} />
                        )}
                        <div>
                          <p className="font-medium">{nextRecommended.checkpoint.name}</p>
                          <p className="text-sm text-gray-600">{nextRecommended.checkpoint.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`mt-2 border-${journeyColor}-200 text-${journeyColor}-700 hover:bg-${journeyColor}-50`}
                            onClick={() =>
                              handleCheckpointSelect(nextRecommended.phaseId, nextRecommended.checkpoint.id)
                            }
                          >
                            Continue <ArrowRight className="ml-2 w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      {activity.type === "checkpoint_completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeView === "module" && currentCheckpoint && (
        <CheckpointModule
          checkpoint={currentCheckpoint}
          onComplete={handleCompleteCheckpoint}
          onBack={handleBackToTracker}
          journeyType={activeJourney}
        />
      )}

      {activeView === "feedback" && currentCheckpoint && (
        <CheckpointFeedback
          checkpointName={currentCheckpoint.name}
          onSubmit={handleSubmitFeedback}
          onBack={() => setActiveView("module")}
          journeyType={activeJourney}
        />
      )}

      {!currentCheckpoint && activeView !== "tracker" && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">No checkpoint selected</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={handleBackToTracker}>Back to Checkpoints</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
