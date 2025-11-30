import { describe, it, expect } from "vitest";
import {
  reportingConfig,
  generateReport,
  getAvailableReportTypes,
  scheduleReport,
} from "@/lib/ai/reporting";

describe("Reporting Service", () => {
  describe("reportingConfig", () => {
    it("should have correct service configuration", () => {
      expect(reportingConfig.id).toBe("reporting-service-v1");
      expect(reportingConfig.name).toBe("Reporting Service");
      expect(reportingConfig.version).toBe("1.0.0");
      expect(reportingConfig.enabled).toBe(true);
    });

    it("should have all required report types", () => {
      expect(reportingConfig.reportTypes).toContain("client-progress");
      expect(reportingConfig.reportTypes).toContain("placement-outcomes");
      expect(reportingConfig.reportTypes).toContain("training-effectiveness");
      expect(reportingConfig.reportTypes).toContain("employer-engagement");
      expect(reportingConfig.reportTypes).toContain("program-analytics");
    });

    it("should have valid schedule settings", () => {
      expect(reportingConfig.scheduleSettings.enableScheduledReports).toBe(true);
      expect(reportingConfig.scheduleSettings.timezone).toBe("America/Chicago");
    });
  });

  describe("generateReport", () => {
    it("should generate client-progress report", async () => {
      const result = await generateReport({
        reportType: "client-progress",
        dateRange: { start: "2025-01-01", end: "2025-11-30" },
      });

      expect(result.success).toBe(true);
      expect(result.data?.reportId).toBeDefined();
      expect(result.data?.generatedAt).toBeDefined();
      expect(result.data?.format).toBe("json");
      expect(result.data?.data?.metrics).toBeDefined();
    });

    it("should generate placement-outcomes report", async () => {
      const result = await generateReport({
        reportType: "placement-outcomes",
        dateRange: { start: "2025-01-01", end: "2025-11-30" },
      });

      expect(result.success).toBe(true);
      expect(result.data?.data?.metrics).toHaveProperty("totalPlacements");
      expect(result.data?.data?.industries).toBeInstanceOf(Array);
    });

    it("should include date range in report data", async () => {
      const dateRange = { start: "2025-06-01", end: "2025-12-01" };
      const result = await generateReport({
        reportType: "training-effectiveness",
        dateRange,
      });

      expect(result.success).toBe(true);
      expect(result.data?.data?.dateRange).toEqual(dateRange);
    });
  });

  describe("getAvailableReportTypes", () => {
    it("should return all available report types", () => {
      const types = getAvailableReportTypes();

      expect(types).toHaveLength(5);
      expect(types).toContain("client-progress");
      expect(types).toContain("placement-outcomes");
      expect(types).toContain("training-effectiveness");
      expect(types).toContain("employer-engagement");
      expect(types).toContain("program-analytics");
    });
  });

  describe("scheduleReport", () => {
    it("should schedule a recurring report", async () => {
      const result = await scheduleReport(
        "client-progress",
        "weekly",
        ["admin@example.com"]
      );

      expect(result.success).toBe(true);
      expect(result.data?.scheduleId).toBeDefined();
      expect(result.data?.scheduleId).toMatch(/^schedule-\d+-[a-z0-9]+$/);
    });

    it("should accept different frequencies", async () => {
      const frequencies = ["daily", "weekly", "monthly", "quarterly"] as const;

      for (const frequency of frequencies) {
        const result = await scheduleReport(
          "placement-outcomes",
          frequency,
          ["user@example.com"]
        );

        expect(result.success).toBe(true);
      }
    });
  });
});
