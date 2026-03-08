import { describe, it, expect } from "vitest";
import {
  generateRSA911Report,
  exportReport,
  ReportCase,
} from "@/lib/ai/AIReportGenerator";

describe("AIReportGenerator", () => {
  const sampleCases: ReportCase[] = [
    {
      caseId: "CASE-001",
      clientId: "client-001",
      clientAge: 28,
      disability: ["Deaf"],
      serviceStartDate: "2024-01-15",
      serviceEndDate: "2024-06-30",
      status: "closed",
      outcome: "employed",
      employmentDetails: {
        employer: "Tech Solutions Inc.",
        position: "Software Developer",
        salary: 75000,
        hours: 40,
        startDate: "2024-07-01",
      },
      servicesProvided: [
        {
          serviceType: "Skills Assessment",
          serviceDate: "2024-01-20",
          hours: 3,
          provider: "Jane Counselor",
        },
        {
          serviceType: "Job Training",
          serviceDate: "2024-03-15",
          hours: 120,
          provider: "Training Center",
        },
      ],
      costs: [
        { category: "Assessment", amount: 500, date: "2024-01-20", vendor: "Assessment Co" },
        { category: "Training", amount: 3000, date: "2024-03-15", vendor: "Training Center" },
      ],
    },
    {
      caseId: "CASE-002",
      clientId: "client-002",
      clientAge: 35,
      disability: ["Visual Impairment"],
      serviceStartDate: "2024-02-01",
      status: "active",
      servicesProvided: [
        {
          serviceType: "Counseling",
          serviceDate: "2024-02-10",
          hours: 2,
          provider: "John Counselor",
        },
      ],
      costs: [
        { category: "Counseling", amount: 200, date: "2024-02-10", vendor: "VR Services" },
      ],
    },
    {
      caseId: "CASE-003",
      clientId: "client-003",
      clientAge: 42,
      disability: ["Deaf", "Mobility Impairment"],
      serviceStartDate: "2024-01-10",
      serviceEndDate: "2024-05-15",
      status: "closed",
      outcome: "education",
      servicesProvided: [
        {
          serviceType: "Education Planning",
          serviceDate: "2024-01-25",
          hours: 5,
          provider: "Education Specialist",
        },
      ],
      costs: [
        { category: "Planning", amount: 750, date: "2024-01-25", vendor: "Education Services" },
      ],
    },
  ];

  describe("generateRSA911Report", () => {
    it("should generate a complete RSA-911 report", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency",
        "TX-001"
      );

      expect(report).toBeDefined();
      expect(report.reportId).toBeDefined();
      expect(report.agencyName).toBe("Test Agency");
      expect(report.agencyCode).toBe("TX-001");
      expect(report.summary).toBeDefined();
      expect(report.demographics).toBeDefined();
      expect(report.outcomes).toBeDefined();
      expect(report.services).toBeDefined();
      expect(report.costs).toBeDefined();
    });

    it("should include report metadata", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.reportId).toMatch(/^RSA-911-/);
      expect(report.generatedDate).toBeDefined();
      expect(new Date(report.generatedDate).getTime()).toBeLessThanOrEqual(Date.now());
      expect(report.reportPeriod.start).toBe("2024-01-01");
      expect(report.reportPeriod.end).toBe("2024-12-31");
    });

    it("should calculate summary statistics correctly", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.summary.totalCases).toBe(3);
      expect(report.summary.closedCases).toBe(2);
      expect(report.summary.activeCases).toBe(1);
      expect(report.summary.successfulOutcomes).toBe(2); // employed + education
      expect(report.summary.successRate).toBeGreaterThan(0);
    });

    it("should generate demographics data", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.demographics.ageDistribution).toBeDefined();
      expect(report.demographics.disabilityTypes).toBeDefined();
      expect(Object.keys(report.demographics.disabilityTypes).length).toBeGreaterThan(0);
    });

    it("should calculate outcome statistics", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.outcomes.totalClosures).toBe(2);
      expect(report.outcomes.employed).toBe(1);
      expect(report.outcomes.education).toBe(1);
      expect(report.outcomes.selfEmployed).toBe(0);
      expect(report.outcomes.unsuccessful).toBe(0);
      expect(report.outcomes.averageWage).toBeGreaterThan(0);
    });

    it("should calculate service statistics", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.services.totalServices).toBeGreaterThan(0);
      expect(report.services.totalHours).toBeGreaterThan(0);
      expect(report.services.servicesByType).toBeDefined();
      expect(report.services.topServices).toBeDefined();
      expect(report.services.topServices.length).toBeGreaterThan(0);
    });

    it("should calculate cost analysis", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.costs.totalCosts).toBeGreaterThan(0);
      expect(report.costs.averageCostPerClient).toBeGreaterThan(0);
      expect(report.costs.costsByCategory).toBeDefined();
      expect(report.costs.costPerSuccessfulOutcome).toBeGreaterThan(0);
    });

    it("should filter cases by report period", () => {
      const allCases = [
        ...sampleCases,
        {
          caseId: "CASE-OLD",
          clientId: "client-old",
          clientAge: 30,
          disability: [],
          serviceStartDate: "2023-06-01", // Outside period
          status: "closed" as const,
          servicesProvided: [],
          costs: [],
        },
      ];

      const report = generateRSA911Report(
        allCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.cases.length).toBeLessThan(allCases.length);
    });

    it("should handle empty case list", () => {
      const report = generateRSA911Report(
        [],
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      expect(report.summary.totalCases).toBe(0);
      expect(report.summary.successRate).toBe(0);
      expect(report.costs.averageCostPerClient).toBe(0);
    });
  });

  describe("exportReport - JSON", () => {
    it("should export report as JSON", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "json");

      expect(result.success).toBe(true);
      expect(result.data?.content).toBeDefined();
      expect(result.data?.filename).toMatch(/\.json$/);
      
      // Verify JSON is valid
      const parsed = JSON.parse(result.data?.content || "");
      expect(parsed.reportId).toBe(report.reportId);
    });
  });

  describe("exportReport - CSV", () => {
    it("should export report as CSV", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "csv");

      expect(result.success).toBe(true);
      expect(result.data?.content).toBeDefined();
      expect(result.data?.filename).toMatch(/\.csv$/);
      expect(result.data?.content).toContain("RSA-911 Report");
      expect(result.data?.content).toContain("Test Agency");
    });

    it("should include summary in CSV export", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "csv");

      expect(result.data?.content).toContain("Summary");
      expect(result.data?.content).toContain("Total Cases");
      expect(result.data?.content).toContain("Success Rate");
    });

    it("should include outcomes in CSV export", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "csv");

      expect(result.data?.content).toContain("Outcomes");
      expect(result.data?.content).toContain("Employed");
      expect(result.data?.content).toContain("Education");
    });

    it("should include costs in CSV export", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "csv");

      expect(result.data?.content).toContain("Cost Analysis");
      expect(result.data?.content).toContain("Total Costs");
    });
  });

  describe("exportReport - HTML", () => {
    it("should export report as accessible HTML", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "html");

      expect(result.success).toBe(true);
      expect(result.data?.content).toBeDefined();
      expect(result.data?.filename).toMatch(/\.html$/);
      expect(result.data?.content).toContain("<!DOCTYPE html>");
      expect(result.data?.content).toContain("RSA-911 Report");
    });

    it("should include accessibility attributes in HTML", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "html");

      expect(result.data?.content).toContain('role="table"');
      expect(result.data?.content).toContain('role="region"');
      expect(result.data?.content).toContain('aria-label');
    });

    it("should include semantic HTML structure", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "html");

      expect(result.data?.content).toContain("<section");
      expect(result.data?.content).toContain("<h1>");
      expect(result.data?.content).toContain('id="summary-heading">Summary</h2>');
      expect(result.data?.content).toContain("<table");
      expect(result.data?.content).toContain("<thead");
      expect(result.data?.content).toContain("<tbody");
    });

    it("should include CSS styling in HTML", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "html");

      expect(result.data?.content).toContain("<style>");
      expect(result.data?.content).toContain("</style>");
    });
  });

  describe("Error Handling", () => {
    it("should handle unsupported export format", async () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency"
      );

      const result = await exportReport(report, "xml" as any);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe("REPORT_EXPORT_ERROR");
    });
  });

  describe("RSA-911 Compliance", () => {
    it("should include all required RSA-911 data points", () => {
      const report = generateRSA911Report(
        sampleCases,
        { start: "2024-01-01", end: "2024-12-31" },
        "Test Agency",
        "TX-001"
      );

      // Agency information
      expect(report.agencyName).toBeDefined();
      expect(report.agencyCode).toBeDefined();

      // Demographics
      expect(report.demographics.ageDistribution).toBeDefined();
      expect(report.demographics.disabilityTypes).toBeDefined();

      // Outcomes
      expect(report.outcomes.totalClosures).toBeDefined();
      expect(report.outcomes.employed).toBeDefined();
      expect(report.outcomes.averageWage).toBeDefined();
      expect(report.outcomes.averageHoursWorked).toBeDefined();

      // Services
      expect(report.services.totalServices).toBeDefined();
      expect(report.services.totalHours).toBeDefined();

      // Costs
      expect(report.costs.totalCosts).toBeDefined();
      expect(report.costs.averageCostPerClient).toBeDefined();
    });
  });
});
