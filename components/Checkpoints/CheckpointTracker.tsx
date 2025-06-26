"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

export interface Checkpoint {
  id: string
  name: string
  description: string
  status: "not-started" | "in-progress" | "completed"
  completionPercentage: number
}

export interface Phase {
  id: string
  name: string
  completionPercentage: number
  checkpoints: Checkpoint[]
}

export interface CheckpointJourney {
  id: string
  name: string
  description: string
  overallProgress: number
  phases: Phase[]
}

interface CheckpointTrackerProps {
  journey: CheckpointJourney
  onCheckpointSelect: (phaseId: string, checkpointId: string) => void
  isBusinessJourney: boolean
}

export default function CheckpointTracker({ journey, onCheckpointSelect, isBusinessJourney }: CheckpointTrackerProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(journey.phases.map((phase) => phase.id))

  const togglePhase = (phaseId: string) => {
    if (expandedPhases.includes(phaseId)) {
      setExpandedPhases(expandedPhases.filter((id) => id !== phaseId))
    } else {
      setExpandedPhases([...expandedPhases, phaseId])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            In Progress
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            Not Started
          </Badge>
        )
    }
  }

  const themeColor = isBusinessJourney ? "purple" : "blue"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Checkpoints</h2>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Overall Progress:</span>
          <span className="text-sm font-medium">{journey.overallProgress}%</span>
        </div>
      </div>

      <Progress value={journey.overallProgress} className={`h-2 bg-${themeColor}-100`} />

      <div className="space-y-4">
        {journey.phases.map((phase) => (
          <Card key={phase.id} className={`border-l-4 border-l-${themeColor}-500`}>
            <CardHeader className="pb-2 cursor-pointer" onClick={() => togglePhase(phase.id)}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CardTitle className="text-lg">{phase.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${
                      phase.completionPercentage === 100
                        ? "bg-green-100 text-green-800 border-green-200"
                        : phase.completionPercentage > 0
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {phase.completionPercentage}%
                  </Badge>
                </div>
                {expandedPhases.includes(phase.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <Progress value={phase.completionPercentage} className={`h-1.5 bg-${themeColor}-100 mt-2`} />
            </CardHeader>

            {expandedPhases.includes(phase.id) && (
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {phase.checkpoints.map((checkpoint) => (
                    <div
                      key={checkpoint.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-${themeColor}-50`}
                      onClick={() => onCheckpointSelect(phase.id, checkpoint.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">{getStatusIcon(checkpoint.status)}</div>
                          <div>
                            <h3 className="font-medium">{checkpoint.name}</h3>
                            <p className="text-sm text-gray-600">{checkpoint.description}</p>
                          </div>
                        </div>
                        <div>{getStatusText(checkpoint.status)}</div>
                      </div>

                      {checkpoint.status === "in-progress" && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{checkpoint.completionPercentage}%</span>
                          </div>
                          <Progress value={checkpoint.completionPercentage} className={`h-1.5 bg-${themeColor}-100`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
