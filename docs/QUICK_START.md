# Developer Quick Start Guide

Get up and running with VR4Deaf Magician modules in minutes!

## 🚀 Quick Setup

### 1. Install a Module

```bash
# Install an engine module
npm install @vr4deaf/magician-engine-accessibility

# Or using pnpm
pnpm add @vr4deaf/magician-engine-accessibility
```

### 2. Import and Use

```typescript
import { AccessibilityEngine } from '@vr4deaf/magician-engine-accessibility';

// Initialize the engine
const engine = new AccessibilityEngine({
  visualFirst: true,
  aslSupport: true,
  highContrast: false
});

await engine.initialize();

// Use the engine
const result = await engine.process(yourData);
console.log(result);
```

### 3. Integrate with Next.js

```tsx
// app/layout.tsx
import { AccessibilityProvider } from '@vr4deaf/magician-engine-accessibility';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AccessibilityProvider
          config={{
            visualFirst: true,
            aslSupport: true
          }}
        >
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  );
}
```

## 📦 Available Modules

### Engines
- `@vr4deaf/magician-engine-accessibility` - Accessibility features (planned)
- `@vr4deaf/magician-engine-ai` - AI/ML capabilities (planned)
- `@vr4deaf/magician-engine-realtime` - Real-time features (planned)

### UI Kits
- `@vr4deaf/magician-ui-asl-navigation` - ASL navigation (planned)
- `@vr4deaf/magician-ui-accessibility` - Accessible components (planned)

### Agents
- `@vr4deaf/magician-agent-support` - Virtual support (planned)
- `@vr4deaf/magician-agent-career` - Career matching (planned)

## 🎨 Accessibility First

All modules are designed with Deaf-first principles:

```typescript
// Visual-first notifications
const notification = {
  message: "Action complete",
  visual: {
    icon: "✓",
    color: "green",
    animation: "fade-in"
  }
};

// High-contrast support
const theme = {
  mode: "high-contrast",
  colors: {
    text: "#000000",
    background: "#ffffff",
    accent: "#1a73e8"
  }
};

// ASL integration
const aslConfig = {
  enabled: true,
  interpreter: true,
  captions: true
};
```

## 🔧 Development Workflow

### Create a New Module

```bash
# 1. Copy the template
cp -r magician-modules/engines/.template magician-modules/engines/my-module
cd magician-modules/engines/my-module

# 2. Update package.json
# Change name, description, etc.

# 3. Install dependencies
pnpm install

# 4. Implement your module
# Edit src/module.ts

# 5. Write tests
# Edit tests/module.test.ts

# 6. Build and test
pnpm build
pnpm test

# 7. Document
# Update README.md and docs/API.md
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Build Module

```bash
# Build for production
pnpm build

# Build in development mode (watch)
pnpm dev
```

## 📚 Key Documentation

- **[Developer Modules Guide](./DEVELOPER_MODULES.md)** - Comprehensive module development
- **[Integration Guide](./INTEGRATION_GUIDE.md)** - Cross-stack integration patterns
- **[Contributing Guide](./CONTRIBUTING_MODULES.md)** - How to contribute
- **[Publishing Workflow](./PUBLISHING_WORKFLOW.md)** - Publishing your modules
- **[Branding & Licensing](./BRANDING_LICENSING.md)** - Licensing information
- **[MBTQ Architecture](./mbtq_architecture.html)** - Complete platform architecture

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/my-new-module
   ```
3. **Implement your module**
4. **Write tests** (minimum 80% coverage)
5. **Document thoroughly**
6. **Submit a pull request**

See [CONTRIBUTING_MODULES.md](./CONTRIBUTING_MODULES.md) for detailed guidelines.

## 💡 Examples

### Basic Engine Usage

```typescript
import { MagicianModule } from '@vr4deaf/magician-engine-example';

const module = new MagicianModule({
  visualFirst: true,
  aslSupport: true,
  debug: false
});

await module.initialize();

const result = await module.process({
  input: "test data"
});

if (result.success) {
  console.log("Success:", result.data);
  // Show visual feedback
  if (result.visualFeedback) {
    showNotification(result.visualFeedback);
  }
} else {
  console.error("Error:", result.error);
}
```

### React Component with Module

```tsx
'use client';

import { useState, useEffect } from 'react';
import { MagicianModule } from '@vr4deaf/magician-engine-example';

export function MyComponent() {
  const [module, setModule] = useState<MagicianModule | null>(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const initModule = async () => {
      const mod = new MagicianModule({
        visualFirst: true,
        aslSupport: true
      });
      await mod.initialize();
      setModule(mod);
    };

    initModule();

    return () => {
      module?.dispose();
    };
  }, []);

  const handleProcess = async () => {
    if (!module) return;
    const res = await module.process({ data: 'test' });
    setResult(res);
  };

  return (
    <div>
      <button onClick={handleProcess}>
        Process Data
      </button>
      {result && (
        <div className="visual-feedback">
          {result.visualFeedback?.icon} {result.visualFeedback?.message}
        </div>
      )}
    </div>
  );
}
```

### Python Backend Integration

```python
from vr4deaf.magician.engine.ai import AIEngine

# Initialize engine
engine = AIEngine(
    models=['career-matching'],
    visual_first=True
)

await engine.initialize()

# Process request
result = await engine.match_career({
    'skills': ['Python', 'AI', 'Accessibility'],
    'preferences': {'remote': True}
})

print(f"Matches found: {len(result['matches'])}")
```

## 🆘 Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/pinkycollie/VR4Deaf/issues)
- **GitHub Discussions**: [Ask questions or share ideas](https://github.com/pinkycollie/VR4Deaf/discussions)
- **Documentation**: Check our comprehensive docs in the `/docs` folder
- **Examples**: See working examples in module `examples/` directories

## 🎯 Next Steps

1. Explore the [MBTQ Architecture](./mbtq_architecture.html) to understand the platform
2. Read the [Developer Modules Guide](./DEVELOPER_MODULES.md) for in-depth information
3. Check out the [Integration Guide](./INTEGRATION_GUIDE.md) for integration patterns
4. Start building your first module using the [template](../magician-modules/engines/.template)
5. Join the community discussions and contribute!

---

**Built with ❤️ for the Deaf community**

*VR4Deaf Platform - Magician Modules Strategy*
