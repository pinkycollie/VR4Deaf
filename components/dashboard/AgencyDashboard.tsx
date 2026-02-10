"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AgencySelector } from "./AgencySelector";
import { DashboardMetricsComponent } from "./DashboardMetrics";
import { CaseList } from "./CaseList";
import {
  Agency,
  UserRole,
  DashboardMetrics,
  RSACompliance,
  Case,
  ActivityItem,
} from "@/lib/types/dashboard";
import { format } from "date-fns";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Bell,
  Calendar,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

interface AgencyDashboardProps {
  userRole: UserRole;
  userName: string;
  agencyName: string;
  agencies?: Agency[];
  selectedAgency?: Agency | null;
  onAgencyChange?: (agency: Agency) => void;
  metrics?: DashboardMetrics;
  rsaCompliance?: RSACompliance;
  cases?: Case[];
  activities?: ActivityItem[];
}

const activityIcons = {
  case_update: FileText,
  appointment: Calendar,
  placement: Briefcase,
  document: FileText,
  note: FileText,
};

// Mock data for demo
const mockAgencies: Agency[] = [
  {
    id: "agency-001",
    name: "VR Services Inc.",
    type: "VR",
    location: "Houston, TX",
    activeClients: 45,
  },
  {
    id: "agency-002",
    name: "Pride Employment Center",
    type: "LGBTQ+",
    location: "Austin, TX",
    activeClients: 32,
  },
  {
    id: "agency-003",
    name: "Deaf Career Solutions",
    type: "Deaf",
    location: "Dallas, TX",
    activeClients: 28,
  },
  {
    id: "agency-004",
    name: "Inclusive Workforce Alliance",
    type: "Multi-service",
    location: "San Antonio, TX",
    activeClients: 67,
  },
];

const mockMetrics: DashboardMetrics = {
  totalCases: 156,
  activeCases: 89,
  closedCases: 67,
  successfulPlacements: 52,
  averageTimeToPlacement: 87,
  caseTrends: [
    { month: "Jan", cases: 12, placements: 8 },
    { month: "Feb", cases: 15, placements: 10 },
    { month: "Mar", cases: 18, placements: 12 },
    { month: "Apr", cases: 14, placements: 9 },
    { month: "May", cases: 20, placements: 15 },
    { month: "Jun", cases: 17, placements: 13 },
  ],
  outcomeDistribution: [
    { outcome: "Employed", count: 52, percentage: 78 },
    { outcome: "Education", count: 8, percentage: 12 },
    { outcome: "Self-Employed", count: 5, percentage: 7 },
    { outcome: "Other", count: 2, percentage: 3 },
  ],
  serviceUtilization: [
    { service: "Assessment", hours: 245, clients: 45 },
    { service: "Training", hours: 180, clients: 38 },
    { service: "Counseling", hours: 320, clients: 67 },
    { service: "Placement", hours: 156, clients: 29 },
  ],
};

const mockRSACompliance: RSACompliance = {
  status: "compliant",
  lastReportDate: "2024-12-01",
  nextDueDate: "2025-03-31",
  missingFields: [],
};

const mockCases: Case[] = [
  {
    id: "CASE-001",
    clientName: "John Smith",
    counselorName: "Jane Doe",
    status: "services",
    priority: "high",
    lastUpdated: "2024-12-20",
    nextAppointment: "2024-12-23",
    accessibilityNeeds: ["ASL Interpreter", "Visual Alerts"],
  },
  {
    id: "CASE-002",
    clientName: "Maria Garcia",
    counselorName: "Jane Doe",
    status: "assessment",
    priority: "medium",
    lastUpdated: "2024-12-19",
    accessibilityNeeds: ["Captioning"],
  },
  {
    id: "CASE-003",
    clientName: "Alex Johnson",
    counselorName: "Mike Wilson",
    status: "placement",
    priority: "high",
    lastUpdated: "2024-12-21",
    nextAppointment: "2024-12-24",
    accessibilityNeeds: ["Flexible Hours", "Remote Options"],
  },
];

const mockActivities: ActivityItem[] = [
  {
    id: "act-001",
    type: "case_update",
    title: "Case Updated",
    description: "CASE-001 status changed to services",
    timestamp: "2024-12-21T10:30:00Z",
    userId: "user-001",
    userName: "Jane Doe",
  },
  {
    id: "act-002",
    type: "appointment",
    title: "Appointment Scheduled",
    description: "Skills assessment for John Smith",
    timestamp: "2024-12-21T09:15:00Z",
    userId: "user-001",
    userName: "Jane Doe",
  },
  {
    id: "act-003",
    type: "placement",
    title: "Successful Placement",
    description: "Client placed at Tech Solutions Inc.",
    timestamp: "2024-12-20T16:45:00Z",
    userId: "user-002",
    userName: "Mike Wilson",
  },
];

export function AgencyDashboard({
  userRole,
  userName,
  agencyName,
  agencies = mockAgencies,
  selectedAgency = mockAgencies[0],
  onAgencyChange,
  metrics = mockMetrics,
  rsaCompliance = mockRSACompliance,
  cases = mockCases,
  activities = mockActivities,
}: AgencyDashboardProps) {
  const [currentAgency, setCurrentAgency] = React.useState<Agency | null>(
    selectedAgency
  );

  const handleAgencyChange = (agency: Agency) => {
    setCurrentAgency(agency);
    onAgencyChange?.(agency);
  };

  const roleDisplay = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {userName}
          </h1>
          <p className="text-muted-foreground">
            {roleDisplay} Dashboard • {agencyName}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <AgencySelector
            agencies={agencies}
            selectedAgency={currentAgency}
            onSelect={handleAgencyChange}
            className="w-[300px]"
          />
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="cases" className="gap-2">
            <FileText className="h-4 w-4" />
            Cases
          </TabsTrigger>
          {(userRole === "admin" || userRole === "supervisor") && (
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          )}
          <TabsTrigger value="activity" className="gap-2">
            <Bell className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <DashboardMetricsComponent
            metrics={metrics}
            rsaCompliance={rsaCompliance}
          />
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          <CaseList cases={cases} />
        </TabsContent>

        {(userRole === "admin" || userRole === "supervisor") && (
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>RSA-911 Reports</CardTitle>
                <CardDescription>
                  Generate and download compliance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Report generation interface would be implemented here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and actions in your agency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = activityIcons[activity.type];
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-lg border"
                      >
                        <div className="mt-1">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">
                              {activity.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {format(
                                new Date(activity.timestamp),
                                "MMM d, h:mm a"
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            by {activity.userName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
