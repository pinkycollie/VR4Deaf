# Contributing to Magician Modules

Thank you for your interest in contributing to the VR4Deaf Magician modules! This guide will help you understand how to create, submit, and maintain modules that align with our Deaf-first mission and technical standards.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Module Creation Process](#module-creation-process)
4. [Code Standards](#code-standards)
5. [Testing Requirements](#testing-requirements)
6. [Documentation Requirements](#documentation-requirements)
7. [Submission Process](#submission-process)
8. [Review Process](#review-process)
9. [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 16+ and pnpm installed
- Git configured with your GitHub account
- Understanding of TypeScript and React
- Familiarity with accessibility principles
- Commitment to Deaf-first design

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/VR4Deaf.git
cd VR4Deaf

# Add upstream remote
git remote add upstream https://github.com/pinkycollie/VR4Deaf.git

# Install dependencies
pnpm install
```

## Development Environment

### Initial Setup

```bash
# Install all dependencies
pnpm install

# Build all modules
pnpm build

# Run tests
pnpm test

# Start development mode
pnpm dev
```

### IDE Configuration

**Recommended: Visual Studio Code**

Install these extensions:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Error Lens
- GitLens

**VS Code Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.tabSize": 2
}
```

## Module Creation Process

### Step 1: Plan Your Module

Before writing code, consider:

1. **Purpose**: What problem does this module solve?
2. **Scope**: Is it focused on a single responsibility?
3. **Category**: Is it an engine, UI kit, agent, or branded module?
4. **Accessibility**: How does it support Deaf users?
5. **Dependencies**: What are the minimal dependencies needed?

**Create an issue first** to discuss your module idea with maintainers.

### Step 2: Create Module Structure

```bash
# Navigate to appropriate category
cd magician-modules/engines  # or ui-kits, agents, branded

# Create module directory
mkdir my-module
cd my-module

# Initialize package
pnpm init

# Create standard structure
mkdir -p src tests docs examples
touch src/index.ts tests/index.test.ts README.md
```

### Step 3: Configure package.json

```json
{
  "name": "@vr4deaf/magician-engine-mymodule",
  "version": "0.1.0",
  "description": "Brief description of what this module does",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "prepublishOnly": "pnpm build && pnpm test"
  },
  "keywords": [
    "vr4deaf",
    "deaf-first",
    "accessibility",
    "magician"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/pinkycollie/VR4Deaf.git",
    "directory": "magician-modules/engines/my-module"
  },
  "bugs": {
    "url": "https://github.com/pinkycollie/VR4Deaf/issues"
  },
  "homepage": "https://github.com/pinkycollie/VR4Deaf/tree/main/magician-modules/engines/my-module",
  "peerDependencies": {
    "react": "^19",
    "typescript": "^5"
  },
  "devDependencies": {
    "@types/node": "^22",
    "typescript": "^5",
    "vitest": "^4.0.14"
  }
}
```

### Step 4: Create TypeScript Configuration

```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### Step 5: Implement Module

```typescript
// src/index.ts
export { MyModule } from './module';
export type { MyModuleConfig, MyModuleOptions } from './types';

// src/types.ts
export interface MyModuleConfig {
  // Configuration options
  visualFirst?: boolean;
  aslSupport?: boolean;
  highContrast?: boolean;
}

export interface MyModuleOptions {
  // Runtime options
}

// src/module.ts
import { MyModuleConfig } from './types';

export class MyModule {
  private config: MyModuleConfig;

  constructor(config: MyModuleConfig = {}) {
    this.config = {
      visualFirst: true,
      aslSupport: true,
      highContrast: false,
      ...config
    };
  }

  async initialize(): Promise<void> {
    // Initialization logic
  }

  // Public methods
}
```

## Code Standards

### TypeScript Guidelines

1. **Strict Mode**: Always use strict TypeScript
   ```typescript
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

2. **Type Safety**: Avoid `any`, use proper types
   ```typescript
   // ❌ Bad
   function process(data: any): any {
     return data.value;
   }

   // ✓ Good
   interface InputData {
     value: string;
   }
   function process(data: InputData): string {
     return data.value;
   }
   ```

3. **Export Types**: Always export public interfaces
   ```typescript
   export interface PublicConfig {
     // ...
   }

   export type PublicOptions = {
     // ...
   };
   ```

### Accessibility Standards

1. **Visual First**: All features must work without audio
   ```typescript
   // ✓ Good: Provides visual alternative
   const notification = {
     message: "Update complete",
     visual: {
       icon: "✓",
       color: "green",
       animation: "fade-in"
     }
   };
   ```

2. **High Contrast Support**: Colors must have sufficient contrast
   ```typescript
   const colors = {
     text: '#202124',      // WCAG AAA compliant
     background: '#ffffff',
     accent: '#1a73e8'     // 7:1 contrast ratio
   };
   ```

3. **Keyboard Navigation**: All interactions must be keyboard accessible
   ```typescript
   // UI components must handle keyboard events
   function handleKeyDown(event: KeyboardEvent) {
     if (event.key === 'Enter' || event.key === ' ') {
       // Activate
     }
   }
   ```

4. **ARIA Labels**: Provide meaningful labels
   ```tsx
   <button aria-label="Submit application">
     <Icon name="send" />
   </button>
   ```

### Code Style

Follow the project's ESLint configuration:

```typescript
// ✓ Good: Clear, documented, accessible
/**
 * Processes user input with visual feedback
 * @param input - User input data
 * @param options - Processing options including visual mode
 * @returns Processed result with visual indicators
 */
export async function processInput(
  input: InputData,
  options: ProcessOptions
): Promise<ProcessedResult> {
  // Implementation
}
```

**Style Rules:**
- Use 2 spaces for indentation
- Use single quotes for strings
- Always use semicolons
- No trailing commas in objects
- Descriptive variable names
- Document public APIs with JSDoc

## Testing Requirements

### Minimum Coverage

All modules must maintain **minimum 80% code coverage**.

### Test Structure

```typescript
// tests/module.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { MyModule } from '../src/module';

describe('MyModule', () => {
  let module: MyModule;

  beforeEach(() => {
    module = new MyModule({
      visualFirst: true
    });
  });

  describe('initialization', () => {
    it('should initialize with default config', async () => {
      await module.initialize();
      expect(module).toBeDefined();
    });

    it('should apply custom config', () => {
      const customModule = new MyModule({
        visualFirst: false
      });
      expect(customModule).toBeDefined();
    });
  });

  describe('accessibility', () => {
    it('should support visual-first mode', () => {
      expect(module.config.visualFirst).toBe(true);
    });

    it('should support ASL integration', () => {
      expect(module.config.aslSupport).toBe(true);
    });

    it('should provide high contrast option', () => {
      const hcModule = new MyModule({
        highContrast: true
      });
      expect(hcModule.config.highContrast).toBe(true);
    });
  });

  describe('functionality', () => {
    it('should process input correctly', async () => {
      const result = await module.process({ data: 'test' });
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it('should handle errors gracefully', async () => {
      const result = await module.process({ invalid: true });
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test --coverage

# Run specific test file
pnpm test tests/module.test.ts
```

### Accessibility Testing

Include tests for accessibility features:

```typescript
describe('Accessibility Features', () => {
  it('should work without audio', () => {
    // Test that all features function without sound
  });

  it('should support keyboard navigation', () => {
    // Test keyboard interactions
  });

  it('should provide visual feedback', () => {
    // Test visual indicators
  });

  it('should support high contrast mode', () => {
    // Test contrast ratios
  });
});
```

## Documentation Requirements

### README.md Template

Every module must have a comprehensive README:

```markdown
# @vr4deaf/magician-engine-mymodule

[![npm version](https://badge.fury.io/js/@vr4deaf%2Fmagician-engine-mymodule.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()
[![Deaf-First](https://img.shields.io/badge/Deaf--First-✓-green.svg)]()

Brief description of what this module does and who should use it.

## Features

- ✨ Key feature 1
- 🎯 Key feature 2
- ♿ Fully accessible and Deaf-first
- 🚀 High performance

## Installation

\`\`\`bash
npm install @vr4deaf/magician-engine-mymodule
# or
pnpm add @vr4deaf/magician-engine-mymodule
\`\`\`

## Quick Start

\`\`\`typescript
import { MyModule } from '@vr4deaf/magician-engine-mymodule';

const module = new MyModule({
  visualFirst: true,
  aslSupport: true
});

await module.initialize();
const result = await module.process(data);
\`\`\`

## API Documentation

### MyModule

#### Constructor

\`\`\`typescript
new MyModule(config?: MyModuleConfig)
\`\`\`

#### Methods

##### initialize()

Initializes the module.

##### process(data)

Processes input data.

## Accessibility Features

- 👁️ **Visual First**: All features work without audio
- 🖐️ **ASL Support**: Integrated ASL interpretation
- 🎨 **High Contrast**: WCAG AAA compliant colors
- ⌨️ **Keyboard Navigation**: Full keyboard accessibility

## Examples

See [examples/](./examples) directory for detailed examples.

## Contributing

See [CONTRIBUTING_MODULES.md](../../../docs/CONTRIBUTING_MODULES.md)

## License

MIT License - see [LICENSE](./LICENSE)

## Support

- Issues: https://github.com/pinkycollie/VR4Deaf/issues
- Discussions: https://github.com/pinkycollie/VR4Deaf/discussions
\`\`\`

### API Documentation

Create `docs/API.md` with detailed API documentation:

```markdown
# API Documentation

## Classes

### MyModule

...

## Interfaces

### MyModuleConfig

...

## Types

...

## Functions

...
```

### Examples

Create working examples in `examples/` directory:

```typescript
// examples/basic-usage.ts
import { MyModule } from '@vr4deaf/magician-engine-mymodule';

async function basicExample() {
  const module = new MyModule();
  await module.initialize();
  // ...
}

basicExample();
```

## Submission Process

### Step 1: Create Feature Branch

```bash
# Update your fork
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/magician-module-mymodule
```

### Step 2: Commit Changes

```bash
# Stage your changes
git add magician-modules/engines/my-module

# Commit with descriptive message
git commit -m "feat: add MyModule engine for [purpose]

- Implemented core functionality
- Added comprehensive tests (85% coverage)
- Documented API and examples
- Ensured Deaf-first accessibility

Resolves #[issue-number]"
```

### Step 3: Push and Create PR

```bash
# Push to your fork
git push origin feature/magician-module-mymodule

# Create Pull Request on GitHub
# Use the PR template and fill in all sections
```

### PR Template

Your PR should include:

```markdown
## Description

Brief description of the module and its purpose.

## Type of Change

- [ ] New module
- [ ] Bug fix
- [ ] Enhancement
- [ ] Documentation

## Module Category

- [ ] Engine
- [ ] UI Kit
- [ ] Agent
- [ ] Branded

## Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added with >80% coverage
- [ ] Documentation complete (README, API docs, examples)
- [ ] All tests pass
- [ ] Accessibility standards met
- [ ] No security vulnerabilities introduced
- [ ] License file included (MIT)
- [ ] CHANGELOG updated

## Accessibility

Describe how this module supports Deaf-first design:

- [ ] Works without audio
- [ ] Visual-first interface
- [ ] High contrast support
- [ ] Keyboard accessible
- [ ] ASL integration (if applicable)

## Testing

Describe testing performed:
- Unit tests: [coverage %]
- Integration tests: [description]
- Accessibility testing: [details]

## Screenshots/Examples

Include screenshots or examples demonstrating the module.

## Related Issues

Closes #[issue-number]

## Additional Notes

Any additional information reviewers should know.
```

## Review Process

### What Reviewers Look For

1. **Code Quality**
   - Follows TypeScript best practices
   - Proper error handling
   - Clear variable/function names
   - Adequate comments where needed

2. **Testing**
   - Minimum 80% coverage
   - Tests cover edge cases
   - Accessibility tests included
   - All tests passing

3. **Documentation**
   - README is comprehensive
   - API documented with examples
   - Installation instructions clear
   - Accessibility features explained

4. **Accessibility**
   - Visual-first design
   - WCAG AAA compliance
   - Keyboard navigation
   - ASL support (where applicable)

5. **License Compliance**
   - Correct license file
   - Compatible dependencies
   - Proper attribution

### Addressing Feedback

- Respond to all review comments
- Make requested changes promptly
- Ask for clarification if needed
- Be open to suggestions

### Approval and Merge

Once approved:
1. Maintainer will merge your PR
2. Module will be published to npm
3. Documentation will be updated
4. You'll be added to CONTRIBUTORS

## Community Guidelines

### Code of Conduct

1. **Be Respectful**: Treat everyone with respect
2. **Be Inclusive**: Welcome contributors of all backgrounds
3. **Be Constructive**: Provide helpful feedback
4. **Be Patient**: Remember we're all learning
5. **Deaf-First**: Prioritize accessibility always

### Communication

- Use GitHub Issues for bugs and features
- Use GitHub Discussions for questions
- Be clear and descriptive
- Include examples when possible
- Use visual aids (screenshots, diagrams)

### Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Module package.json
- Release notes
- Project documentation

## Getting Help

**Questions?**
- GitHub Discussions: https://github.com/pinkycollie/VR4Deaf/discussions
- Issues: https://github.com/pinkycollie/VR4Deaf/issues

**Need Guidance?**
- Tag maintainers in issues
- Join community discussions
- Review existing modules

## Related Documentation

- [DEVELOPER_MODULES.md](./DEVELOPER_MODULES.md) - Module development guide
- [BRANDING_LICENSING.md](./BRANDING_LICENSING.md) - Licensing guidelines
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Integration patterns
- [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md) - Publishing process

---

Thank you for contributing to VR4Deaf! Together we're building a more accessible world for the Deaf community. 🤟
