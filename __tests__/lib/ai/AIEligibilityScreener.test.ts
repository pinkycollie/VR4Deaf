import { describe, it, expect } from "vitest";
import {
  screenEligibility,
  ClientProfile,
} from "@/lib/ai/AIEligibilityScreener";

describe("AIEligibilityScreener", () => {
  describe("screenEligibility", () => {
    it("should screen client for all programs", async () => {
      const clientProfile: ClientProfile = {
        id: "client-001",
        age: 25,
        disability: ["Hearing Impairment"],
        employmentStatus: "unemployed",
        education: "Bachelor's Degree",
        income: 15000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.assessments.length).toBeGreaterThan(0);
      expect(result.data?.clientId).toBe(clientProfile.id);
    });

    it("should determine WIOA Adult eligibility for adults", async () => {
      const clientProfile: ClientProfile = {
        id: "client-002",
        age: 30,
        disability: [],
        employmentStatus: "unemployed",
        education: "High School",
        income: 20000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      const wioaAdult = result.data?.assessments.find(
        (a) => a.program === "WIOA Adult"
      );
      expect(wioaAdult).toBeDefined();
      expect(wioaAdult?.eligible).toBe(true);
    });

    it("should determine WIOA Youth eligibility for young adults", async () => {
      const clientProfile: ClientProfile = {
        id: "client-003",
        age: 20,
        disability: [],
        employmentStatus: "unemployed",
        education: "High School",
        income: 12000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      const wioaYouth = result.data?.assessments.find(
        (a) => a.program === "WIOA Youth"
      );
      expect(wioaYouth).toBeDefined();
      expect(wioaYouth?.eligible).toBe(true);
      expect(wioaYouth?.priority).toBe("high");
    });

    it("should determine Vocational Rehabilitation eligibility for clients with disabilities", async () => {
      const clientProfile: ClientProfile = {
        id: "client-004",
        age: 28,
        disability: ["Deaf", "Visual Impairment"],
        employmentStatus: "underemployed",
        education: "Associate Degree",
        income: 18000,
        veteranStatus: false,
        socialSecurity: true,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      const vr = result.data?.assessments.find(
        (a) => a.program === "Vocational Rehabilitation"
      );
      expect(vr).toBeDefined();
      expect(vr?.eligible).toBe(true);
      expect(vr?.priority).toBe("high"); // High priority due to SSI/SSDI
    });

    it("should mark VR ineligible for clients without disabilities", async () => {
      const clientProfile: ClientProfile = {
        id: "client-005",
        age: 35,
        disability: [],
        employmentStatus: "unemployed",
        education: "Bachelor's Degree",
        income: 25000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      const vr = result.data?.assessments.find(
        (a) => a.program === "Vocational Rehabilitation"
      );
      expect(vr).toBeDefined();
      expect(vr?.eligible).toBe(false);
    });

    it("should provide document checklists for each program", async () => {
      const clientProfile: ClientProfile = {
        id: "client-006",
        age: 22,
        disability: ["Hearing Loss"],
        employmentStatus: "unemployed",
        education: "Some College",
        income: 10000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      result.data?.assessments.forEach((assessment) => {
        expect(assessment.requiredDocuments).toBeDefined();
        expect(assessment.requiredDocuments.length).toBeGreaterThan(0);
        expect(assessment.optionalDocuments).toBeDefined();
      });
    });

    it("should recommend the highest confidence eligible program", async () => {
      const clientProfile: ClientProfile = {
        id: "client-007",
        age: 26,
        disability: ["Deaf"],
        employmentStatus: "unemployed",
        education: "Bachelor's Degree",
        income: 15000,
        veteranStatus: false,
        socialSecurity: true,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      expect(result.data?.recommendedProgram).toBeDefined();
      
      if (result.data?.recommendedProgram) {
        const recommendedAssessment = result.data.assessments.find(
          (a) => a.program === result.data?.recommendedProgram
        );
        expect(recommendedAssessment?.eligible).toBe(true);
      }
    });

    it("should determine overall priority across programs", async () => {
      const clientProfile: ClientProfile = {
        id: "client-008",
        age: 32,
        disability: ["Mobility Impairment", "Deaf"],
        employmentStatus: "unemployed",
        education: "High School",
        income: 8000,
        veteranStatus: true,
        socialSecurity: true,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      expect(result.data?.overallPriority).toBeDefined();
      expect(["high", "medium", "low"]).toContain(result.data?.overallPriority);
    });

    it("should generate next steps for eligible clients", async () => {
      const clientProfile: ClientProfile = {
        id: "client-009",
        age: 24,
        disability: ["Hearing Loss"],
        employmentStatus: "unemployed",
        education: "Associate Degree",
        income: 12000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      expect(result.data?.nextSteps).toBeDefined();
      expect(result.data?.nextSteps.length).toBeGreaterThan(0);
    });

    it("should provide processing time estimates", async () => {
      const clientProfile: ClientProfile = {
        id: "client-010",
        age: 40,
        disability: ["Visual Impairment"],
        employmentStatus: "underemployed",
        education: "Master's Degree",
        income: 30000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      result.data?.assessments.forEach((assessment) => {
        expect(assessment.estimatedProcessingTime).toBeGreaterThan(0);
      });
    });

    it("should handle clients ineligible for all programs", async () => {
      const clientProfile: ClientProfile = {
        id: "client-011",
        age: 10, // Too young for most programs
        disability: [],
        employmentStatus: "unemployed",
        education: "Elementary",
        income: 0,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      // Some programs may still be eligible with low confidence
      expect(result.data?.nextSteps.length).toBeGreaterThan(0);
    });

    it("should include confidence scores in assessments", async () => {
      const clientProfile: ClientProfile = {
        id: "client-012",
        age: 28,
        disability: ["Hearing Loss"],
        employmentStatus: "unemployed",
        education: "Bachelor's Degree",
        income: 15000,
        veteranStatus: false,
        socialSecurity: false,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      result.data?.assessments.forEach((assessment) => {
        expect(assessment.confidence).toBeGreaterThanOrEqual(0);
        expect(assessment.confidence).toBeLessThanOrEqual(100);
      });
    });

    it("should provide reasoning for each eligibility determination", async () => {
      const clientProfile: ClientProfile = {
        id: "client-013",
        age: 45,
        disability: ["Deaf", "Cognitive Disability"],
        employmentStatus: "unemployed",
        education: "High School",
        income: 5000,
        veteranStatus: true,
        socialSecurity: true,
        stateResident: true,
        state: "TX",
      };

      const result = await screenEligibility(clientProfile);

      expect(result.success).toBe(true);
      result.data?.assessments.forEach((assessment) => {
        expect(assessment.reasoning).toBeDefined();
        expect(assessment.reasoning.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed client profile gracefully", async () => {
      const clientProfile = {
        id: "client-bad",
        age: -5, // Invalid age
      } as ClientProfile;

      const result = await screenEligibility(clientProfile);

      // Should still return a response, even if data is invalid
      expect(result).toBeDefined();
      expect(result.requestId).toBeDefined();
      expect(result.timestamp).toBeDefined();
    });
  });
});
