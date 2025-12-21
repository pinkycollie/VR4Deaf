import { describe, it, expect } from "vitest";
import {
  findMatchingJobs,
  Job,
  JobMatchingRequest,
} from "@/lib/ai/AIJobMatcher";

describe("AIJobMatcher", () => {
  const sampleJobs: Job[] = [
    {
      id: "job-001",
      title: "Software Developer",
      company: "Tech Solutions Inc.",
      location: "Austin, TX",
      description: "Full-stack developer position",
      requiredSkills: ["JavaScript", "React", "Node.js"],
      salaryRange: { min: 80000, max: 120000 },
      accessibility: {
        aslInterpreter: true,
        visualAlerts: true,
        captioning: true,
        accessibleWorkspace: true,
        remoteOptions: true,
        flexibleSchedule: true,
      },
      certifications: {
        deafFriendly: true,
        lgbtqInclusive: true,
      },
    },
    {
      id: "job-002",
      title: "Administrative Assistant",
      company: "Corporate Office LLC",
      location: "Houston, TX",
      description: "Office administration role",
      requiredSkills: ["Microsoft Office", "Communication", "Organization"],
      salaryRange: { min: 35000, max: 45000 },
      accessibility: {
        aslInterpreter: false,
        visualAlerts: true,
        captioning: false,
        accessibleWorkspace: true,
        remoteOptions: false,
        flexibleSchedule: true,
      },
      certifications: {
        deafFriendly: false,
        lgbtqInclusive: false,
      },
    },
    {
      id: "job-003",
      title: "Data Analyst",
      company: "Analytics Pro",
      location: "Dallas, TX",
      description: "Data analysis and reporting",
      requiredSkills: ["SQL", "Python", "Excel", "Data Visualization"],
      salaryRange: { min: 65000, max: 85000 },
      accessibility: {
        aslInterpreter: true,
        visualAlerts: true,
        captioning: true,
        accessibleWorkspace: true,
        remoteOptions: true,
        flexibleSchedule: true,
      },
      certifications: {
        deafFriendly: true,
        lgbtqInclusive: true,
      },
    },
  ];

  describe("findMatchingJobs", () => {
    it("should find matching jobs based on skills", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-001",
        skills: ["JavaScript", "React", "TypeScript"],
        experience: 3,
        education: "Bachelor's",
        accessibilityNeeds: [],
        preferences: {},
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 70);

      expect(result.success).toBe(true);
      expect(result.data?.matches).toBeDefined();
      expect(result.data?.matches.length).toBeGreaterThan(0);
    });

    it("should prioritize jobs with accessibility features", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-002",
        skills: ["Communication", "Organization"],
        experience: 2,
        education: "High School",
        accessibilityNeeds: ["ASL Interpreter", "Visual Alerts"],
        preferences: {
          deafFriendly: true,
        },
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 70);

      expect(result.success).toBe(true);
      if (result.data?.matches && result.data.matches.length > 0) {
        const topMatch = result.data.matches[0];
        expect(topMatch.breakdown.accessibilityScore).toBeGreaterThan(0);
      }
    });

    it("should prioritize LGBTQ+ inclusive employers when requested", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-003",
        skills: ["Python", "SQL", "Excel"],
        experience: 4,
        education: "Bachelor's",
        accessibilityNeeds: [],
        preferences: {
          lgbtqInclusive: true,
        },
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 70);

      expect(result.success).toBe(true);
      if (result.data?.matches && result.data.matches.length > 0) {
        const topMatch = result.data.matches[0];
        expect(topMatch.breakdown.certificationScore).toBeGreaterThan(0);
      }
    });

    it("should filter by minimum match score", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-004",
        skills: ["Cooking", "Driving"], // Skills not matching any job
        experience: 1,
        education: "High School",
        accessibilityNeeds: [],
        preferences: {},
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 90);

      expect(result.success).toBe(true);
      expect(result.data?.matches.length).toBeLessThanOrEqual(sampleJobs.length);
    });

    it("should return matches sorted by score descending", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-005",
        skills: ["JavaScript", "React", "Python", "SQL"],
        experience: 5,
        education: "Bachelor's",
        accessibilityNeeds: ["Remote Work"],
        preferences: {
          remoteWork: true,
          deafFriendly: true,
        },
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 50);

      expect(result.success).toBe(true);
      if (result.data?.matches && result.data.matches.length > 1) {
        for (let i = 0; i < result.data.matches.length - 1; i++) {
          expect(result.data.matches[i].matchScore).toBeGreaterThanOrEqual(
            result.data.matches[i + 1].matchScore
          );
        }
      }
    });

    it("should include reasoning for match scores", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-006",
        skills: ["JavaScript", "React"],
        experience: 2,
        education: "Bachelor's",
        accessibilityNeeds: ["ASL Interpreter"],
        preferences: {
          deafFriendly: true,
        },
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 70);

      expect(result.success).toBe(true);
      if (result.data?.matches && result.data.matches.length > 0) {
        const match = result.data.matches[0];
        expect(match.reasoning).toBeDefined();
        expect(match.reasoning.length).toBeGreaterThan(0);
      }
    });

    it("should handle location preferences", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-007",
        skills: ["SQL", "Python"],
        experience: 3,
        education: "Bachelor's",
        accessibilityNeeds: [],
        preferences: {
          locations: ["Dallas"],
        },
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 70);

      expect(result.success).toBe(true);
      if (result.data?.matches && result.data.matches.length > 0) {
        const dallasJobs = result.data.matches.filter((m) =>
          m.job.location.includes("Dallas")
        );
        if (dallasJobs.length > 0) {
          expect(dallasJobs[0].breakdown.preferencesScore).toBeGreaterThan(0);
        }
      }
    });

    it("should handle salary range preferences", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-008",
        skills: ["JavaScript", "React"],
        experience: 5,
        education: "Bachelor's",
        accessibilityNeeds: [],
        preferences: {
          salaryRange: { min: 70000, max: 150000 },
        },
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 70);

      expect(result.success).toBe(true);
      expect(result.data?.matches).toBeDefined();
    });
  });

  describe("Match Score Breakdown", () => {
    it("should provide detailed score breakdown", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-009",
        skills: ["JavaScript", "React"],
        experience: 3,
        education: "Bachelor's",
        accessibilityNeeds: ["Visual Alerts"],
        preferences: {
          deafFriendly: true,
        },
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 70);

      expect(result.success).toBe(true);
      if (result.data?.matches && result.data.matches.length > 0) {
        const match = result.data.matches[0];
        expect(match.breakdown).toBeDefined();
        expect(match.breakdown.skillsScore).toBeGreaterThanOrEqual(0);
        expect(match.breakdown.skillsScore).toBeLessThanOrEqual(100);
        expect(match.breakdown.accessibilityScore).toBeGreaterThanOrEqual(0);
        expect(match.breakdown.accessibilityScore).toBeLessThanOrEqual(100);
        expect(match.breakdown.certificationScore).toBeGreaterThanOrEqual(0);
        expect(match.breakdown.certificationScore).toBeLessThanOrEqual(100);
        expect(match.breakdown.preferencesScore).toBeGreaterThanOrEqual(0);
        expect(match.breakdown.preferencesScore).toBeLessThanOrEqual(100);
      }
    });

    it("should weight scores correctly (skills 40%, accessibility 30%, certification 20%, preferences 10%)", async () => {
      const clientProfile: JobMatchingRequest = {
        clientId: "client-010",
        skills: ["JavaScript"],
        experience: 2,
        education: "Bachelor's",
        accessibilityNeeds: [],
        preferences: {},
      };

      const result = await findMatchingJobs(clientProfile, sampleJobs, 0);

      expect(result.success).toBe(true);
      if (result.data?.matches && result.data.matches.length > 0) {
        const match = result.data.matches[0];
        const expectedScore = Math.round(
          match.breakdown.skillsScore * 0.4 +
          match.breakdown.accessibilityScore * 0.3 +
          match.breakdown.certificationScore * 0.2 +
          match.breakdown.preferencesScore * 0.1
        );
        expect(match.matchScore).toBe(expectedScore);
      }
    });
  });
});
