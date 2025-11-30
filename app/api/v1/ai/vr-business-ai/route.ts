import { NextRequest, NextResponse } from "next/server";
import {
  vrBusinessAIConfig,
  matchJobs,
  assessSkills,
  getAccommodationRecommendations,
  JobMatchRequest,
} from "@/lib/ai";

/**
 * GET /api/v1/ai/vr-business-ai
 * Get VR Business AI service configuration and status
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      config: vrBusinessAIConfig,
      status: "operational",
    },
  });
}

/**
 * POST /api/v1/ai/vr-business-ai
 * Execute VR Business AI operations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case "match-jobs": {
        const result = await matchJobs(payload as JobMatchRequest);
        return NextResponse.json(result);
      }

      case "assess-skills": {
        const { clientId, skills } = payload as { clientId: string; skills: string[] };
        const result = await assessSkills(clientId, skills);
        return NextResponse.json(result);
      }

      case "get-accommodations": {
        const { clientId, needs } = payload as { clientId: string; needs: string[] };
        const result = await getAccommodationRecommendations(clientId, needs);
        return NextResponse.json(result);
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
