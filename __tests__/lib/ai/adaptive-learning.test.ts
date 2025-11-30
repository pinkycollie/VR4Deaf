import { describe, it, expect } from "vitest";
import {
  adaptiveLearningConfig,
  getLearningRecommendations,
  updateLearningPreferences,
  getAvailableLearningModes,
  getSupportedAccessibilityPreferences,
} from "@/lib/ai/adaptive-learning";

describe("Adaptive Learning System", () => {
  describe("adaptiveLearningConfig", () => {
    it("should have correct service configuration", () => {
      expect(adaptiveLearningConfig.id).toBe("adaptive-learning-v1");
      expect(adaptiveLearningConfig.name).toBe("Adaptive Learning System");
      expect(adaptiveLearningConfig.version).toBe("1.0.0");
      expect(adaptiveLearningConfig.enabled).toBe(true);
    });

    it("should have all required learning modes", () => {
      expect(adaptiveLearningConfig.learningModes).toContain("self-paced");
      expect(adaptiveLearningConfig.learningModes).toContain("instructor-led");
      expect(adaptiveLearningConfig.learningModes).toContain("hybrid");
      expect(adaptiveLearningConfig.learningModes).toContain("accessibility-focused");
    });

    it("should have adaptation settings configured", () => {
      expect(adaptiveLearningConfig.adaptationSettings.enableRealTimeAdaptation).toBe(true);
      expect(adaptiveLearningConfig.adaptationSettings.assessmentFrequency).toBe("after-each-module");
    });
  });

  describe("getLearningRecommendations", () => {
    it("should return learning recommendations", async () => {
      const result = await getLearningRecommendations({
        clientId: "test-client-001",
        currentProgress: {
          completedModules: [],
          assessmentScores: {},
          timeSpent: 0,
        },
        preferences: {
          preferredMode: "self-paced",
          accessibilityNeeds: [],
          pacePreference: "moderate",
        },
      });

      expect(result.success).toBe(true);
      expect(result.data?.recommendations).toBeInstanceOf(Array);
      expect(result.data?.recommendations.length).toBeLessThanOrEqual(3);
      expect(result.data?.nextMilestone).toBeDefined();
      expect(result.data?.estimatedCompletionDate).toBeDefined();
    });

    it("should exclude completed modules from recommendations", async () => {
      const result = await getLearningRecommendations({
        clientId: "test-client-002",
        currentProgress: {
          completedModules: ["mod-001", "mod-002"],
          assessmentScores: { "mod-001": 85, "mod-002": 90 },
          timeSpent: 300,
        },
        preferences: {
          preferredMode: "hybrid",
          accessibilityNeeds: ["captioning"],
          pacePreference: "fast",
        },
      });

      expect(result.success).toBe(true);
      const moduleIds = result.data?.recommendations.map((r) => r.moduleId) || [];
      expect(moduleIds).not.toContain("mod-001");
      expect(moduleIds).not.toContain("mod-002");
    });

    it("should adjust duration based on pace preference", async () => {
      const slowResult = await getLearningRecommendations({
        clientId: "test-client-003",
        currentProgress: {
          completedModules: [],
          assessmentScores: {},
          timeSpent: 0,
        },
        preferences: {
          preferredMode: "self-paced",
          accessibilityNeeds: [],
          pacePreference: "slow",
        },
      });

      const fastResult = await getLearningRecommendations({
        clientId: "test-client-003",
        currentProgress: {
          completedModules: [],
          assessmentScores: {},
          timeSpent: 0,
        },
        preferences: {
          preferredMode: "self-paced",
          accessibilityNeeds: [],
          pacePreference: "fast",
        },
      });

      expect(slowResult.success).toBe(true);
      expect(fastResult.success).toBe(true);

      // Slow pace should have longer durations
      const slowDurations = slowResult.data?.recommendations.map((r) => r.estimatedDuration) || [];
      const fastDurations = fastResult.data?.recommendations.map((r) => r.estimatedDuration) || [];

      if (slowDurations.length > 0 && fastDurations.length > 0) {
        expect(slowDurations[0]).toBeGreaterThan(fastDurations[0]);
      }
    });
  });

  describe("updateLearningPreferences", () => {
    it("should successfully update preferences", async () => {
      const result = await updateLearningPreferences("test-client-001", {
        preferredMode: "instructor-led",
        pacePreference: "slow",
      });

      expect(result.success).toBe(true);
      expect(result.data?.updated).toBe(true);
    });
  });

  describe("getAvailableLearningModes", () => {
    it("should return all learning modes", () => {
      const modes = getAvailableLearningModes();

      expect(modes).toHaveLength(4);
      expect(modes).toContain("self-paced");
      expect(modes).toContain("instructor-led");
      expect(modes).toContain("hybrid");
      expect(modes).toContain("accessibility-focused");
    });
  });

  describe("getSupportedAccessibilityPreferences", () => {
    it("should return all accessibility preferences", () => {
      const preferences = getSupportedAccessibilityPreferences();

      expect(preferences).toHaveLength(5);
      expect(preferences).toContain("visual-aids");
      expect(preferences).toContain("sign-language");
      expect(preferences).toContain("captioning");
      expect(preferences).toContain("audio-description");
      expect(preferences).toContain("haptic-feedback");
    });
  });
});
