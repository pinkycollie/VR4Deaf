/**
 * AI Report Generator Service
 * RSA-911 report generation with JSON/CSV/HTML export, outcome statistics, cost analysis
 */

import { AIServiceResponse, generateRequestId } from "./utils";

/** Case data for reporting */
export interface ReportCase {
  caseId: string;
  clientId: string;
  clientAge: number;
  disability: string[];
  serviceStartDate: string;
  serviceEndDate?: string;
  status: "active" | "closed";
  outcome?: "employed" | "education" | "self-employed" | "unsuccessful" | "other";
  employmentDetails?: {
    employer: string;
    position: string;
    salary: number;
    hours: number;
    startDate: string;
  };
  servicesProvided: ServiceRecord[];
  costs: CostRecord[];
}

/** Service record */
export interface ServiceRecord {
  serviceType: string;
  serviceDate: string;
  hours: number;
  provider: string;
}

/** Cost record */
export interface CostRecord {
  category: string;
  amount: number;
  date: string;
  vendor: string;
}

/** RSA-911 Report */
export interface RSA911Report {
  reportId: string;
  reportPeriod: {
    start: string;
    end: string;
  };
  agencyName: string;
  agencyCode: string;
  generatedDate: string;
  summary: ReportSummary;
  demographics: Demographics;
  outcomes: OutcomeStatistics;
  services: ServiceStatistics;
  costs: CostAnalysis;
  cases: ReportCase[];
}

/** Report summary */
export interface ReportSummary {
  totalCases: number;
  newCases: number;
  closedCases: number;
  activeCases: number;
  successfulOutcomes: number;
  successRate: number; // percentage
}

/** Demographics data */
export interface Demographics {
  ageDistribution: Record<string, number>;
  disabilityTypes: Record<string, number>;
  genderDistribution: Record<string, number>;
  ethnicityDistribution: Record<string, number>;
}

/** Outcome statistics */
export interface OutcomeStatistics {
  totalClosures: number;
  employed: number;
  education: number;
  selfEmployed: number;
  unsuccessful: number;
  other: number;
  averageWage: number;
  averageHoursWorked: number;
}

/** Service statistics */
export interface ServiceStatistics {
  totalServices: number;
  totalHours: number;
  servicesByType: Record<string, { count: number; hours: number }>;
  topServices: Array<{ service: string; count: number }>;
}

/** Cost analysis */
export interface CostAnalysis {
  totalCosts: number;
  averageCostPerClient: number;
  costsByCategory: Record<string, number>;
  costPerSuccessfulOutcome: number;
}

/** Export format options */
export type ExportFormat = "json" | "csv" | "html";

/**
 * Generate RSA-911 report
 */
export function generateRSA911Report(
  cases: ReportCase[],
  reportPeriod: { start: string; end: string },
  agencyName: string,
  agencyCode: string = "TX-001"
): RSA911Report {
  const reportId = `RSA-911-${Date.now()}`;
  const generatedDate = new Date().toISOString();

  // Filter cases within report period
  const periodCases = cases.filter((c) => {
    const startDate = new Date(c.serviceStartDate);
    const periodStart = new Date(reportPeriod.start);
    const periodEnd = new Date(reportPeriod.end);
    return startDate >= periodStart && startDate <= periodEnd;
  });

  const summary = generateSummary(periodCases);
  const demographics = generateDemographics(periodCases);
  const outcomes = generateOutcomeStatistics(periodCases);
  const services = generateServiceStatistics(periodCases);
  const costs = generateCostAnalysis(periodCases);

  return {
    reportId,
    reportPeriod,
    agencyName,
    agencyCode,
    generatedDate,
    summary,
    demographics,
    outcomes,
    services,
    costs,
    cases: periodCases,
  };
}

/**
 * Generate report summary
 */
function generateSummary(cases: ReportCase[]): ReportSummary {
  const totalCases = cases.length;
  const closedCases = cases.filter((c) => c.status === "closed").length;
  const activeCases = cases.filter((c) => c.status === "active").length;
  const successfulOutcomes = cases.filter(
    (c) => c.outcome === "employed" || c.outcome === "self-employed" || c.outcome === "education"
  ).length;
  const successRate = closedCases > 0 ? (successfulOutcomes / closedCases) * 100 : 0;

  return {
    totalCases,
    newCases: totalCases, // Simplified - all cases in period are "new"
    closedCases,
    activeCases,
    successfulOutcomes,
    successRate: Math.round(successRate * 10) / 10,
  };
}

/**
 * Generate demographics data
 */
function generateDemographics(cases: ReportCase[]): Demographics {
  const ageDistribution: Record<string, number> = {
    "14-18": 0,
    "19-24": 0,
    "25-34": 0,
    "35-44": 0,
    "45-54": 0,
    "55-64": 0,
    "65+": 0,
  };

  const disabilityTypes: Record<string, number> = {};

  cases.forEach((c) => {
    // Age distribution
    if (c.clientAge >= 14 && c.clientAge <= 18) ageDistribution["14-18"]++;
    else if (c.clientAge >= 19 && c.clientAge <= 24) ageDistribution["19-24"]++;
    else if (c.clientAge >= 25 && c.clientAge <= 34) ageDistribution["25-34"]++;
    else if (c.clientAge >= 35 && c.clientAge <= 44) ageDistribution["35-44"]++;
    else if (c.clientAge >= 45 && c.clientAge <= 54) ageDistribution["45-54"]++;
    else if (c.clientAge >= 55 && c.clientAge <= 64) ageDistribution["55-64"]++;
    else ageDistribution["65+"]++;

    // Disability types
    c.disability.forEach((d) => {
      disabilityTypes[d] = (disabilityTypes[d] || 0) + 1;
    });
  });

  return {
    ageDistribution,
    disabilityTypes,
    genderDistribution: {}, // Placeholder
    ethnicityDistribution: {}, // Placeholder
  };
}

/**
 * Generate outcome statistics
 */
function generateOutcomeStatistics(cases: ReportCase[]): OutcomeStatistics {
  const closedCases = cases.filter((c) => c.status === "closed");

  const employed = closedCases.filter((c) => c.outcome === "employed").length;
  const education = closedCases.filter((c) => c.outcome === "education").length;
  const selfEmployed = closedCases.filter((c) => c.outcome === "self-employed").length;
  const unsuccessful = closedCases.filter((c) => c.outcome === "unsuccessful").length;
  const other = closedCases.filter((c) => c.outcome === "other").length;

  const employedCases = closedCases.filter((c) => c.employmentDetails);
  const averageWage = employedCases.length > 0
    ? employedCases.reduce((sum, c) => sum + (c.employmentDetails?.salary || 0), 0) / employedCases.length
    : 0;

  const averageHoursWorked = employedCases.length > 0
    ? employedCases.reduce((sum, c) => sum + (c.employmentDetails?.hours || 0), 0) / employedCases.length
    : 0;

  return {
    totalClosures: closedCases.length,
    employed,
    education,
    selfEmployed,
    unsuccessful,
    other,
    averageWage: Math.round(averageWage * 100) / 100,
    averageHoursWorked: Math.round(averageHoursWorked * 10) / 10,
  };
}

/**
 * Generate service statistics
 */
function generateServiceStatistics(cases: ReportCase[]): ServiceStatistics {
  const servicesByType: Record<string, { count: number; hours: number }> = {};
  let totalServices = 0;
  let totalHours = 0;

  cases.forEach((c) => {
    c.servicesProvided.forEach((s) => {
      totalServices++;
      totalHours += s.hours;

      if (!servicesByType[s.serviceType]) {
        servicesByType[s.serviceType] = { count: 0, hours: 0 };
      }
      servicesByType[s.serviceType].count++;
      servicesByType[s.serviceType].hours += s.hours;
    });
  });

  const topServices = Object.entries(servicesByType)
    .map(([service, data]) => ({ service, count: data.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalServices,
    totalHours: Math.round(totalHours * 10) / 10,
    servicesByType,
    topServices,
  };
}

/**
 * Generate cost analysis
 */
function generateCostAnalysis(cases: ReportCase[]): CostAnalysis {
  const costsByCategory: Record<string, number> = {};
  let totalCosts = 0;

  cases.forEach((c) => {
    c.costs.forEach((cost) => {
      totalCosts += cost.amount;
      costsByCategory[cost.category] = (costsByCategory[cost.category] || 0) + cost.amount;
    });
  });

  const averageCostPerClient = cases.length > 0 ? totalCosts / cases.length : 0;

  const successfulOutcomes = cases.filter(
    (c) => c.outcome === "employed" || c.outcome === "self-employed" || c.outcome === "education"
  ).length;

  const costPerSuccessfulOutcome = successfulOutcomes > 0 ? totalCosts / successfulOutcomes : 0;

  return {
    totalCosts: Math.round(totalCosts * 100) / 100,
    averageCostPerClient: Math.round(averageCostPerClient * 100) / 100,
    costsByCategory,
    costPerSuccessfulOutcome: Math.round(costPerSuccessfulOutcome * 100) / 100,
  };
}

/**
 * Export report to specified format
 */
export async function exportReport(
  report: RSA911Report,
  format: ExportFormat
): Promise<AIServiceResponse<{ content: string; filename: string }>> {
  const requestId = generateRequestId("report-export");
  const timestamp = new Date().toISOString();

  try {
    let content: string;
    let filename: string;

    switch (format) {
      case "json":
        content = JSON.stringify(report, null, 2);
        filename = `${report.reportId}.json`;
        break;

      case "csv":
        content = convertToCSV(report);
        filename = `${report.reportId}.csv`;
        break;

      case "html":
        content = convertToHTML(report);
        filename = `${report.reportId}.html`;
        break;

      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    return {
      success: true,
      data: { content, filename },
      requestId,
      timestamp,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "REPORT_EXPORT_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      requestId,
      timestamp,
    };
  }
}

/**
 * Convert report to CSV format
 */
function convertToCSV(report: RSA911Report): string {
  const lines: string[] = [];

  // Header
  lines.push(`RSA-911 Report,${report.reportId}`);
  lines.push(`Agency,${report.agencyName}`);
  lines.push(`Period,${report.reportPeriod.start} to ${report.reportPeriod.end}`);
  lines.push("");

  // Summary
  lines.push("Summary");
  lines.push("Metric,Value");
  lines.push(`Total Cases,${report.summary.totalCases}`);
  lines.push(`Closed Cases,${report.summary.closedCases}`);
  lines.push(`Active Cases,${report.summary.activeCases}`);
  lines.push(`Successful Outcomes,${report.summary.successfulOutcomes}`);
  lines.push(`Success Rate,${report.summary.successRate}%`);
  lines.push("");

  // Outcomes
  lines.push("Outcomes");
  lines.push("Outcome,Count");
  lines.push(`Employed,${report.outcomes.employed}`);
  lines.push(`Education,${report.outcomes.education}`);
  lines.push(`Self-Employed,${report.outcomes.selfEmployed}`);
  lines.push(`Unsuccessful,${report.outcomes.unsuccessful}`);
  lines.push(`Other,${report.outcomes.other}`);
  lines.push("");

  // Costs
  lines.push("Cost Analysis");
  lines.push("Metric,Amount");
  lines.push(`Total Costs,$${report.costs.totalCosts}`);
  lines.push(`Average Cost Per Client,$${report.costs.averageCostPerClient}`);
  lines.push(`Cost Per Successful Outcome,$${report.costs.costPerSuccessfulOutcome}`);

  return lines.join("\n");
}

/**
 * Convert report to accessible HTML format
 */
function convertToHTML(report: RSA911Report): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSA-911 Report - ${report.reportId}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
    h1, h2 { color: #333; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .summary { background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .metric { display: flex; justify-content: space-between; margin: 10px 0; }
  </style>
</head>
<body>
  <h1>RSA-911 Report: ${report.reportId}</h1>
  <div class="summary" role="region" aria-label="Report Header">
    <p><strong>Agency:</strong> ${report.agencyName} (${report.agencyCode})</p>
    <p><strong>Report Period:</strong> ${report.reportPeriod.start} to ${report.reportPeriod.end}</p>
    <p><strong>Generated:</strong> ${new Date(report.generatedDate).toLocaleDateString()}</p>
  </div>

  <section aria-labelledby="summary-heading">
    <h2 id="summary-heading">Summary</h2>
    <div class="summary">
      <div class="metric"><span>Total Cases:</span> <strong>${report.summary.totalCases}</strong></div>
      <div class="metric"><span>Closed Cases:</span> <strong>${report.summary.closedCases}</strong></div>
      <div class="metric"><span>Active Cases:</span> <strong>${report.summary.activeCases}</strong></div>
      <div class="metric"><span>Successful Outcomes:</span> <strong>${report.summary.successfulOutcomes}</strong></div>
      <div class="metric"><span>Success Rate:</span> <strong>${report.summary.successRate}%</strong></div>
    </div>
  </section>

  <section aria-labelledby="outcomes-heading">
    <h2 id="outcomes-heading">Outcome Statistics</h2>
    <table role="table" aria-label="Outcome Statistics">
      <thead>
        <tr><th scope="col">Outcome</th><th scope="col">Count</th></tr>
      </thead>
      <tbody>
        <tr><td>Employed</td><td>${report.outcomes.employed}</td></tr>
        <tr><td>Education</td><td>${report.outcomes.education}</td></tr>
        <tr><td>Self-Employed</td><td>${report.outcomes.selfEmployed}</td></tr>
        <tr><td>Unsuccessful</td><td>${report.outcomes.unsuccessful}</td></tr>
        <tr><td>Other</td><td>${report.outcomes.other}</td></tr>
      </tbody>
    </table>
    <p><strong>Average Wage:</strong> $${report.outcomes.averageWage}/hour</p>
    <p><strong>Average Hours Worked:</strong> ${report.outcomes.averageHoursWorked} hours/week</p>
  </section>

  <section aria-labelledby="costs-heading">
    <h2 id="costs-heading">Cost Analysis</h2>
    <div class="summary">
      <div class="metric"><span>Total Costs:</span> <strong>$${report.costs.totalCosts.toLocaleString()}</strong></div>
      <div class="metric"><span>Average Cost Per Client:</span> <strong>$${report.costs.averageCostPerClient.toLocaleString()}</strong></div>
      <div class="metric"><span>Cost Per Successful Outcome:</span> <strong>$${report.costs.costPerSuccessfulOutcome.toLocaleString()}</strong></div>
    </div>
  </section>

  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Service Statistics</h2>
    <p><strong>Total Services:</strong> ${report.services.totalServices}</p>
    <p><strong>Total Hours:</strong> ${report.services.totalHours}</p>
    <h3>Top Services</h3>
    <table role="table" aria-label="Top Services">
      <thead>
        <tr><th scope="col">Service</th><th scope="col">Count</th></tr>
      </thead>
      <tbody>
        ${report.services.topServices.map(s => `<tr><td>${s.service}</td><td>${s.count}</td></tr>`).join("\n        ")}
      </tbody>
    </table>
  </section>
</body>
</html>`;
}
