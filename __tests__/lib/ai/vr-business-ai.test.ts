import { describe, it, expect } from "vitest";
import {
  vrBusinessAIConfig,
  matchJobs,
  assessSkills,
  getAccommodationRecommendations,
} from "@/lib/ai/vr-business-ai";

describe("VR Business AI Service", () => {
  describe("vrBusinessAIConfig", () => {
    it("should have correct service configuration", () => {
      expect(vrBusinessAIConfig.id).toBe("vr-business-ai-v1");
      expect(vrBusinessAIConfig.name).toBe("VR Business AI");
      expect(vrBusinessAIConfig.version).toBe("1.0.0");
      expect(vrBusinessAIConfig.enabled).toBe(true);
    });

    it("should have all required capabilities", () => {
      expect(vrBusinessAIConfig.capabilities).toContain("job-matching");
      expect(vrBusinessAIConfig.capabilities).toContain("skills-assessment");
      expect(vrBusinessAIConfig.capabilities).toContain("career-planning");
      expect(vrBusinessAIConfig.capabilities).toContain("accommodation-recommendations");
      expect(vrBusinessAIConfig.capabilities).toContain("employer-matching");
    });

    it("should have valid settings", () => {
      expect(vrBusinessAIConfig.settings.maxConcurrentRequests).toBeGreaterThan(0);
      expect(vrBusinessAIConfig.settings.responseTimeoutMs).toBeGreaterThan(0);
      expect(vrBusinessAIConfig.settings.confidenceThreshold).toBeLessThanOrEqual(1);
      expect(vrBusinessAIConfig.settings.confidenceThreshold).toBeGreaterThan(0);
    });
  });

  describe("matchJobs", () => {
    it("should return successful job matches", async () => {
      const result = await matchJobs({
        clientId: "test-client-001",
        skills: ["communication", "computer"],
        preferences: {
          jobTypes: ["full-time"],
          locations: ["Houston"],
          accommodations: ["flexible-hours"],
        },
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.matches).toBeInstanceOf(Array);
      expect(result.data?.confidence).toBeGreaterThan(0);
      expect(result.requestId).toBeDefined();
      expect(result.timestamp).toBeDefined();
    });

    it("should filter matches by confidence threshold", async () => {
      const result = await matchJobs({
        clientId: "test-client-002",
        skills: ["administration"],
        preferences: {
          jobTypes: ["part-time"],
          locations: ["Dallas"],
          accommodations: [],
        },
      });

      expect(result.success).toBe(true);
      if (result.data?.matches) {
        result.data.matches.forEach((match) => {
          expect(match.matchScore).toBeGreaterThanOrEqual(
            vrBusinessAIConfig.settings.confidenceThreshold
          );
        });
      }
    });
  });

  describe("assessSkills", () => {
    it("should return skill assessments", async () => {
      const skills = ["communication", "technical", "problem-solving"];
      const result = await assessSkills("test-client-001", skills);

      expect(result.success).toBe(true);
      expect(result.data?.assessedSkills).toBeDefined();

      skills.forEach((skill) => {
        expect(result.data?.assessedSkills[skill]).toBeDefined();
        expect(result.data?.assessedSkills[skill]).toBeGreaterThanOrEqual(0);
        expect(result.data?.assessedSkills[skill]).toBeLessThanOrEqual(100);
      });
    });

    it("should include requestId and timestamp", async () => {
      const result = await assessSkills("test-client-002", ["typing"]);

      expect(result.requestId).toMatch(/^vr-\d+-[a-z0-9]+$/);
      expect(new Date(result.timestamp).getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe("getAccommodationRecommendations", () => {
    it("should return accommodation recommendations for hearing needs", async () => {
      const result = await getAccommodationRecommendations("test-client-001", [
        "hearing",
      ]);

      expect(result.success).toBe(true);
      expect(result.data?.recommendations).toContain("Sign language interpreter");
      expect(result.data?.recommendations).toContain("Visual alerts");
      expect(result.data?.recommendations).toContain("Captioning services");
    });

    it("should return accommodation recommendations for visual needs", async () => {
      const result = await getAccommodationRecommendations("test-client-002", [
        "visual",
      ]);

      expect(result.success).toBe(true);
      expect(result.data?.recommendations).toContain("Screen reader compatibility");
    });

    it("should return unique recommendations for multiple needs", async () => {
      const result = await getAccommodationRecommendations("test-client-003", [
        "hearing",
        "mobility",
      ]);

      expect(result.success).toBe(true);
      const recommendations = result.data?.recommendations || [];
      const uniqueRecommendations = [...new Set(recommendations)];
      expect(recommendations.length).toBe(uniqueRecommendations.length);
    });
  });
});
