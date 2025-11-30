import { describe, it, expect } from "vitest";
import {
  partnershipAutomationConfig,
  executeAction,
  scorePartnerLead,
  scheduleFollowUp,
  generatePartnershipDocument,
  getAvailableFeatures,
} from "@/lib/ai/partnership-automation";

describe("Partnership Automation Service", () => {
  describe("partnershipAutomationConfig", () => {
    it("should have correct service configuration", () => {
      expect(partnershipAutomationConfig.id).toBe("partnership-automation-v1");
      expect(partnershipAutomationConfig.name).toBe("Partnership Automation");
      expect(partnershipAutomationConfig.version).toBe("1.0.0");
      expect(partnershipAutomationConfig.enabled).toBe(true);
    });

    it("should have all required automation features", () => {
      expect(partnershipAutomationConfig.automationFeatures).toContain("lead-scoring");
      expect(partnershipAutomationConfig.automationFeatures).toContain("outreach-automation");
      expect(partnershipAutomationConfig.automationFeatures).toContain("follow-up-scheduling");
      expect(partnershipAutomationConfig.automationFeatures).toContain("document-generation");
      expect(partnershipAutomationConfig.automationFeatures).toContain("compliance-tracking");
    });

    it("should have integration settings", () => {
      expect(partnershipAutomationConfig.integrationSettings.enableCRMSync).toBe(true);
      expect(partnershipAutomationConfig.integrationSettings.enableEmailAutomation).toBe(true);
      expect(partnershipAutomationConfig.integrationSettings.enableCalendarSync).toBe(true);
    });
  });

  describe("executeAction", () => {
    it("should execute lead-scoring action", async () => {
      const result = await executeAction({
        action: "lead-scoring",
        partnerId: "partner-001",
        data: {},
      });

      expect(result.success).toBe(true);
      expect(result.data?.actionId).toBeDefined();
      expect(result.data?.status).toBe("completed");
    });

    it("should execute outreach-automation action", async () => {
      const result = await executeAction({
        action: "outreach-automation",
        partnerId: "partner-002",
        data: { template: "welcome" },
      });

      expect(result.success).toBe(true);
      expect(result.data?.status).toBe("in-progress");
    });

    it("should execute compliance-tracking action", async () => {
      const result = await executeAction({
        action: "compliance-tracking",
        partnerId: "partner-003",
        data: {},
      });

      expect(result.success).toBe(true);
      expect(result.data?.result?.complianceStatus).toBe("up-to-date");
    });
  });

  describe("scorePartnerLead", () => {
    it("should score a high-value lead as Premium", async () => {
      const result = await scorePartnerLead({
        companyName: "Tech Corp",
        industry: "technology",
        size: "large",
        previousHiring: true,
        accessibilityCommitment: true,
      });

      expect(result.success).toBe(true);
      expect(result.data?.tier).toBe("Premium");
      expect(result.data?.score).toBeGreaterThanOrEqual(80);
    });

    it("should score a standard lead", async () => {
      const result = await scorePartnerLead({
        companyName: "Small Business",
        industry: "retail",
        size: "small",
        previousHiring: true,
        accessibilityCommitment: false,
      });

      expect(result.success).toBe(true);
      expect(result.data?.score).toBeGreaterThanOrEqual(50);
      expect(result.data?.reasons).toBeInstanceOf(Array);
    });

    it("should include reasons for scoring", async () => {
      const result = await scorePartnerLead({
        companyName: "Inclusive Inc",
        industry: "healthcare",
        size: "medium",
        previousHiring: false,
        accessibilityCommitment: true,
      });

      expect(result.success).toBe(true);
      expect(result.data?.reasons).toContain("Demonstrated commitment to accessibility");
    });
  });

  describe("scheduleFollowUp", () => {
    it("should schedule a follow-up", async () => {
      const result = await scheduleFollowUp(
        "partner-001",
        "monthly",
        "2025-12-15"
      );

      expect(result.success).toBe(true);
      expect(result.data?.scheduleId).toBeDefined();
      expect(result.data?.scheduledFor).toBe("2025-12-15");
    });

    it("should accept different follow-up types", async () => {
      const types = ["initial", "monthly", "quarterly", "annual"] as const;

      for (const type of types) {
        const result = await scheduleFollowUp("partner-002", type, "2025-12-20");
        expect(result.success).toBe(true);
      }
    });
  });

  describe("generatePartnershipDocument", () => {
    it("should generate a partnership document", async () => {
      const result = await generatePartnershipDocument("partner-001", "agreement");

      expect(result.success).toBe(true);
      expect(result.data?.documentId).toBeDefined();
      expect(result.data?.status).toBe("generated");
    });

    it("should support different document types", async () => {
      const types = ["agreement", "proposal", "report", "invoice"] as const;

      for (const type of types) {
        const result = await generatePartnershipDocument("partner-003", type);
        expect(result.success).toBe(true);
        expect(result.data?.documentId).toMatch(/^doc-\d+-[a-z0-9]+$/);
      }
    });
  });

  describe("getAvailableFeatures", () => {
    it("should return all automation features", () => {
      const features = getAvailableFeatures();

      expect(features).toHaveLength(5);
      expect(features).toContain("lead-scoring");
      expect(features).toContain("outreach-automation");
      expect(features).toContain("follow-up-scheduling");
      expect(features).toContain("document-generation");
      expect(features).toContain("compliance-tracking");
    });
  });
});
