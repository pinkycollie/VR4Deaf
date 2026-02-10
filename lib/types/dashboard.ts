/**
 * Dashboard Types for VR4Deaf Platform
 * Types for multi-tenant agency dashboard, case management, and metrics
 */

/** User roles in the system */
export type UserRole = "admin" | "supervisor" | "counselor" | "client";

/** Agency types supported */
export type AgencyType = "VR" | "LGBTQ+" | "Deaf" | "Multi-service";

/** Case status options */
export type CaseStatus = 
  | "intake" 
  | "assessment" 
  | "planning" 
  | "services" 
  | "placement" 
  | "closed";

/** Case priority levels */
export type CasePriority = "high" | "medium" | "low";

/** Agency information */
export interface Agency {
  id: string;
  name: string;
  type: AgencyType;
  location: string;
  activeClients: number;
}

/** Case information */
export interface Case {
  id: string;
  clientName: string;
  counselorName: string;
  status: CaseStatus;
  priority: CasePriority;
  lastUpdated: string;
  nextAppointment?: string;
  accessibilityNeeds: string[];
}

/** Dashboard metrics */
export interface DashboardMetrics {
  totalCases: number;
  activeCases: number;
  closedCases: number;
  successfulPlacements: number;
  averageTimeToPlacement: number; // in days
  caseTrends: TrendData[];
  outcomeDistribution: OutcomeData[];
  serviceUtilization: ServiceData[];
}

/** Trend data for charts */
export interface TrendData {
  month: string;
  cases: number;
  placements: number;
}

/** Outcome distribution data */
export interface OutcomeData {
  outcome: string;
  count: number;
  percentage: number;
}

/** Service utilization data */
export interface ServiceData {
  service: string;
  hours: number;
  clients: number;
}

/** Activity feed item */
export interface ActivityItem {
  id: string;
  type: "case_update" | "appointment" | "placement" | "document" | "note";
  title: string;
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
}

/** RSA-911 compliance indicator */
export interface RSACompliance {
  status: "compliant" | "warning" | "overdue";
  lastReportDate: string;
  nextDueDate: string;
  missingFields: string[];
}
