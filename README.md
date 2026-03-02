# VR4Deaf Platform

A comprehensive Deaf-first platform connecting clients with vocational rehabilitation resources, workforce solutions, and business development opportunities through AI-powered accessibility.

> **🔄 Repository Migration In Progress**: This repository is being consolidated from multiple VR4DEAF-related codebases. See [MIGRATION_PLAN.md](MIGRATION_PLAN.md) for details.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![In Migration](https://img.shields.io/badge/Status-Migrating-yellow.svg)](docs/migration/progress.md)

## Core Features

- ASL-integrated learning environments with visual-first design
- Real-time captioning and visual communication systems
- AI-driven career matching and skills assessment
- Business development modules for deaf entrepreneurs
- Automated virtual support system with 24/7 assistance

## 🔄 Migration Status

This repository is undergoing consolidation to become the single source of truth for all VR4DEAF-related code, tools, and services. 

**Current Phase**: Phase 1 - Repository Audit  
**Progress**: Planning Complete, Audit Not Started

### Migration Phases
- [x] Phase 0: Planning and Documentation
- [ ] Phase 1: Repository Audit and Discovery
- [ ] Phase 2: Archive and Deprecation
- [ ] Phase 3: Frontend and Tools Migration
- [ ] Phase 4: Backend, AI, and Service Migration
- [ ] Phase 5: Update Links, Configs, and Metadata
- [ ] Phase 6: Final Review and Deployment

📊 **[View Detailed Progress](docs/migration/progress.md)** | 📋 **[Read Migration Plan](MIGRATION_PLAN.md)**

## Technical Architecture

Built on modern collaboration tools with accessibility at its core:

### Frontend Components

- **Framework:** Next.js 15.2.4 (React 19, App Router)
- **Styling:** TailwindCSS 3.4 with custom Magician theme
- **UI Library:** Radix UI + shadcn/ui components
- **State Management:** React Context + Hooks
- **Forms:** React Hook Form + Zod validation
- ASL-friendly navigation system
- Visual-first notification framework
- High-contrast UI elements

### Backend Services

- Flask/Node.js/Django REST Framework
- MongoDB and PostgreSQL databases
- TensorFlow for AI/ML capabilities
- LiveBlock for real-time collaboration

### Architecture Documentation

Comprehensive architecture documentation is available in the `/docs` folder:

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Complete platform architecture, service boundaries, routing structure, and integration patterns
- **[API_INTEGRATION.md](docs/API_INTEGRATION.md)** - API endpoint specifications, authentication flows, and integration examples
- **[COMPONENT_LIBRARY.md](docs/COMPONENT_LIBRARY.md)** - Magician component library documentation with usage examples
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment strategies, CI/CD pipeline, and configuration guide

## File Structure

```
VR4Deaf/
├── app/                       # Next.js application routes and pages
├── components/                # React components
├── hooks/                     # Custom React hooks
├── lib/                       # Utility libraries
├── magician-modules/          # Developer-facing reusable modules
│   ├── engines/              # Core processing engines
│   ├── ui-kits/              # UI component libraries
│   ├── agents/               # AI-powered agents
│   └── branded/              # Premium/enterprise modules
├── docs/                      # Comprehensive documentation
│   ├── DEVELOPER_MODULES.md
│   ├── BRANDING_LICENSING.md
│   ├── CONTRIBUTING_MODULES.md
│   ├── INTEGRATION_GUIDE.md
│   ├── PUBLISHING_WORKFLOW.md
│   └── mbtq_architecture.html
├── public/                    # Static assets
└── styles/                    # Global styles
├── app/                       # Next.js app directory
│   ├── api/                   # API routes
│   ├── client/                # Client portal routes (future)
│   ├── vendor/                # Vendor portal routes (future)
│   ├── admin/                 # Admin hub routes (future)
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/                # React components
│   ├── magician/              # Magician-branded reusable modules (future)
│   ├── ui/                    # Base UI primitives (shadcn/ui)
│   ├── features/              # Feature-specific components (future)
│   └── shared/                # Shared components
├── lib/                       # Utility functions and helpers
│   ├── api/                   # API adaptors (future)
│   ├── auth/                  # Authentication utilities (future)
│   └── utils.ts               # General utilities
├── hooks/                     # Custom React hooks
├── docs/                      # Architecture & API documentation
│   ├── ARCHITECTURE.md        # Platform architecture
│   ├── API_INTEGRATION.md     # API integration guide
│   ├── COMPONENT_LIBRARY.md   # Component documentation
│   └── DEPLOYMENT.md          # Deployment guide
├── public/                    # Static assets
├── styles/                    # Global styles
└── __tests__/                 # Test suites

```

## Setup Instructions

### Prerequisites

- **Node.js** v18.0.0 or higher
- **pnpm** v8.0.0 or higher (preferred package manager)
- **Git** v2.30.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/pinkycollie/VR4Deaf.git
cd VR4Deaf

# Install dependencies using pnpm
pnpm install

# Copy environment variables
cp .env.example .env.local

# Configure environment variables in .env.local
# See docs/DEPLOYMENT.md for detailed configuration

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run linter
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
```

### Quick Start Guide

1. **Review Architecture** - Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) to understand the platform structure
2. **Setup Environment** - Configure your `.env.local` file with necessary API keys
3. **Run Development Server** - Execute `pnpm dev` to start developing
4. **Explore Components** - Check [docs/COMPONENT_LIBRARY.md](docs/COMPONENT_LIBRARY.md) for available UI components
5. **API Integration** - Refer to [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md) for backend integration

## Implementation Timeline

Phase 1 (2-3 weeks): Core Infrastructure

- Basic UI components setup
- Real-time collaboration implementation
- Initial accessibility features

Phase 2 (3-4 weeks): Essential Features

- ASL-friendly navigation system
- Visual notification framework
- Real-time captioning integration

Phase 3 (2-3 weeks): Business Modules

- Career development tools
- Entrepreneur support system
- Mentorship platform

## Developer Modules

The VR4Deaf platform provides a comprehensive suite of developer modules under the `@vr4deaf/magician-*` namespace. These modules enable rapid development of Deaf-first applications with built-in accessibility features.

### Module Categories

- **Engines** (`@vr4deaf/magician-engine-*`): Core processing engines for accessibility, AI/ML, and real-time features
- **UI Kits** (`@vr4deaf/magician-ui-*`): Visual-first component libraries with ASL integration
- **Agents** (`@vr4deaf/magician-agent-*`): AI-powered automation and assistance modules
- **Branded** (`@vr4deaf/magician-branded-*`): Premium enterprise features (MBTQ Universe)

### Documentation

- 📚 [Developer Modules Guide](./docs/DEVELOPER_MODULES.md) - Complete module development guide
- 🎨 [Branding & Licensing](./docs/BRANDING_LICENSING.md) - Licensing and branding guidelines
- 🤝 [Contributing Modules](./docs/CONTRIBUTING_MODULES.md) - Module contribution process
- 🔗 [Integration Guide](./docs/INTEGRATION_GUIDE.md) - Cross-stack integration patterns
- 📦 [Publishing Workflow](./docs/PUBLISHING_WORKFLOW.md) - Module publishing process
- 🏗️ [MBTQ Architecture](./docs/mbtq_architecture.html) - Complete platform architecture

## Contributing

We welcome contributions that enhance accessibility and user experience for the deaf community. Please review our [contribution guidelines](CONTRIBUTING.md) and ensure all features maintain our commitment to Deaf-first design principles.

### Migration Contributors

If you're contributing during the migration period:
- Review the [Migration Plan](MIGRATION_PLAN.md)
- Check the [Migration Progress](docs/migration/progress.md)
- Use appropriate issue templates in `.github/ISSUE_TEMPLATE/`

## Documentation

- **[Migration Plan](MIGRATION_PLAN.md)** - Repository consolidation roadmap
- **[Repository Audit](REPOSITORY_AUDIT.md)** - Template for auditing repositories
- **[Architecture](docs/architecture/README.md)** - System architecture documentation
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines
- **[Migration Progress](docs/migration/progress.md)** - Current migration status

For contributing to developer modules, see [CONTRIBUTING_MODULES.md](./docs/CONTRIBUTING_MODULES.md).

## License

MIT License - See LICENSE file for details

---

## 🎯 VR4Deaf Specialized Features

### Multi-Tenant Agency Dashboard

The VR4Deaf platform provides a comprehensive multi-tenant dashboard system supporting VR agencies, LGBTQ+ organizations, Deaf services providers, and multi-service agencies.

#### Dashboard Features

- **Role-Based Views**: Different interfaces for Admin, Supervisor, Counselor, and Client roles
- **Real-Time Statistics**: Live case counts, placement rates, and RSA-911 compliance indicators
- **Agency Switcher**: Seamlessly switch between multiple agencies of different types
- **Case Management**: Advanced search, filtering, sorting, and pagination
- **Accessibility Tracking**: Monitor and manage client accessibility needs

#### Usage Example

```tsx
import { AgencyDashboard } from "@/components/dashboard/AgencyDashboard";

function Dashboard() {
  return (
    <AgencyDashboard
      userRole="counselor"
      userName="Jane Doe"
      agencyName="VR Services Inc."
      // Optional: provide custom data
      agencies={customAgencies}
      metrics={customMetrics}
      cases={customCases}
    />
  );
}
```

### AI-Powered Job Matching

Enhanced job matching algorithm that considers skills, accessibility requirements, Deaf-friendly workplaces, and LGBTQ+ inclusive employers with 0-100 scoring.

#### Features

- **Skills Matching (40% weight)**: Match job requirements with client skills
- **Accessibility Score (30% weight)**: ASL interpreters, visual alerts, captioning, accessible workspace
- **Certification Score (20% weight)**: Deaf-friendly and LGBTQ+ inclusive certifications
- **Preferences Score (10% weight)**: Location, salary, remote work, flexible hours

#### Usage Example

```tsx
import { findMatchingJobs } from "@/lib/ai/AIJobMatcher";

const clientProfile = {
  clientId: "client-001",
  skills: ["JavaScript", "React", "TypeScript"],
  experience: 3,
  education: "Bachelor's",
  accessibilityNeeds: ["ASL Interpreter", "Visual Alerts"],
  preferences: {
    deafFriendly: true,
    lgbtqInclusive: true,
    remoteWork: true,
    locations: ["Austin", "Dallas"],
    salaryRange: { min: 70000, max: 120000 },
  },
};

const result = await findMatchingJobs(clientProfile, availableJobs, 80);

if (result.success) {
  result.data?.matches.forEach(match => {
    console.log(`Job: ${match.job.title}`);
    console.log(`Match Score: ${match.matchScore}/100`);
    console.log(`Skills: ${match.breakdown.skillsScore}/100`);
    console.log(`Accessibility: ${match.breakdown.accessibilityScore}/100`);
    console.log(`Reasoning: ${match.reasoning.join(", ")}`);
  });
}
```

### Automated Eligibility Screening

Intelligent screening for multiple vocational rehabilitation programs with document checklists and priority determination.

#### Supported Programs

- WIOA Adult
- WIOA Youth (ages 14-24)
- WIOA Dislocated Worker
- Vocational Rehabilitation
- Trade Adjustment Assistance (TAA)
- SNAP Employment & Training
- Temporary Assistance for Needy Families (TANF)

#### Usage Example

```tsx
import { screenEligibility } from "@/lib/ai/AIEligibilityScreener";

const clientProfile = {
  id: "client-001",
  age: 28,
  disability: ["Deaf", "Visual Impairment"],
  employmentStatus: "unemployed",
  education: "Bachelor's Degree",
  income: 15000,
  veteranStatus: false,
  socialSecurity: true,
  stateResident: true,
  state: "TX",
};

const result = await screenEligibility(clientProfile);

if (result.success) {
  console.log(`Recommended Program: ${result.data?.recommendedProgram}`);
  console.log(`Overall Priority: ${result.data?.overallPriority}`);
  
  result.data?.assessments.forEach(assessment => {
    if (assessment.eligible) {
      console.log(`\n${assessment.program}:`);
      console.log(`  Confidence: ${assessment.confidence}%`);
      console.log(`  Priority: ${assessment.priority}`);
      console.log(`  Required Documents: ${assessment.requiredDocuments.join(", ")}`);
      console.log(`  Processing Time: ${assessment.estimatedProcessingTime} days`);
    }
  });
  
  console.log(`\nNext Steps:`);
  result.data?.nextSteps.forEach(step => console.log(`  - ${step}`));
}
```

### RSA-911 Compliant Reporting

Automated generation of RSA-911 reports with comprehensive statistics, outcome tracking, and multiple export formats.

#### Report Features

- **Demographics Analysis**: Age distribution, disability types
- **Outcome Statistics**: Employment rates, wages, hours worked
- **Service Utilization**: Service types, hours, providers
- **Cost Analysis**: Total costs, cost per client, cost per successful outcome
- **Export Formats**: JSON (data interchange), CSV (spreadsheet), HTML (accessible web)

#### Usage Example

```tsx
import { generateRSA911Report, exportReport } from "@/lib/ai/AIReportGenerator";

// Generate report
const report = generateRSA911Report(
  cases,
  { start: "2024-01-01", end: "2024-12-31" },
  "VR Services Inc.",
  "TX-001"
);

console.log(`Total Cases: ${report.summary.totalCases}`);
console.log(`Success Rate: ${report.summary.successRate}%`);
console.log(`Average Wage: $${report.outcomes.averageWage}/hour`);
console.log(`Total Costs: $${report.costs.totalCosts}`);

// Export as HTML (accessible)
const htmlExport = await exportReport(report, "html");
if (htmlExport.success) {
  fs.writeFileSync(htmlExport.data?.filename, htmlExport.data?.content);
}

// Export as CSV (for Excel)
const csvExport = await exportReport(report, "csv");

// Export as JSON (for data analysis)
const jsonExport = await exportReport(report, "json");
```

### Dashboard Metrics Visualization

Interactive charts using Recharts for visualizing case trends, outcomes, and service utilization.

#### Usage Example

```tsx
import { DashboardMetricsComponent } from "@/components/dashboard/DashboardMetrics";

const metrics = {
  totalCases: 156,
  activeCases: 89,
  closedCases: 67,
  successfulPlacements: 52,
  averageTimeToPlacement: 87,
  caseTrends: [
    { month: "Jan", cases: 12, placements: 8 },
    { month: "Feb", cases: 15, placements: 10 },
    // ... more months
  ],
  outcomeDistribution: [
    { outcome: "Employed", count: 52, percentage: 78 },
    { outcome: "Education", count: 8, percentage: 12 },
    // ... more outcomes
  ],
  serviceUtilization: [
    { service: "Assessment", hours: 245, clients: 45 },
    { service: "Training", hours: 180, clients: 38 },
    // ... more services
  ],
};

const rsaCompliance = {
  status: "compliant",
  lastReportDate: "2024-12-01",
  nextDueDate: "2025-03-31",
  missingFields: [],
};

<DashboardMetricsComponent 
  metrics={metrics} 
  rsaCompliance={rsaCompliance} 
/>
```

### Case Management Component

Comprehensive case list with advanced filtering, sorting, and pagination.

#### Usage Example

```tsx
import { CaseList } from "@/components/dashboard/CaseList";

const cases = [
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
  // ... more cases
];

<CaseList 
  cases={cases}
  onCaseSelect={(caseItem) => {
    console.log("Selected case:", caseItem.id);
    // Navigate to case details
  }}
/>
```

## 🔒 Security & Compliance

### GitHub Actions Workflows

The platform includes comprehensive CI/CD workflows:

#### Accessibility Audit
- **File**: `.github/workflows/accessibility-audit.yml`
- **Features**: axe-core testing, WCAG 2.1 AA compliance checks
- **Trigger**: PR, push to main/develop
- **Reports**: Automated PR comments with accessibility results

#### Security Scan
- **File**: `.github/workflows/security-scan.yml`
- **Features**: npm audit, TruffleHog secret scanning, CodeQL analysis, dependency review
- **Trigger**: PR, push, weekly schedule
- **Alerts**: Critical vulnerabilities block deployment

#### Deploy Preview
- **File**: `.github/workflows/deploy-preview.yml`
- **Features**: PR preview builds, Lighthouse performance audit
- **Retention**: 7 days
- **Artifacts**: Deployable preview build

#### Auto Release
- **File**: `.github/workflows/auto-release.yml`
- **Features**: Semantic versioning, automated changelog, GitHub releases
- **Trigger**: Push to main, manual workflow dispatch
- **Versioning**: patch/minor/major based on commit messages

### Database Security

Complete Supabase schema with row-level security policies:

- **Multi-tenant Isolation**: RLS policies ensure agency data separation
- **Role-Based Access**: Different permissions for Admin, Supervisor, Counselor, Client
- **Audit Trail**: Complete activity logging for compliance
- **Data Encryption**: All sensitive data encrypted at rest
- **PII Protection**: Limited PII storage (SSN last 4 only)

See [docs/database-schema.md](docs/database-schema.md) for complete schema documentation.

## 🚀 25-Year Technology Vision

The VR4Deaf platform is architected for the next 25 years with:

### Phase 1: Foundation (2025-2030)
- Multi-tenant dashboard ✅
- AI-powered services ✅
- RSA-911 automation ✅
- WCAG 2.1 AA compliance ✅

### Phase 2: Intelligence (2030-2035)
- Self-evolving AI systems
- Advanced NLP/ASL processing
- Blockchain credentials
- Predictive analytics

### Phase 3: Next-Gen Interfaces (2035-2040)
- Brain-computer interfaces (BCI)
- Haptic ASL technology
- Extended reality (XR) platforms
- Holographic interpreters

### Phase 4: Quantum Integration (2040-2045)
- Quantum cryptography
- Quantum machine learning
- Post-quantum security
- Quantum databases

### Phase 5: Autonomous Systems (2045-2050)
- Self-governing platform
- Personalized reality
- Global integration
- Sentient accessibility

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the complete 25-year vision.

## 📚 Additional Resources

- **[Database Schema](docs/database-schema.md)** - Complete Supabase schema with RLS policies
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and 25-year vision
- **[API Integration](docs/API_INTEGRATION.md)** - API endpoint specifications
- **[Component Library](docs/COMPONENT_LIBRARY.md)** - UI component documentation
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deployment strategies and configuration

## 🧪 Testing

The platform includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# View test coverage
npm run test:coverage
```

**Current Test Status**: 116 tests passing
- AI Services: 44 tests (Job Matching, Eligibility, Reporting)
- API: 16 tests (Spine, DeafAuth, Magicians)
- Modules: 14 tests (Template module)
- Legacy AI: 42 tests (VR Business, Reporting, Learning, Partnerships)

## License

MIT License - See LICENSE file for details

(ADDED BY VERCEL - intended to be features for VR4Deaf

# 360 Business Resources

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mbtquniverse/v0-vr-4-deaf)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/mOtGG5OKK71)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/mbtquniverse/v0-vr-4-deaf](https://vercel.com/mbtquniverse/v0-vr-4-deaf)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/mOtGG5OKK71](https://v0.dev/chat/projects/mOtGG5OKK71)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
