# Developer Module Documentation

## Overview

The VR4Deaf platform provides a comprehensive suite of developer modules designed to accelerate the development of Deaf-first applications. These modules are organized under the `@vr4deaf/magician-*` namespace and follow a modular architecture that promotes code reuse, maintainability, and community contributions.

## Architecture Principles

### 1. Modular Separation
- **Platform-Specific Integration**: Core VR4Deaf platform code remains in the main repository
- **Generic Developer Assets**: Reusable modules are published as separate npm packages
- **Clear Boundaries**: Each module has well-defined responsibilities and interfaces

### 2. Deaf-First Design
- All modules prioritize visual-first communication
- ASL integration is a core consideration
- High-contrast, accessible UI components
- Real-time visual feedback and notifications

### 3. Cross-Stack Compatibility
- **Frontend**: Next.js, React, TypeScript
- **Backend**: FastAPI, Node.js, Python
- **Database**: MongoDB, PostgreSQL
- **AI/ML**: TensorFlow, custom models

## Module Types

### Engines

Engines are core processing modules that handle complex operations:

#### Accessibility Engine
```typescript
import { AccessibilityEngine } from '@vr4deaf/magician-engine-accessibility';

const engine = new AccessibilityEngine({
  aslSupport: true,
  captioning: {
    realTime: true,
    language: 'en-US'
  },
  visualFirst: true
});

await engine.initialize();
```

**Features:**
- ASL recognition and interpretation
- Real-time captioning
- Visual-first processing
- High-contrast rendering
- Screen reader optimization

#### AI/ML Engine
```typescript
import { AIEngine } from '@vr4deaf/magician-engine-ai';

const aiEngine = new AIEngine({
  models: ['career-matching', 'skills-assessment'],
  inferenceMode: 'local' // or 'cloud'
});

const match = await aiEngine.matchCareer({
  skills: ['JavaScript', 'React', 'Accessibility'],
  preferences: { remote: true, visual: true }
});
```

**Features:**
- Career matching algorithms
- Skills assessment
- Recommendation systems
- Natural language processing (visual-first)
- Adaptive learning models

#### Real-time Engine
```typescript
import { RealtimeEngine } from '@vr4deaf/magician-engine-realtime';

const rtEngine = new RealtimeEngine({
  transport: 'websocket',
  presence: true,
  visualNotifications: true
});

rtEngine.on('message', (msg) => {
  // Handle visual notification
});
```

**Features:**
- WebSocket/WebRTC communication
- Presence tracking
- Live collaboration
- Visual notifications
- State synchronization

### UI Kits

UI Kits provide ready-to-use, accessible components:

#### ASL Navigation Kit
```tsx
import { ASLNav, VisualBreadcrumb } from '@vr4deaf/magician-ui-asl-navigation';

export default function MyApp() {
  return (
    <ASLNav
      items={[
        { label: 'Home', icon: '🏠', path: '/' },
        { label: 'Resources', icon: '📚', path: '/resources' }
      ]}
      visualMode="high-contrast"
    />
  );
}
```

**Components:**
- Visual-first navigation
- Icon-based menus
- High-contrast themes
- Gesture-friendly interactions
- ASL-interpreted labels

#### Accessibility Components
```tsx
import { 
  VisualAlert, 
  CaptionedVideo, 
  HighContrastButton 
} from '@vr4deaf/magician-ui-accessibility';

<VisualAlert 
  type="success"
  message="Profile updated"
  duration={5000}
  visualIntensity="high"
/>
```

**Components:**
- Visual alerts and notifications
- Captioned media players
- High-contrast UI elements
- Keyboard navigation support
- Screen reader optimized

### Agents

AI-powered agents for automation and assistance:

#### Virtual Support Agent
```typescript
import { VirtualSupportAgent } from '@vr4deaf/magician-agent-support';

const agent = new VirtualSupportAgent({
  language: 'en-US',
  aslSupport: true,
  responseMode: 'visual'
});

const response = await agent.handleQuery({
  question: "How do I apply for a job?",
  context: { userProfile }
});
```

**Capabilities:**
- 24/7 automated assistance
- Visual-first responses
- ASL interpretation
- Context-aware help
- Multi-modal communication

#### Career Matching Agent
```typescript
import { CareerMatchingAgent } from '@vr4deaf/magician-agent-career';

const careerAgent = new CareerMatchingAgent({
  database: 'postgres://...',
  aiModel: 'career-v2'
});

const matches = await careerAgent.findMatches({
  skills: userSkills,
  preferences: userPreferences,
  accessibilityNeeds: ['visual-workspace', 'asl-support']
});
```

**Capabilities:**
- Skills assessment
- Job matching algorithms
- Career path recommendations
- Accessibility-aware matching
- Interview preparation

### Branded Modules

Magician/MBTQ branded proprietary modules for enterprise use:

```typescript
import { MagicianEnterprise } from '@vr4deaf/magician-branded-enterprise';

const enterprise = new MagicianEnterprise({
  license: process.env.MAGICIAN_LICENSE_KEY,
  features: ['advanced-analytics', 'custom-branding']
});
```

**Features:**
- Premium analytics
- Custom branding options
- Enterprise integrations
- Advanced security
- Priority support

## Creating a New Module

### Step 1: Initialize Module Structure

```bash
cd magician-modules/engines
mkdir my-new-engine
cd my-new-engine
npm init -y
```

### Step 2: Configure package.json

```json
{
  "name": "@vr4deaf/magician-engine-myengine",
  "version": "0.1.0",
  "description": "Description of my engine",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "license": "MIT",
  "keywords": ["vr4deaf", "deaf-first", "accessibility"],
  "repository": {
    "type": "git",
    "url": "https://github.com/pinkycollie/VR4Deaf.git",
    "directory": "magician-modules/engines/my-new-engine"
  },
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "lint": "eslint src"
  },
  "peerDependencies": {
    "react": "^19",
    "typescript": "^5"
  }
}
```

### Step 3: Create Module Structure

```
my-new-engine/
├── src/
│   ├── index.ts          # Main entry point
│   ├── engine.ts         # Core engine logic
│   ├── types.ts          # TypeScript types
│   └── utils/            # Utility functions
├── tests/
│   └── engine.test.ts    # Unit tests
├── docs/
│   └── API.md            # API documentation
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

### Step 4: Implement Core Functionality

```typescript
// src/index.ts
export { MyEngine } from './engine';
export type { MyEngineConfig, MyEngineOptions } from './types';

// src/engine.ts
import { MyEngineConfig } from './types';

export class MyEngine {
  private config: MyEngineConfig;

  constructor(config: MyEngineConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    // Initialization logic
  }

  async process(input: any): Promise<any> {
    // Processing logic
  }
}
```

### Step 5: Add Tests

```typescript
// tests/engine.test.ts
import { describe, it, expect } from 'vitest';
import { MyEngine } from '../src/engine';

describe('MyEngine', () => {
  it('should initialize correctly', async () => {
    const engine = new MyEngine({ /* config */ });
    await engine.initialize();
    expect(engine).toBeDefined();
  });

  it('should process input correctly', async () => {
    const engine = new MyEngine({ /* config */ });
    const result = await engine.process({ /* input */ });
    expect(result).toBeDefined();
  });
});
```

### Step 6: Document API

Create comprehensive API documentation in `docs/API.md` following the project standards.

## Module Dependencies

### Managing Dependencies

1. **Keep dependencies minimal**: Only include essential packages
2. **Use peer dependencies**: For shared packages like React, TypeScript
3. **Version pinning**: Use exact versions for critical dependencies
4. **Regular updates**: Keep dependencies up-to-date for security

### Example package.json Dependencies

```json
{
  "dependencies": {
    "core-library": "^1.0.0"
  },
  "peerDependencies": {
    "react": "^19",
    "typescript": "^5"
  },
  "devDependencies": {
    "@types/node": "^22",
    "vitest": "^4.0.14",
    "typescript": "^5"
  }
}
```

## Monorepo Configuration

The VR4Deaf platform uses a monorepo structure with workspace management:

### pnpm Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'magician-modules/engines/*'
  - 'magician-modules/ui-kits/*'
  - 'magician-modules/agents/*'
  - 'magician-modules/branded/*'
```

### Root package.json

```json
{
  "name": "vr4deaf-monorepo",
  "private": true,
  "workspaces": [
    "magician-modules/engines/*",
    "magician-modules/ui-kits/*",
    "magician-modules/agents/*",
    "magician-modules/branded/*"
  ]
}
```

## Publishing Workflow

See [Publishing Workflow](./PUBLISHING_WORKFLOW.md) for detailed instructions on:
- Preparing modules for publication
- Open-source vs. premium package handling
- Version management
- NPM registry configuration
- Continuous integration setup

## Integration Patterns

See [Integration Guide](./INTEGRATION_GUIDE.md) for:
- Cross-stack integration examples
- Module composition patterns
- Best practices for module usage
- Performance optimization
- Debugging and troubleshooting

## Best Practices

### Code Quality
1. **TypeScript First**: All modules must be written in TypeScript
2. **Comprehensive Tests**: Minimum 80% code coverage
3. **Linting**: Follow ESLint rules from the main repository
4. **Documentation**: Every public API must be documented

### Accessibility
1. **Visual First**: All UI components must work without audio
2. **High Contrast**: Support high-contrast modes
3. **Keyboard Navigation**: Full keyboard accessibility
4. **Screen Readers**: ARIA labels and semantic HTML
5. **ASL Support**: Consider ASL users in all interactions

### Performance
1. **Lazy Loading**: Load modules on-demand when possible
2. **Tree Shaking**: Ensure modules are tree-shakeable
3. **Bundle Size**: Keep individual modules under 100KB
4. **Caching**: Implement intelligent caching strategies

### Security
1. **Input Validation**: Validate all external inputs
2. **Secure Defaults**: Use secure configurations by default
3. **Dependency Scanning**: Regular security audits
4. **License Compliance**: Ensure license compatibility

## Module Boundaries

### Clear Responsibilities
- Each module should have a single, well-defined purpose
- Avoid circular dependencies between modules
- Use interfaces for inter-module communication

### Example Boundaries

```
┌─────────────────────────────────────────────┐
│           VR4Deaf Platform Core             │
│   (Main Application, Routing, State)        │
└─────────────┬───────────────────────────────┘
              │
     ┌────────┴────────┐
     │                 │
┌────▼─────┐    ┌─────▼─────┐    ┌──────────┐
│  Engines │    │  UI Kits  │    │  Agents  │
│  (Core)  │    │ (Visual)  │    │  (AI)    │
└──────────┘    └───────────┘    └──────────┘
     │                 │                │
     └────────┬────────┴────────────────┘
              │
     ┌────────▼────────┐
     │ Branded Modules │
     │  (Enterprise)   │
     └─────────────────┘
```

## Support and Community

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join community discussions for help
- **Contributing**: See [CONTRIBUTING_MODULES.md](./CONTRIBUTING_MODULES.md)
- **License**: See [BRANDING_LICENSING.md](./BRANDING_LICENSING.md)

## Related Documentation

- [mbtq_architecture.html](./mbtq_architecture.html) - Complete platform architecture
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Integration patterns and examples
- [BRANDING_LICENSING.md](./BRANDING_LICENSING.md) - Licensing and branding guidelines
- [CONTRIBUTING_MODULES.md](./CONTRIBUTING_MODULES.md) - Contribution guidelines
- [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md) - Module publishing process
