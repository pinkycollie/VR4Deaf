/**
 * Adaptive Learning System
 * Personalized learning recommendations for the VR4Deaf platform.
 */

import {
  AdaptiveLearningConfig,
  LearningRecommendationRequest,
  LearningRecommendationResponse,
  LearningRecommendation,
  LearningMode,
  AccessibilityPreference,
  AIServiceResponse,
} from "./types";
import { generateRequestId } from "./utils";

/** Default configuration for Adaptive Learning System */
export const adaptiveLearningConfig: AdaptiveLearningConfig = {
  id: "adaptive-learning-v1",
  name: "Adaptive Learning System",
  description: "AI-powered personalized learning recommendations",
  version: "1.0.0",
  enabled: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  learningModes: ["self-paced", "instructor-led", "hybrid", "accessibility-focused"],
  adaptationSettings: {
    enableRealTimeAdaptation: true,
    assessmentFrequency: "after-each-module",
    accessibilityPreferences: [
      "visual-aids",
      "sign-language",
      "captioning",
      "audio-description",
      "haptic-feedback",
    ],
  },
};

/**
 * Generate learning recommendations based on client progress and preferences
 */
export async function getLearningRecommendations(
  request: LearningRecommendationRequest
): Promise<AIServiceResponse<LearningRecommendationResponse>> {
  const requestId = generateRequestId("learn");
  const timestamp = new Date().toISOString();

  try {
    const recommendations = generateRecommendations(request);
    const nextMilestone = calculateNextMilestone(request.currentProgress);
    const estimatedCompletionDate = calculateCompletionDate(request);

    return {
      success: true,
      data: {
        recommendations,
        nextMilestone,
        estimatedCompletionDate,
      },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "LEARNING_RECOMMENDATION_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/**
 * Update learning preferences for a client
 */
export async function updateLearningPreferences(
  clientId: string,
  preferences: {
    preferredMode?: LearningMode;
    accessibilityNeeds?: AccessibilityPreference[];
    pacePreference?: "slow" | "moderate" | "fast";
  }
): Promise<AIServiceResponse<{ updated: boolean }>> {
  const requestId = generateRequestId("learn");
  const timestamp = new Date().toISOString();

  try {
    // In a real implementation, this would update the database
    return {
      success: true,
      data: { updated: true },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "PREFERENCE_UPDATE_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/**
 * Get available learning modes
 */
export function getAvailableLearningModes(): LearningMode[] {
  return adaptiveLearningConfig.learningModes;
}

/**
 * Get supported accessibility preferences
 */
export function getSupportedAccessibilityPreferences(): AccessibilityPreference[] {
  return adaptiveLearningConfig.adaptationSettings.accessibilityPreferences;
}

/** Generate personalized learning recommendations */
function generateRecommendations(
  request: LearningRecommendationRequest
): LearningRecommendation[] {
  const allModules: LearningRecommendation[] = [
    {
      moduleId: "mod-001",
      title: "Introduction to Workplace Communication",
      priority: "high",
      reason: "Foundation skill for all career paths",
      estimatedDuration: 120,
    },
    {
      moduleId: "mod-002",
      title: "Digital Literacy Fundamentals",
      priority: "high",
      reason: "Essential for modern workplace",
      estimatedDuration: 180,
    },
    {
      moduleId: "mod-003",
      title: "Microsoft Office Essentials",
      priority: "medium",
      reason: "Commonly required in administrative roles",
      estimatedDuration: 240,
    },
    {
      moduleId: "mod-004",
      title: "Customer Service Skills",
      priority: "medium",
      reason: "Valuable for service-oriented positions",
      estimatedDuration: 150,
    },
    {
      moduleId: "mod-005",
      title: "Interview Preparation Workshop",
      priority: "high",
      reason: "Critical for job placement success",
      estimatedDuration: 90,
    },
    {
      moduleId: "mod-006",
      title: "Workplace Accommodation Advocacy",
      priority: "medium",
      reason: "Helps navigate accommodation requests",
      estimatedDuration: 60,
    },
  ];

  // Filter out completed modules
  const availableModules = allModules.filter(
    (module) => !request.currentProgress.completedModules.includes(module.moduleId)
  );

  // Adjust durations based on pace preference
  const paceMultiplier =
    request.preferences.pacePreference === "slow"
      ? 1.5
      : request.preferences.pacePreference === "fast"
      ? 0.75
      : 1.0;

  return availableModules
    .map((module) => ({
      ...module,
      estimatedDuration: Math.round(module.estimatedDuration * paceMultiplier),
    }))
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);
}

/** Calculate next milestone based on progress */
function calculateNextMilestone(progress: { completedModules: string[] }): string {
  const completedCount = progress.completedModules.length;

  if (completedCount < 2) return "Complete Core Skills Assessment";
  if (completedCount < 4) return "Finish Digital Literacy Track";
  if (completedCount < 6) return "Ready for Job Readiness Certification";
  return "Prepare for Job Placement";
}

/** Calculate estimated completion date */
function calculateCompletionDate(request: LearningRecommendationRequest): string {
  const remainingModules = 6 - request.currentProgress.completedModules.length;
  const daysPerModule =
    request.preferences.pacePreference === "slow"
      ? 14
      : request.preferences.pacePreference === "fast"
      ? 5
      : 10;

  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + remainingModules * daysPerModule);
  return completionDate.toISOString().split("T")[0];
}
