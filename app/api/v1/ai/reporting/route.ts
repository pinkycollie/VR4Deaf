import { NextRequest, NextResponse } from "next/server";
import {
  reportingConfig,
  generateReport,
  getAvailableReportTypes,
  scheduleReport,
  ReportRequest,
  ReportType,
} from "@/lib/ai";

/**
 * GET /api/v1/ai/reporting
 * Get Reporting service configuration and available report types
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      config: reportingConfig,
      availableReportTypes: getAvailableReportTypes(),
      status: "operational",
    },
  });
}

/**
 * POST /api/v1/ai/reporting
 * Generate reports or schedule recurring reports
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case "generate-report": {
        const result = await generateReport(payload as ReportRequest);
        return NextResponse.json(result);
      }

      case "schedule-report": {
        const { reportType, frequency, recipients } = payload as {
          reportType: ReportType;
          frequency: "daily" | "weekly" | "monthly" | "quarterly";
          recipients: string[];
        };
        const result = await scheduleReport(reportType, frequency, recipients);
        return NextResponse.json(result);
      }

      case "get-report-types": {
        return NextResponse.json({
          success: true,
          data: { reportTypes: getAvailableReportTypes() },
          requestId: `report-${Date.now()}`,
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
