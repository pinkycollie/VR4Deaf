/**
 * AI Agent Configuration Types for VR Business Services
 * These types define the structure for AI-powered services in the VR4Deaf platform.
 */

/** Base configuration for all AI agents */
export interface AIAgentConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

/** VR Business AI Service - Core AI for business operations */
export interface VRBusinessAIConfig extends AIAgentConfig {
  capabilities: VRBusinessCapability[];
  settings: VRBusinessSettings;
}

export type VRBusinessCapability =
  | "job-matching"
  | "skills-assessment"
  | "career-planning"
  | "accommodation-recommendations"
  | "employer-matching";

export interface VRBusinessSettings {
  maxConcurrentRequests: number;
  responseTimeoutMs: number;
  confidenceThreshold: number;
}

/** Reporting Service - Analytics and report generation */
export interface ReportingConfig extends AIAgentConfig {
  reportTypes: ReportType[];
  scheduleSettings: ScheduleSettings;
}

export type ReportType =
  | "client-progress"
  | "placement-outcomes"
  | "training-effectiveness"
  | "employer-engagement"
  | "program-analytics";

export interface ScheduleSettings {
  enableScheduledReports: boolean;
  defaultFrequency: "daily" | "weekly" | "monthly" | "quarterly";
  timezone: string;
}

/** Adaptive Learning System - Personalized learning recommendations */
export interface AdaptiveLearningConfig extends AIAgentConfig {
  learningModes: LearningMode[];
  adaptationSettings: AdaptationSettings;
}

export type LearningMode =
  | "self-paced"
  | "instructor-led"
  | "hybrid"
  | "accessibility-focused";

export interface AdaptationSettings {
  enableRealTimeAdaptation: boolean;
  assessmentFrequency: "after-each-module" | "weekly" | "milestone-based";
  accessibilityPreferences: AccessibilityPreference[];
}

export type AccessibilityPreference =
  | "visual-aids"
  | "sign-language"
  | "captioning"
  | "audio-description"
  | "haptic-feedback";

/** Partnership Automation - Employer partnership management */
export interface PartnershipAutomationConfig extends AIAgentConfig {
  automationFeatures: AutomationFeature[];
  integrationSettings: IntegrationSettings;
}

export type AutomationFeature =
  | "lead-scoring"
  | "outreach-automation"
  | "follow-up-scheduling"
  | "document-generation"
  | "compliance-tracking";

export interface IntegrationSettings {
  enableCRMSync: boolean;
  enableEmailAutomation: boolean;
  enableCalendarSync: boolean;
  webhookUrl?: string;
}

/** API Request/Response Types */
export interface AIServiceRequest<T = unknown> {
  action: string;
  payload: T;
  requestId: string;
  timestamp: string;
}

export interface AIServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: AIServiceError;
  requestId: string;
  timestamp: string;
}

export interface AIServiceError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/** VR Business AI specific request/response types */
export interface JobMatchRequest {
  clientId: string;
  skills: string[];
  preferences: JobPreferences;
}

export interface JobPreferences {
  jobTypes: string[];
  locations: string[];
  salaryRange?: { min: number; max: number };
  accommodations: string[];
}

export interface JobMatchResponse {
  matches: JobMatch[];
  confidence: number;
}

export interface JobMatch {
  jobId: string;
  title: string;
  employer: string;
  matchScore: number;
  accommodationSupport: string[];
}

/** Reporting specific request/response types */
export interface ReportRequest {
  reportType: ReportType;
  dateRange: { start: string; end: string };
  filters?: Record<string, unknown>;
}

export interface ReportResponse {
  reportId: string;
  generatedAt: string;
  data: Record<string, unknown>;
  format: "json" | "csv" | "pdf";
}

/** Adaptive Learning specific request/response types */
export interface LearningRecommendationRequest {
  clientId: string;
  currentProgress: ProgressData;
  preferences: LearningPreferences;
}

export interface ProgressData {
  completedModules: string[];
  assessmentScores: Record<string, number>;
  timeSpent: number;
}

export interface LearningPreferences {
  preferredMode: LearningMode;
  accessibilityNeeds: AccessibilityPreference[];
  pacePreference: "slow" | "moderate" | "fast";
}

export interface LearningRecommendationResponse {
  recommendations: LearningRecommendation[];
  nextMilestone: string;
  estimatedCompletionDate: string;
}

export interface LearningRecommendation {
  moduleId: string;
  title: string;
  priority: "high" | "medium" | "low";
  reason: string;
  estimatedDuration: number;
}

/** Partnership Automation specific request/response types */
export interface PartnershipActionRequest {
  action: AutomationFeature;
  partnerId?: string;
  data: Record<string, unknown>;
}

export interface PartnershipActionResponse {
  actionId: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  result?: Record<string, unknown>;
}
