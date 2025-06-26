"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Star } from "lucide-react"

interface CheckpointFeedbackProps {
  checkpointName: string
  onSubmit: (feedback: string, rating: number) => void
  onBack: () => void
  journeyType: "business" | "job"
}

export default function CheckpointFeedback({ checkpointName, onSubmit, onBack, journeyType }: CheckpointFeedbackProps) {
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = () => {
    onSubmit(feedback, rating)
  }

  const themeColor = journeyType === "business" ? "purple" : "blue"

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader className={`bg-${themeColor}-50 border-b`}>
          <CardTitle>Checkpoint Completed!</CardTitle>
          <CardDescription>
            Congratulations on completing the {checkpointName} checkpoint. Please share your feedback to help us
            improve.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How would you rate this checkpoint?</h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? `text-${themeColor}-500 fill-${themeColor}-500`
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Share your thoughts</h3>
              <Textarea
                placeholder="What did you like? What could be improved?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-green-800 mb-2">What's Next?</h3>
              <p className="text-green-700">
                Your progress has been saved. You can now continue to the next checkpoint in your journey or revisit
                previous checkpoints.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Skip Feedback
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={rating === 0 ? "opacity-50 cursor-not-allowed" : ""}
          >
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
