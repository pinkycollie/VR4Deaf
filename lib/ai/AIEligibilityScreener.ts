/**
 * AI Eligibility Screener Service
 * Automated eligibility assessment, document checklist generation, and priority determination
 */

import { AIServiceResponse, generateRequestId } from "./utils";

/** Client information for eligibility screening */
export interface ClientProfile {
  id: string;
  age: number;
  disability: string[];
  employmentStatus: "unemployed" | "underemployed" | "employed";
  education: string;
  income: number;
  veteranStatus: boolean;
  socialSecurity: boolean;
  stateResident: boolean;
  state: string;
}

/** Eligibility program */
export type EligibilityProgram =
  | "WIOA Adult"
  | "WIOA Youth"
  | "WIOA Dislocated Worker"
  | "Vocational Rehabilitation"
  | "Trade Adjustment Assistance"
  | "SNAP E&T"
  | "TANF";

/** Eligibility assessment result */
export interface EligibilityAssessment {
  eligible: boolean;
  program: EligibilityProgram;
  confidence: number; // 0-100
  reasoning: string[];
  priority: "high" | "medium" | "low";
  requiredDocuments: string[];
  optionalDocuments: string[];
  estimatedProcessingTime: number; // days
}

/** Eligibility screening result */
export interface EligibilityScreeningResult {
  clientId: string;
  assessments: EligibilityAssessment[];
  recommendedProgram: EligibilityProgram | null;
  overallPriority: "high" | "medium" | "low";
  nextSteps: string[];
}

/**
 * Screen client for eligibility across multiple programs
 */
export async function screenEligibility(
  clientProfile: ClientProfile
): Promise<AIServiceResponse<EligibilityScreeningResult>> {
  const requestId = generateRequestId("eligibility");
  const timestamp = new Date().toISOString();

  try {
    const assessments: EligibilityAssessment[] = [];

    // Check WIOA Adult eligibility
    assessments.push(assessWIOAAdult(clientProfile));

    // Check WIOA Youth eligibility
    assessments.push(assessWIOAYouth(clientProfile));

    // Check WIOA Dislocated Worker eligibility
    assessments.push(assessWIOADislocatedWorker(clientProfile));

    // Check Vocational Rehabilitation eligibility
    assessments.push(assessVocationalRehabilitation(clientProfile));

    // Check Trade Adjustment Assistance eligibility
    assessments.push(assessTradeAdjustmentAssistance(clientProfile));

    // Check SNAP E&T eligibility
    assessments.push(assessSNAPET(clientProfile));

    // Check TANF eligibility
    assessments.push(assessTANF(clientProfile));

    // Filter to only eligible programs
    const eligiblePrograms = assessments.filter((a) => a.eligible);

    // Determine recommended program (highest confidence eligible program)
    const recommendedProgram = eligiblePrograms.length > 0
      ? eligiblePrograms.reduce((prev, current) =>
          current.confidence > prev.confidence ? current : prev
        ).program
      : null;

    // Determine overall priority
    const overallPriority = determineOverallPriority(eligiblePrograms);

    // Generate next steps
    const nextSteps = generateNextSteps(eligiblePrograms, recommendedProgram);

    return {
      success: true,
      data: {
        clientId: clientProfile.id,
        assessments,
        recommendedProgram,
        overallPriority,
        nextSteps,
      },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "ELIGIBILITY_SCREENING_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/**
 * Assess WIOA Adult program eligibility
 */
function assessWIOAAdult(profile: ClientProfile): EligibilityAssessment {
  const reasoning: string[] = [];
  let eligible = true;
  let confidence = 100;

  // Age requirement: 18 or older
  if (profile.age < 18) {
    eligible = false;
    confidence = 0;
    reasoning.push("Must be 18 years or older");
  } else {
    reasoning.push("Age requirement met (18+)");
  }

  // Must be legally able to work
  if (profile.stateResident) {
    reasoning.push("State residency verified");
  } else {
    confidence -= 30;
    reasoning.push("State residency not confirmed");
  }

  const priority = profile.disability.length > 0 ? "high" : "medium";

  return {
    eligible,
    program: "WIOA Adult",
    confidence,
    reasoning,
    priority,
    requiredDocuments: [
      "Government-issued ID",
      "Social Security Card",
      "Proof of residency",
      "Selective Service registration (if applicable)",
    ],
    optionalDocuments: [
      "Employment history",
      "Educational transcripts",
      "Disability documentation",
    ],
    estimatedProcessingTime: 14,
  };
}

/**
 * Assess WIOA Youth program eligibility
 */
function assessWIOAYouth(profile: ClientProfile): EligibilityAssessment {
  const reasoning: string[] = [];
  let eligible = true;
  let confidence = 100;

  // Age requirement: 14-24
  if (profile.age < 14 || profile.age > 24) {
    eligible = false;
    confidence = 0;
    reasoning.push("Must be between 14-24 years old");
  } else {
    reasoning.push("Age requirement met (14-24)");
  }

  // Income eligibility (low-income)
  if (profile.income > 30000) {
    confidence -= 40;
    reasoning.push("Income may exceed low-income threshold");
  } else {
    reasoning.push("Income within low-income range");
  }

  return {
    eligible,
    program: "WIOA Youth",
    confidence,
    reasoning,
    priority: "high",
    requiredDocuments: [
      "Birth certificate or ID",
      "Social Security Card",
      "Proof of income (family)",
      "School enrollment status",
    ],
    optionalDocuments: [
      "IEP or 504 plan",
      "Foster care documentation",
      "Homeless verification",
    ],
    estimatedProcessingTime: 10,
  };
}

/**
 * Assess WIOA Dislocated Worker eligibility
 */
function assessWIOADislocatedWorker(profile: ClientProfile): EligibilityAssessment {
  const reasoning: string[] = [];
  let eligible = false;
  let confidence = 0;

  // Must be unemployed or received termination notice
  if (profile.employmentStatus === "unemployed") {
    eligible = true;
    confidence = 80;
    reasoning.push("Unemployed status confirmed");
  } else {
    reasoning.push("Not currently unemployed");
  }

  return {
    eligible,
    program: "WIOA Dislocated Worker",
    confidence,
    reasoning,
    priority: "medium",
    requiredDocuments: [
      "Termination notice",
      "Government-issued ID",
      "Social Security Card",
      "Proof of residency",
      "Most recent pay stubs",
    ],
    optionalDocuments: [
      "Unemployment insurance documentation",
      "WARN notice",
    ],
    estimatedProcessingTime: 14,
  };
}

/**
 * Assess Vocational Rehabilitation eligibility
 */
function assessVocationalRehabilitation(profile: ClientProfile): EligibilityAssessment {
  const reasoning: string[] = [];
  let eligible = true;
  let confidence = 100;

  // Must have a documented disability
  if (profile.disability.length === 0) {
    eligible = false;
    confidence = 0;
    reasoning.push("No documented disability on file");
  } else {
    reasoning.push(`Documented disabilities: ${profile.disability.join(", ")}`);
  }

  // Disability must be an impediment to employment
  if (profile.employmentStatus === "unemployed" || profile.employmentStatus === "underemployed") {
    reasoning.push("Employment impediment documented");
  }

  const priority = profile.socialSecurity ? "high" : "medium";

  return {
    eligible,
    program: "Vocational Rehabilitation",
    confidence,
    reasoning,
    priority,
    requiredDocuments: [
      "Government-issued ID",
      "Social Security Card",
      "Medical/disability documentation",
      "Proof of residency",
    ],
    optionalDocuments: [
      "SSI/SSDI documentation",
      "IEP or 504 plan",
      "Employment history",
      "Educational transcripts",
    ],
    estimatedProcessingTime: 21,
  };
}

/**
 * Assess Trade Adjustment Assistance eligibility
 */
function assessTradeAdjustmentAssistance(profile: ClientProfile): EligibilityAssessment {
  const reasoning: string[] = [];
  const eligible = false; // Requires specific trade-affected certification
  const confidence = 0;

  reasoning.push("Requires TAA certification from employer");
  reasoning.push("Must be separated from TAA-certified company");

  return {
    eligible,
    program: "Trade Adjustment Assistance",
    confidence,
    reasoning,
    priority: "low",
    requiredDocuments: [
      "TAA certification letter",
      "Separation notice",
      "Government-issued ID",
      "Social Security Card",
    ],
    optionalDocuments: [
      "Pay stubs",
      "Employment verification",
    ],
    estimatedProcessingTime: 30,
  };
}

/**
 * Assess SNAP E&T eligibility
 */
function assessSNAPET(profile: ClientProfile): EligibilityAssessment {
  const reasoning: string[] = [];
  let eligible = true;
  let confidence = 80;

  // Must be low-income
  if (profile.income > 20000) {
    confidence -= 40;
    reasoning.push("Income may exceed SNAP eligibility threshold");
  } else {
    reasoning.push("Income likely within SNAP eligibility");
  }

  return {
    eligible,
    program: "SNAP E&T",
    confidence,
    reasoning,
    priority: "low",
    requiredDocuments: [
      "SNAP eligibility documentation",
      "Government-issued ID",
      "Proof of income",
      "Proof of residency",
    ],
    optionalDocuments: [
      "Household composition documentation",
    ],
    estimatedProcessingTime: 14,
  };
}

/**
 * Assess TANF eligibility
 */
function assessTANF(profile: ClientProfile): EligibilityAssessment {
  const reasoning: string[] = [];
  let eligible = true;
  let confidence = 70;

  // Must be low-income with dependents (simplified check)
  if (profile.income > 15000) {
    confidence -= 40;
    reasoning.push("Income may exceed TANF threshold");
  } else {
    reasoning.push("Income within TANF eligibility range");
  }

  return {
    eligible,
    program: "TANF",
    confidence,
    reasoning,
    priority: "medium",
    requiredDocuments: [
      "Government-issued ID",
      "Social Security Cards (all family members)",
      "Birth certificates (children)",
      "Proof of income",
      "Proof of residency",
    ],
    optionalDocuments: [
      "Child support documentation",
      "School enrollment records",
    ],
    estimatedProcessingTime: 21,
  };
}

/**
 * Determine overall priority across all eligible programs
 */
function determineOverallPriority(
  eligiblePrograms: EligibilityAssessment[]
): "high" | "medium" | "low" {
  if (eligiblePrograms.length === 0) return "low";

  const highPriorityCount = eligiblePrograms.filter((p) => p.priority === "high").length;
  if (highPriorityCount > 0) return "high";

  const mediumPriorityCount = eligiblePrograms.filter((p) => p.priority === "medium").length;
  if (mediumPriorityCount > 0) return "medium";

  return "low";
}

/**
 * Generate next steps based on eligibility results
 */
function generateNextSteps(
  eligiblePrograms: EligibilityAssessment[],
  recommendedProgram: EligibilityProgram | null
): string[] {
  const steps: string[] = [];

  if (eligiblePrograms.length === 0) {
    steps.push("Schedule consultation to explore alternative programs");
    steps.push("Review documentation requirements for potential future eligibility");
    return steps;
  }

  if (recommendedProgram) {
    const recommended = eligiblePrograms.find((p) => p.program === recommendedProgram);
    if (recommended) {
      steps.push(`Apply for ${recommendedProgram} program`);
      steps.push(`Gather required documents: ${recommended.requiredDocuments.slice(0, 3).join(", ")}`);
      steps.push(`Schedule intake appointment`);
      steps.push(`Expected processing time: ${recommended.estimatedProcessingTime} days`);
    }
  }

  if (eligiblePrograms.length > 1) {
    steps.push(`Consider applying to ${eligiblePrograms.length} eligible programs`);
  }

  return steps;
}
