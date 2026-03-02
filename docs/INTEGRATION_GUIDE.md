# Integration Guide

## Overview

This guide provides comprehensive integration patterns and best practices for using VR4Deaf Magician modules across different technology stacks and platforms.

## Table of Contents

1. [Frontend Integration (Next.js/React)](#frontend-integration)
2. [Backend Integration (FastAPI/Node.js)](#backend-integration)
3. [Cross-Stack Communication](#cross-stack-communication)
4. [Module Composition Patterns](#module-composition-patterns)
5. [Performance Optimization](#performance-optimization)
6. [Error Handling](#error-handling)
7. [Debugging and Troubleshooting](#debugging-and-troubleshooting)

## Frontend Integration

### Next.js Application Setup

#### Installing Modules

```bash
# Install core modules
pnpm add @vr4deaf/magician-engine-accessibility
pnpm add @vr4deaf/magician-ui-asl-navigation
pnpm add @vr4deaf/magician-agent-support
```

#### Basic Integration

```typescript
// app/layout.tsx
import { AccessibilityProvider } from '@vr4deaf/magician-engine-accessibility';
import { ASLNavigationProvider } from '@vr4deaf/magician-ui-asl-navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AccessibilityProvider
          config={{
            visualFirst: true,
            highContrast: true,
            aslSupport: true
          }}
        >
          <ASLNavigationProvider>
            {children}
          </ASLNavigationProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
```

#### Component-Level Integration

```typescript
// components/career-dashboard.tsx
'use client';

import { useAccessibility } from '@vr4deaf/magician-engine-accessibility';
import { ASLNav } from '@vr4deaf/magician-ui-asl-navigation';
import { CareerMatchingAgent } from '@vr4deaf/magician-agent-career';
import { useState, useEffect } from 'react';

export function CareerDashboard() {
  const { visualMode, isHighContrast } = useAccessibility();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const agent = new CareerMatchingAgent({
      visualFirst: true
    });

    agent.findMatches({
      skills: ['React', 'TypeScript', 'Accessibility'],
      preferences: { remote: true }
    }).then(setMatches);
  }, []);

  return (
    <div className={isHighContrast ? 'high-contrast' : ''}>
      <ASLNav items={navItems} visualMode={visualMode} />
      <main>
        {/* Dashboard content */}
      </main>
    </div>
  );
}
```

### React Hooks Integration

```typescript
// Custom hook using Magician modules
import { useEffect, useState } from 'react';
import { AccessibilityEngine } from '@vr4deaf/magician-engine-accessibility';
import { RealtimeEngine } from '@vr4deaf/magician-engine-realtime';

export function useVR4DeafSetup() {
  const [isReady, setIsReady] = useState(false);
  const [engines, setEngines] = useState<{
    accessibility: AccessibilityEngine | null;
    realtime: RealtimeEngine | null;
  }>({
    accessibility: null,
    realtime: null
  });

  useEffect(() => {
    async function initialize() {
      // Initialize accessibility engine
      const accessibility = new AccessibilityEngine({
        visualFirst: true,
        aslSupport: true,
        captioning: { realTime: true }
      });

      // Initialize realtime engine
      const realtime = new RealtimeEngine({
        transport: 'websocket',
        visualNotifications: true
      });

      await Promise.all([
        accessibility.initialize(),
        realtime.initialize()
      ]);

      setEngines({ accessibility, realtime });
      setIsReady(true);
    }

    initialize();

    return () => {
      // Cleanup
      engines.accessibility?.dispose();
      engines.realtime?.dispose();
    };
  }, []);

  return { isReady, engines };
}
```

### Server Components Integration

```typescript
// app/resources/page.tsx (Server Component)
import { CareerMatchingAgent } from '@vr4deaf/magician-agent-career';
import { ResourceCard } from '@/components/resource-card';

export default async function ResourcesPage() {
  // Server-side data fetching with Magician agent
  const agent = new CareerMatchingAgent();
  const resources = await agent.getRecommendedResources({
    category: 'career-development'
  });

  return (
    <div className="resources-grid">
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
```

## Backend Integration

### FastAPI Integration (Python)

#### Installing Python Modules

```bash
pip install vr4deaf-magician-engine-ai
pip install vr4deaf-magician-agent-support
```

#### Basic FastAPI Setup

```python
# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from vr4deaf.magician.engine.ai import AIEngine
from vr4deaf.magician.agent.support import VirtualSupportAgent

app = FastAPI(title="VR4Deaf API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines
ai_engine = AIEngine(
    models=['career-matching', 'skills-assessment'],
    visual_first=True
)

support_agent = VirtualSupportAgent(
    asl_support=True,
    response_mode='visual'
)

@app.on_event("startup")
async def startup_event():
    await ai_engine.initialize()
    await support_agent.initialize()

@app.on_event("shutdown")
async def shutdown_event():
    await ai_engine.dispose()
    await support_agent.dispose()

# Endpoints
@app.post("/api/career-match")
async def match_career(request: CareerMatchRequest):
    matches = await ai_engine.match_career({
        'skills': request.skills,
        'preferences': request.preferences
    })
    return {"matches": matches}

@app.post("/api/support/query")
async def support_query(request: SupportRequest):
    response = await support_agent.handle_query({
        'question': request.question,
        'context': request.context
    })
    return {"response": response}
```

### Node.js/Express Integration

```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import { AIEngine } from '@vr4deaf/magician-engine-ai';
import { VirtualSupportAgent } from '@vr4deaf/magician-agent-support';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize engines
const aiEngine = new AIEngine({
  models: ['career-matching', 'skills-assessment'],
  inferenceMode: 'local'
});

const supportAgent = new VirtualSupportAgent({
  aslSupport: true,
  responseMode: 'visual'
});

// Startup
async function startup() {
  await aiEngine.initialize();
  await supportAgent.initialize();
  console.log('Magician engines initialized');
}

// Routes
app.post('/api/career-match', async (req, res) => {
  try {
    const matches = await aiEngine.matchCareer({
      skills: req.body.skills,
      preferences: req.body.preferences
    });
    res.json({ matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/support/query', async (req, res) => {
  try {
    const response = await supportAgent.handleQuery({
      question: req.body.question,
      context: req.body.context
    });
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
startup().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});
```

## Cross-Stack Communication

### Frontend to Backend Communication

#### API Client Setup

```typescript
// lib/api-client.ts
import { VisualAlert } from '@vr4deaf/magician-ui-accessibility';

export class VR4DeafAPIClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async careerMatch(data: CareerMatchRequest) {
    try {
      const response = await fetch(`${this.baseUrl}/api/career-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Match failed');
      }

      return await response.json();
    } catch (error) {
      // Visual error notification
      VisualAlert.show({
        type: 'error',
        message: 'Career matching failed',
        visualIntensity: 'high'
      });
      throw error;
    }
  }

  async supportQuery(question: string, context?: any) {
    const response = await fetch(`${this.baseUrl}/api/support/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context })
    });

    return await response.json();
  }
}
```

### Real-time Communication

```typescript
// WebSocket integration
import { RealtimeEngine } from '@vr4deaf/magician-engine-realtime';

export class RealtimeSync {
  private rtEngine: RealtimeEngine;

  constructor() {
    this.rtEngine = new RealtimeEngine({
      transport: 'websocket',
      url: 'ws://localhost:3001/ws',
      visualNotifications: true
    });
  }

  async connect() {
    await this.rtEngine.initialize();

    this.rtEngine.on('career-update', (data) => {
      // Handle visual notification
      this.showVisualUpdate(data);
    });

    this.rtEngine.on('message', (msg) => {
      // Handle real-time messages
      this.handleMessage(msg);
    });
  }

  private showVisualUpdate(data: any) {
    // Show visual indicator for updates
  }

  private handleMessage(msg: any) {
    // Process incoming messages
  }
}
```

### Backend to Backend Communication

```python
# Python backend calling Node.js services
import httpx
from vr4deaf.magician.engine.ai import AIEngine

class CrossServiceIntegration:
    def __init__(self):
        self.ai_engine = AIEngine()
        self.node_service_url = "http://localhost:3002"

    async def process_with_node_service(self, data):
        # Process with AI engine first
        processed = await self.ai_engine.process(data)

        # Send to Node.js service
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.node_service_url}/api/process",
                json=processed
            )
            return response.json()
```

## Module Composition Patterns

### Pattern 1: Layered Architecture

```typescript
// Layer 1: Core engines (bottom)
import { AccessibilityEngine } from '@vr4deaf/magician-engine-accessibility';
import { AIEngine } from '@vr4deaf/magician-engine-ai';

// Layer 2: Agents (middle)
import { CareerMatchingAgent } from '@vr4deaf/magician-agent-career';

// Layer 3: UI components (top)
import { ASLNav } from '@vr4deaf/magician-ui-asl-navigation';

export class VR4DeafPlatform {
  private engines: {
    accessibility: AccessibilityEngine;
    ai: AIEngine;
  };
  private agents: {
    career: CareerMatchingAgent;
  };

  async initialize() {
    // Initialize engines first
    this.engines = {
      accessibility: new AccessibilityEngine({ visualFirst: true }),
      ai: new AIEngine({ models: ['career-matching'] })
    };

    await Promise.all([
      this.engines.accessibility.initialize(),
      this.engines.ai.initialize()
    ]);

    // Initialize agents that depend on engines
    this.agents = {
      career: new CareerMatchingAgent({
        aiEngine: this.engines.ai,
        accessibilityEngine: this.engines.accessibility
      })
    };
  }
}
```

### Pattern 2: Plugin Architecture

```typescript
// Core platform with plugin support
import { EventEmitter } from 'events';

export class VR4DeafCore extends EventEmitter {
  private plugins: Map<string, any> = new Map();

  registerPlugin(name: string, plugin: any) {
    this.plugins.set(name, plugin);
    plugin.initialize(this);
    this.emit('plugin:registered', name);
  }

  getPlugin(name: string) {
    return this.plugins.get(name);
  }
}

// Usage
const core = new VR4DeafCore();

// Register Magician modules as plugins
core.registerPlugin('accessibility', new AccessibilityEngine());
core.registerPlugin('career-matching', new CareerMatchingAgent());
```

### Pattern 3: Dependency Injection

```typescript
// Container for dependency injection
export class ServiceContainer {
  private services = new Map();

  register<T>(name: string, factory: () => T) {
    this.services.set(name, factory);
  }

  resolve<T>(name: string): T {
    const factory = this.services.get(name);
    if (!factory) {
      throw new Error(`Service ${name} not registered`);
    }
    return factory();
  }
}

// Setup
const container = new ServiceContainer();

container.register('accessibilityEngine', () =>
  new AccessibilityEngine({ visualFirst: true })
);

container.register('careerAgent', () =>
  new CareerMatchingAgent({
    aiEngine: container.resolve('aiEngine')
  })
);

// Usage in components
export function useCareerMatching() {
  const agent = container.resolve<CareerMatchingAgent>('careerAgent');
  return agent;
}
```

## Performance Optimization

### Lazy Loading Modules

```typescript
// Lazy load heavy modules
export async function loadCareerMatching() {
  const { CareerMatchingAgent } = await import(
    '@vr4deaf/magician-agent-career'
  );
  return new CareerMatchingAgent();
}

// Usage in Next.js
const CareerDashboard = dynamic(
  () => import('@/components/career-dashboard'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);
```

### Caching Strategies

```typescript
// Module result caching
import { AIEngine } from '@vr4deaf/magician-engine-ai';

export class CachedAIEngine {
  private engine: AIEngine;
  private cache = new Map<string, any>();

  constructor() {
    this.engine = new AIEngine();
  }

  async matchCareer(request: CareerMatchRequest) {
    const cacheKey = JSON.stringify(request);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const result = await this.engine.matchCareer(request);
    this.cache.set(cacheKey, result);

    // Cache expiration
    setTimeout(() => this.cache.delete(cacheKey), 300000); // 5 min

    return result;
  }
}
```

### Bundle Optimization

```javascript
// next.config.mjs
export default {
  webpack: (config) => {
    // Tree shaking for Magician modules
    config.optimization.usedExports = true;

    // Split chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        magician: {
          test: /[\\/]node_modules[\\/]@vr4deaf[\\/]magician/,
          name: 'magician-modules',
          priority: 10
        }
      }
    };

    return config;
  }
};
```

## Error Handling

### Graceful Degradation

```typescript
// Fallback when modules fail to load
export class ResilientVR4Deaf {
  private engines: {
    accessibility?: AccessibilityEngine;
    ai?: AIEngine;
  } = {};

  async initialize() {
    try {
      this.engines.accessibility = new AccessibilityEngine();
      await this.engines.accessibility.initialize();
    } catch (error) {
      console.error('Accessibility engine failed:', error);
      // Continue with basic accessibility
      this.engines.accessibility = new BasicAccessibility();
    }

    try {
      this.engines.ai = new AIEngine();
      await this.engines.ai.initialize();
    } catch (error) {
      console.error('AI engine failed:', error);
      // Continue without AI features
    }
  }

  get hasAI(): boolean {
    return !!this.engines.ai;
  }
}
```

### Visual Error Reporting

```typescript
// Error handler with visual feedback
import { VisualAlert } from '@vr4deaf/magician-ui-accessibility';

export function handleModuleError(error: Error, moduleName: string) {
  console.error(`[${moduleName}]`, error);

  VisualAlert.show({
    type: 'error',
    message: `${moduleName} encountered an error`,
    details: error.message,
    visualIntensity: 'high',
    duration: 10000,
    actions: [
      {
        label: 'Retry',
        onClick: () => window.location.reload()
      },
      {
        label: 'Report',
        onClick: () => reportError(error, moduleName)
      }
    ]
  });
}
```

## Debugging and Troubleshooting

### Debug Mode

```typescript
// Enable debug mode for modules
process.env.VR4DEAF_DEBUG = 'true';

const engine = new AccessibilityEngine({
  debug: true,
  logLevel: 'verbose'
});

// Debug events
engine.on('debug', (event) => {
  console.log('[DEBUG]', event);
});
```

### Module Health Check

```typescript
// Health monitoring
export class ModuleHealthMonitor {
  async checkHealth() {
    const modules = [
      { name: 'accessibility', instance: accessibilityEngine },
      { name: 'ai', instance: aiEngine },
      { name: 'realtime', instance: realtimeEngine }
    ];

    const health = await Promise.all(
      modules.map(async (mod) => ({
        name: mod.name,
        status: await mod.instance.healthCheck(),
        timestamp: Date.now()
      }))
    );

    return health;
  }
}
```

### Common Issues and Solutions

#### Issue: Module Not Found

```bash
# Solution: Ensure module is installed
pnpm add @vr4deaf/magician-engine-accessibility

# Check installation
pnpm list @vr4deaf/magician-engine-accessibility
```

#### Issue: TypeScript Types Missing

```typescript
// Solution: Install type definitions
pnpm add -D @types/vr4deaf__magician-engine-accessibility

// Or add to tsconfig.json
{
  "compilerOptions": {
    "types": ["@vr4deaf/magician-engine-accessibility"]
  }
}
```

#### Issue: Version Conflicts

```bash
# Solution: Use exact versions in package.json
{
  "dependencies": {
    "@vr4deaf/magician-engine-accessibility": "1.2.3"
  }
}
```

## Best Practices

1. **Initialize Early**: Initialize engines during app startup
2. **Lazy Load**: Load heavy modules on-demand
3. **Cache Results**: Cache API responses and computations
4. **Handle Errors**: Always provide visual error feedback
5. **Monitor Performance**: Track module loading times
6. **Version Lock**: Use exact versions in production
7. **Test Integration**: Test modules in isolation and together
8. **Document Usage**: Document integration patterns in your codebase

## Related Documentation

- [DEVELOPER_MODULES.md](./DEVELOPER_MODULES.md) - Module development
- [CONTRIBUTING_MODULES.md](./CONTRIBUTING_MODULES.md) - Contributing guide
- [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md) - Publishing process
- [mbtq_architecture.html](./mbtq_architecture.html) - Platform architecture
