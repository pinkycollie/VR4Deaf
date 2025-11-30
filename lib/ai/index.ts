/**
 * AI Services Index
 * Central export point for all AI agent services.
 */

// Types
export * from "./types";

// Utilities
export { generateRequestId, SKILL_ASSESSMENT } from "./utils";

// VR Business AI Service
export {
  vrBusinessAIConfig,
  matchJobs,
  assessSkills,
  getAccommodationRecommendations,
} from "./vr-business-ai";

// Reporting Service
export {
  reportingConfig,
  generateReport,
  getAvailableReportTypes,
  scheduleReport,
} from "./reporting";

// Adaptive Learning System
export {
  adaptiveLearningConfig,
  getLearningRecommendations,
  updateLearningPreferences,
  getAvailableLearningModes,
  getSupportedAccessibilityPreferences,
} from "./adaptive-learning";

// Partnership Automation
export {
  partnershipAutomationConfig,
  executeAction,
  scorePartnerLead,
  scheduleFollowUp,
  generatePartnershipDocument,
  getAvailableFeatures,
} from "./partnership-automation";
