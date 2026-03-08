"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DashboardMetrics, RSACompliance } from "@/lib/types/dashboard";
import { TrendingUp, Users, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface DashboardMetricsProps {
  metrics: DashboardMetrics;
  rsaCompliance: RSACompliance;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function DashboardMetricsComponent({ metrics, rsaCompliance }: DashboardMetricsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCases}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeCases} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Placements</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.successfulPlacements}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.closedCases > 0
                ? Math.round((metrics.successfulPlacements / metrics.closedCases) * 100)
                : 0}
              % success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Placement</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageTimeToPlacement}</div>
            <p className="text-xs text-muted-foreground">days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RSA-911 Compliance</CardTitle>
            {rsaCompliance.status === "compliant" && (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
            {rsaCompliance.status === "warning" && (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
            {rsaCompliance.status === "overdue" && (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <Badge
              variant={
                rsaCompliance.status === "compliant"
                  ? "default"
                  : rsaCompliance.status === "warning"
                  ? "secondary"
                  : "destructive"
              }
            >
              {rsaCompliance.status.toUpperCase()}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Next due: {formatDate(rsaCompliance.nextDueDate)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Case Trends</TabsTrigger>
          <TabsTrigger value="outcomes">Outcome Distribution</TabsTrigger>
          <TabsTrigger value="services">Service Utilization</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Trends</CardTitle>
              <CardDescription>
                Monthly case intake and placement trends
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics.caseTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="New Cases"
                  />
                  <Line
                    type="monotone"
                    dataKey="placements"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Placements"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outcome Distribution</CardTitle>
              <CardDescription>
                Distribution of case outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metrics.outcomeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ outcome, percentage }) =>
                      `${outcome}: ${percentage}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {metrics.outcomeDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Utilization</CardTitle>
              <CardDescription>
                Hours spent on different services
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.serviceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" fill="#8884d8" name="Hours" />
                  <Bar dataKey="clients" fill="#82ca9d" name="Clients" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
