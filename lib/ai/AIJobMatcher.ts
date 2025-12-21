/**
 * AI Job Matcher Service
 * Enhanced job matching with accessibility requirements, Deaf-friendly workplaces, 
 * and LGBTQ+ inclusive employers (0-100 match scoring)
 */

import { AIServiceResponse, generateRequestId } from "./utils";

/** Job matching request */
export interface JobMatchingRequest {
  clientId: string;
  skills: string[];
  experience: number; // years
  education: string;
  accessibilityNeeds: string[];
  preferences: {
    deafFriendly?: boolean;
    lgbtqInclusive?: boolean;
    remoteWork?: boolean;
    flexibleHours?: boolean;
    locations?: string[];
    salaryRange?: { min: number; max: number };
  };
}

/** Job information */
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: string[];
  salaryRange: { min: number; max: number };
  accessibility: {
    aslInterpreter: boolean;
    visualAlerts: boolean;
    captioning: boolean;
    accessibleWorkspace: boolean;
    remoteOptions: boolean;
    flexibleSchedule: boolean;
  };
  certifications: {
    deafFriendly: boolean;
    lgbtqInclusive: boolean;
  };
}

/** Job match result */
export interface JobMatchResult {
  job: Job;
  matchScore: number; // 0-100
  breakdown: {
    skillsScore: number;
    accessibilityScore: number;
    certificationScore: number;
    preferencesScore: number;
  };
  reasoning: string[];
}

/**
 * Find matching jobs based on client profile with enhanced scoring
 */
export async function findMatchingJobs(
  clientProfile: JobMatchingRequest,
  availableJobs: Job[],
  minScore: number = 80
): Promise<AIServiceResponse<{ matches: JobMatchResult[] }>> {
  const requestId = generateRequestId("job-match");
  const timestamp = new Date().toISOString();

  try {
    const matches: JobMatchResult[] = [];

    for (const job of availableJobs) {
      const matchResult = calculateJobMatch(clientProfile, job);
      
      if (matchResult.matchScore >= minScore) {
        matches.push(matchResult);
      }
    }

    // Sort by match score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);

    return {
      success: true,
      data: { matches },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "JOB_MATCHING_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/**
 * Calculate job match score with detailed breakdown
 */
function calculateJobMatch(
  profile: JobMatchingRequest,
  job: Job
): JobMatchResult {
  const reasoning: string[] = [];

  // 1. Skills matching (40% weight)
  const skillsScore = calculateSkillsScore(profile.skills, job.requiredSkills, reasoning);

  // 2. Accessibility matching (30% weight)
  const accessibilityScore = calculateAccessibilityScore(
    profile.accessibilityNeeds,
    job.accessibility,
    reasoning
  );

  // 3. Certification matching (20% weight)
  const certificationScore = calculateCertificationScore(
    profile.preferences,
    job.certifications,
    reasoning
  );

  // 4. Preferences matching (10% weight)
  const preferencesScore = calculatePreferencesScore(
    profile.preferences,
    job,
    reasoning
  );

  // Calculate weighted total score
  const matchScore = Math.round(
    skillsScore * 0.4 +
    accessibilityScore * 0.3 +
    certificationScore * 0.2 +
    preferencesScore * 0.1
  );

  return {
    job,
    matchScore,
    breakdown: {
      skillsScore,
      accessibilityScore,
      certificationScore,
      preferencesScore,
    },
    reasoning,
  };
}

/**
 * Calculate skills match score
 */
function calculateSkillsScore(
  clientSkills: string[],
  requiredSkills: string[],
  reasoning: string[]
): number {
  if (requiredSkills.length === 0) {
    reasoning.push("No specific skills required");
    return 100;
  }

  const normalizedClientSkills = clientSkills.map((s) => s.toLowerCase());
  const normalizedRequiredSkills = requiredSkills.map((s) => s.toLowerCase());

  const matchedSkills = normalizedRequiredSkills.filter((skill) =>
    normalizedClientSkills.some((cs) => cs.includes(skill) || skill.includes(cs))
  );

  const score = Math.round((matchedSkills.length / normalizedRequiredSkills.length) * 100);
  
  reasoning.push(
    `Skills match: ${matchedSkills.length}/${normalizedRequiredSkills.length} (${score}%)`
  );

  return score;
}

/**
 * Calculate accessibility match score
 */
function calculateAccessibilityScore(
  accessibilityNeeds: string[],
  jobAccessibility: Job["accessibility"],
  reasoning: string[]
): number {
  if (accessibilityNeeds.length === 0) {
    reasoning.push("No specific accessibility needs");
    return 100;
  }

  const accessibilityMap: Record<string, keyof Job["accessibility"]> = {
    "asl interpreter": "aslInterpreter",
    "visual alerts": "visualAlerts",
    "captioning": "captioning",
    "accessible workspace": "accessibleWorkspace",
    "remote work": "remoteOptions",
    "flexible hours": "flexibleSchedule",
  };

  let matchedNeeds = 0;
  const normalizedNeeds = accessibilityNeeds.map((n) => n.toLowerCase());

  for (const need of normalizedNeeds) {
    const matchingKey = Object.keys(accessibilityMap).find((key) =>
      need.includes(key) || key.includes(need)
    );

    if (matchingKey && jobAccessibility[accessibilityMap[matchingKey]]) {
      matchedNeeds++;
    }
  }

  const score = Math.round((matchedNeeds / accessibilityNeeds.length) * 100);
  
  reasoning.push(
    `Accessibility match: ${matchedNeeds}/${accessibilityNeeds.length} needs met (${score}%)`
  );

  return score;
}

/**
 * Calculate certification match score (Deaf-friendly, LGBTQ+ inclusive)
 */
function calculateCertificationScore(
  preferences: JobMatchingRequest["preferences"],
  certifications: Job["certifications"],
  reasoning: string[]
): number {
  let score = 100;
  const certDetails: string[] = [];

  if (preferences.deafFriendly && !certifications.deafFriendly) {
    score -= 50;
    certDetails.push("Not Deaf-friendly certified");
  } else if (preferences.deafFriendly && certifications.deafFriendly) {
    certDetails.push("Deaf-friendly certified ✓");
  }

  if (preferences.lgbtqInclusive && !certifications.lgbtqInclusive) {
    score -= 50;
    certDetails.push("Not LGBTQ+ inclusive certified");
  } else if (preferences.lgbtqInclusive && certifications.lgbtqInclusive) {
    certDetails.push("LGBTQ+ inclusive certified ✓");
  }

  if (certDetails.length > 0) {
    reasoning.push(`Certifications: ${certDetails.join(", ")} (${score}%)`);
  }

  return Math.max(0, score);
}

/**
 * Calculate preferences match score
 */
function calculatePreferencesScore(
  preferences: JobMatchingRequest["preferences"],
  job: Job,
  reasoning: string[]
): number {
  let score = 100;
  const prefDetails: string[] = [];

  // Check location preference
  if (preferences.locations && preferences.locations.length > 0) {
    const locationMatch = preferences.locations.some((loc) =>
      job.location.toLowerCase().includes(loc.toLowerCase())
    );
    if (!locationMatch && !job.accessibility.remoteOptions) {
      score -= 30;
      prefDetails.push("Location mismatch");
    } else if (locationMatch) {
      prefDetails.push("Location match ✓");
    }
  }

  // Check salary range
  if (preferences.salaryRange) {
    if (job.salaryRange.max < preferences.salaryRange.min) {
      score -= 40;
      prefDetails.push("Salary below minimum");
    } else if (job.salaryRange.min >= preferences.salaryRange.min) {
      prefDetails.push("Salary meets expectations ✓");
    }
  }

  // Check remote work preference
  if (preferences.remoteWork && job.accessibility.remoteOptions) {
    prefDetails.push("Remote work available ✓");
  }

  // Check flexible hours preference
  if (preferences.flexibleHours && job.accessibility.flexibleSchedule) {
    prefDetails.push("Flexible schedule available ✓");
  }

  if (prefDetails.length > 0) {
    reasoning.push(`Preferences: ${prefDetails.join(", ")} (${score}%)`);
  }

  return Math.max(0, score);
}
