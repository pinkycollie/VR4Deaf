/**
 * VR Business AI Service
 * Core AI service for business operations in the VR4Deaf platform.
 */

import {
  VRBusinessAIConfig,
  JobMatchRequest,
  JobMatchResponse,
  JobMatch,
  AIServiceResponse,
} from "./types";
import { generateRequestId, SKILL_ASSESSMENT } from "./utils";

/** Default configuration for VR Business AI */
export const vrBusinessAIConfig: VRBusinessAIConfig = {
  id: "vr-business-ai-v1",
  name: "VR Business AI",
  description:
    "AI-powered business operations for vocational rehabilitation services",
  version: "1.0.0",
  enabled: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  capabilities: [
    "job-matching",
    "skills-assessment",
    "career-planning",
    "accommodation-recommendations",
    "employer-matching",
  ],
  settings: {
    maxConcurrentRequests: 100,
    responseTimeoutMs: 30000,
    confidenceThreshold: 0.75,
  },
};

/**
 * Match jobs to client profile based on skills and preferences
 */
export async function matchJobs(
  request: JobMatchRequest
): Promise<AIServiceResponse<JobMatchResponse>> {
  const requestId = generateRequestId("vr");
  const timestamp = new Date().toISOString();

  try {
    // Simulate job matching logic
    const matches = generateJobMatches(request);

    return {
      success: true,
      data: {
        matches,
        confidence: calculateConfidence(matches),
      },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "JOB_MATCH_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/**
 * Assess client skills and provide recommendations
 */
export async function assessSkills(
  clientId: string,
  skills: string[]
): Promise<AIServiceResponse<{ assessedSkills: Record<string, number> }>> {
  const requestId = generateRequestId("vr");
  const timestamp = new Date().toISOString();

  try {
    const assessedSkills: Record<string, number> = {};
    skills.forEach((skill) => {
      // Simulate skill assessment scoring using defined constants
      assessedSkills[skill] = Math.round(
        Math.random() * SKILL_ASSESSMENT.SCORE_RANGE + SKILL_ASSESSMENT.MIN_SCORE
      );
    });

    return {
      success: true,
      data: { assessedSkills },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "SKILL_ASSESSMENT_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/**
 * Get accommodation recommendations for a client
 */
export async function getAccommodationRecommendations(
  clientId: string,
  needs: string[]
): Promise<AIServiceResponse<{ recommendations: string[] }>> {
  const requestId = generateRequestId("vr");
  const timestamp = new Date().toISOString();

  try {
    const accommodationMap: Record<string, string[]> = {
      hearing: [
        "Sign language interpreter",
        "Visual alerts",
        "Captioning services",
      ],
      visual: [
        "Screen reader compatibility",
        "High contrast displays",
        "Audio descriptions",
      ],
      mobility: [
        "Accessible workstation",
        "Remote work options",
        "Ergonomic equipment",
      ],
      cognitive: [
        "Written instructions",
        "Task management tools",
        "Flexible scheduling",
      ],
    };

    const recommendations: string[] = [];
    needs.forEach((need) => {
      const recs = accommodationMap[need.toLowerCase()];
      if (recs) {
        recommendations.push(...recs);
      }
    });

    return {
      success: true,
      data: { recommendations: [...new Set(recommendations)] },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "ACCOMMODATION_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/** Helper function to generate sample job matches */
function generateJobMatches(request: JobMatchRequest): JobMatch[] {
  const sampleJobs: JobMatch[] = [
    {
      jobId: "job-001",
      title: "Administrative Assistant",
      employer: "ABC Corporation",
      matchScore: 0.85,
      accommodationSupport: ["Flexible scheduling", "Remote work options"],
    },
    {
      jobId: "job-002",
      title: "IT Support Specialist",
      employer: "Tech Solutions Inc.",
      matchScore: 0.78,
      accommodationSupport: [
        "Accessible workstation",
        "Communication aids",
      ],
    },
    {
      jobId: "job-003",
      title: "Customer Service Representative",
      employer: "Service First LLC",
      matchScore: 0.72,
      accommodationSupport: ["Visual alerts", "Captioning services"],
    },
  ];

  // Filter and sort based on request preferences
  return sampleJobs
    .filter((job) => job.matchScore >= vrBusinessAIConfig.settings.confidenceThreshold)
    .sort((a, b) => b.matchScore - a.matchScore);
}

/** Helper function to calculate overall confidence */
function calculateConfidence(matches: JobMatch[]): number {
  if (matches.length === 0) return 0;
  const avgScore = matches.reduce((sum, m) => sum + m.matchScore, 0) / matches.length;
  return Math.round(avgScore * 100) / 100;
}
