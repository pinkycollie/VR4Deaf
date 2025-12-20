/**
 * Core TypeScript Types for Backend Services
 */

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  disabilities?: string[];
  accommodations?: AccommodationsProfile;
  consents?: UserConsent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AccommodationsProfile {
  visualNeeds: boolean;
  aslPreferred: boolean;
  captioningRequired: boolean;
  visualAlerts: boolean;
  customNeeds?: string[];
}

export interface UserConsent {
  type: string;
  granted: boolean;
  timestamp: Date;
}

// Pathway Types (Four Magicians)
export type PathwayType = 'job' | 'business' | 'developer' | 'creative';

export type PathwayStage = 
  | 'explore' | 'prepare' | 'search' | 'apply' | 'onboard' | 'maintain' | 'grow' | 'transition'
  | 'idea' | 'validate' | 'startup' | 'established' | 'scale' | 'exit'
  | 'beginner' | 'frontend' | 'backend' | 'fullstack' | 'platform' | 'ai' | 'owner'
  | 'spark' | 'craft' | 'audience' | 'income' | 'business' | 'pivot';

export interface PathwayProfile {
  clientId: string;
  pathwayType: PathwayType;
  pathwayStage: PathwayStage;
  goals: string[];
  accommodationsProfile: AccommodationsProfile;
  vrStatus?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  pathwayTypes: PathwayType[];
  stages: PathwayStage[];
  vrCoverage: boolean;
  accessTags: string[];
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Agency Types
export interface Agency {
  id: string;
  name: string;
  type: string;
  region: string;
  contact: ContactInfo;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
}

// IPE (Individualized Plan for Employment) Types
export interface IPE {
  id: string;
  clientId: string;
  agencyId: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'in_progress' | 'completed';
  goals: string[];
  services: string[];
  timeline: Timeline;
  approvals: Approval[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Timeline {
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
}

export interface Milestone {
  title: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Approval {
  approverId: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp?: Date;
  notes?: string;
}

// Trust and Logging Types (FibonRose)
export interface TrustEvent {
  id: string;
  entityId: string;
  entityType: 'user' | 'agency' | 'employer' | 'service';
  eventType: 'accommodation_honored' | 'accommodation_violated' | 'service_provided' | 'milestone_reached';
  accommodationsHonored: boolean;
  details: Record<string, any>;
  timestamp: Date;
}

export interface TrustScore {
  entityId: string;
  entityType: string;
  score: number;
  eventsCount: number;
  badges: string[];
  lastUpdated: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  read: boolean;
  visualAlert: boolean;
  createdAt: Date;
}

// Sync Event Types (PinkSync)
export interface SyncEvent {
  id: string;
  sourceSystem: 'deafauth' | 'agency' | 'magician' | 'external';
  targetSystems: string[];
  eventType: 'user_updated' | 'accommodations_changed' | 'pathway_updated' | 'resource_added';
  payload: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
