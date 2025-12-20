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
