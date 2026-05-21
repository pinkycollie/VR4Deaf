"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CreateEmploymentPlanModal } from "@/components/plans/CreateEmploymentPlanModal";
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
  Bell,
  Calendar,
  Briefcase,
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

const activityIcons: Record<string, React.ComponentType<any>> = {
  case_update: FileText,
  appointment: Calendar,
  placement: Briefcase,
  document: FileText,
  note: FileText,
};

export function AgencyDashboard({
  userRole,
  userName,
  agencyName,
  agencies = [],
  selectedAgency,
  onAgencyChange,
  metrics,
  rsaCompliance,
  cases = [],
  activities = [],
}: AgencyDashboardProps) {
  
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentAgency, setCurrentAgency] = React.useState<Agency | null>(selectedAgency || null);

  const handleAgencyChange = (agency: Agency) => {
    setCurrentAgency(agency);
    onAgencyChange?.(agency);
  };

  const handlePlanCreated = (plan: any) => {
    console.log("✅ Employment Plan Created:", plan);
    // TODO: Refresh data, show toast notification, emit webhook
    setModalOpen(false);
  };

  const roleDisplay = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-muted-foreground">
            {roleDisplay} Dashboard • {currentAgency?.name || agencyName}
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white font-medium"
        >
          + Create Employment Plan
        </Button>
      </div>

      {/* Employment Plan Modal */}
      <CreateEmploymentPlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handlePlanCreated}
      />

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
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
              Reports
            </TabsTrigger>
          )}
          <TabsTrigger value="activity" className="gap-2">
            <Bell className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <DashboardMetricsComponent
            metrics={metrics}
            rsaCompliance={rsaCompliance}
          />
        </TabsContent>

        {/* Cases Tab */}
        <TabsContent value="cases" className="space-y-4">
          <CaseList cases={cases} />
        </TabsContent>

        {/* Reports Tab */}
        {(userRole === "admin" || userRole === "supervisor") && (
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>RSA-911 Compliance Reports</CardTitle>
                <CardDescription>Generate and export federal/state reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground py-8 text-center">
                  Report generation tools coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across your agency</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[620px] pr-4">
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = activityIcons[activity.type] || FileText;
                    return (
                      <div
                        key={activity.id}
                        className="flex gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="mt-0.5">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm">{activity.title}</p>
                            <time className="text-xs text-muted-foreground whitespace-nowrap">
                              {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                            </time>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
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
