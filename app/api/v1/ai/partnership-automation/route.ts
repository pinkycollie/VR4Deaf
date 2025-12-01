import { NextRequest, NextResponse } from "next/server";
import {
  partnershipAutomationConfig,
  executeAction,
  scorePartnerLead,
  scheduleFollowUp,
  generatePartnershipDocument,
  getAvailableFeatures,
  PartnershipActionRequest,
} from "@/lib/ai";

/**
 * GET /api/v1/ai/partnership-automation
 * Get Partnership Automation configuration and available features
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      config: partnershipAutomationConfig,
      availableFeatures: getAvailableFeatures(),
      status: "operational",
    },
  });
}

/**
 * POST /api/v1/ai/partnership-automation
 * Execute partnership automation actions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case "execute-action": {
        const result = await executeAction(payload as PartnershipActionRequest);
        return NextResponse.json(result);
      }

      case "score-lead": {
        const partnerData = payload as {
          companyName: string;
          industry: string;
          size: string;
          previousHiring: boolean;
          accessibilityCommitment: boolean;
        };
        const result = await scorePartnerLead(partnerData);
        return NextResponse.json(result);
      }

      case "schedule-followup": {
        const { partnerId, followUpType, scheduledDate } = payload as {
          partnerId: string;
          followUpType: "initial" | "monthly" | "quarterly" | "annual";
          scheduledDate: string;
        };
        const result = await scheduleFollowUp(partnerId, followUpType, scheduledDate);
        return NextResponse.json(result);
      }

      case "generate-document": {
        const { partnerId, documentType } = payload as {
          partnerId: string;
          documentType: "agreement" | "proposal" | "report" | "invoice";
        };
        const result = await generatePartnershipDocument(partnerId, documentType);
        return NextResponse.json(result);
      }

      case "get-features": {
        return NextResponse.json({
          success: true,
          data: { features: getAvailableFeatures() },
          requestId: `partner-${Date.now()}`,
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
