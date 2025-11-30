import { NextRequest, NextResponse } from "next/server";
import {
  adaptiveLearningConfig,
  getLearningRecommendations,
  updateLearningPreferences,
  getAvailableLearningModes,
  getSupportedAccessibilityPreferences,
  LearningRecommendationRequest,
  LearningMode,
  AccessibilityPreference,
} from "@/lib/ai";

/**
 * GET /api/v1/ai/adaptive-learning
 * Get Adaptive Learning System configuration and options
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      config: adaptiveLearningConfig,
      availableModes: getAvailableLearningModes(),
      accessibilityPreferences: getSupportedAccessibilityPreferences(),
      status: "operational",
    },
  });
}

/**
 * POST /api/v1/ai/adaptive-learning
 * Get learning recommendations or update preferences
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case "get-recommendations": {
        const result = await getLearningRecommendations(
          payload as LearningRecommendationRequest
        );
        return NextResponse.json(result);
      }

      case "update-preferences": {
        const { clientId, preferences } = payload as {
          clientId: string;
          preferences: {
            preferredMode?: LearningMode;
            accessibilityNeeds?: AccessibilityPreference[];
            pacePreference?: "slow" | "moderate" | "fast";
          };
        };
        const result = await updateLearningPreferences(clientId, preferences);
        return NextResponse.json(result);
      }

      case "get-modes": {
        return NextResponse.json({
          success: true,
          data: { modes: getAvailableLearningModes() },
          requestId: `learn-${Date.now()}`,
          timestamp: new Date().toISOString(),
        });
      }

      case "get-accessibility-options": {
        return NextResponse.json({
          success: true,
          data: { options: getSupportedAccessibilityPreferences() },
          requestId: `learn-${Date.now()}`,
          timestamp: new Date().toISOString(),
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "INVALID_ACTION",
              message: `Unknown action: ${action}`,
            },
          },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: error instanceof Error ? error.message : "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}
