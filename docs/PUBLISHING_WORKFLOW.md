# Publishing Workflow

## Overview

This document outlines the complete workflow for publishing VR4Deaf Magician modules to npm registries, including open-source and premium/branded packages.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Open-Source Module Publishing](#open-source-module-publishing)
3. [Premium/Branded Module Publishing](#premium-branded-module-publishing)
4. [Version Management](#version-management)
5. [NPM Registry Configuration](#npm-registry-configuration)
6. [Continuous Integration](#continuous-integration)
7. [Post-Publishing Tasks](#post-publishing-tasks)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Accounts

1. **npm Account**: Create at https://www.npmjs.com/signup
2. **GitHub Account**: Access to pinkycollie/VR4Deaf repository
3. **npm Organization**: Access to @vr4deaf organization

### Required Tools

```bash
# Node.js and pnpm
node -v  # v16+
pnpm -v  # latest

# npm CLI
npm -v   # latest

# Git
git --version
```

### npm Authentication

```bash
# Login to npm
npm login

# Verify authentication
npm whoami

# Check organization access
npm org ls @vr4deaf
```

## Open-Source Module Publishing

### Step 1: Pre-Publishing Checklist

Before publishing, ensure:

- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation is complete
- [ ] LICENSE file exists (MIT)
- [ ] README.md is comprehensive
- [ ] package.json is properly configured
- [ ] Version number follows semver
- [ ] CHANGELOG.md is updated
- [ ] No security vulnerabilities (`npm audit`)

### Step 2: Prepare Module

```bash
# Navigate to module directory
cd magician-modules/engines/my-module

# Install dependencies
pnpm install

# Run tests
pnpm test

# Run linter
pnpm lint

# Build module
pnpm build

# Check package contents
npm pack --dry-run
```

### Step 3: Verify Package Configuration

**package.json essentials:**

```json
{
  "name": "@vr4deaf/magician-engine-mymodule",
  "version": "1.0.0",
  "description": "Clear description",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "vr4deaf",
    "deaf-first",
    "accessibility",
    "magician"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/pinkycollie/VR4Deaf.git",
    "directory": "magician-modules/engines/my-module"
  },
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "prepublishOnly": "pnpm build && pnpm test"
  }
}
```

### Step 4: Version Management

Follow semantic versioning (semver):

```bash
# Patch release (1.0.0 -> 1.0.1): Bug fixes
npm version patch

# Minor release (1.0.0 -> 1.1.0): New features, backward compatible
npm version minor

# Major release (1.0.0 -> 2.0.0): Breaking changes
npm version major

# Pre-release (1.0.0 -> 1.0.1-beta.0)
npm version prerelease --preid=beta
```

### Step 5: Update CHANGELOG

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-12-16

### Added
- Initial release
- Core accessibility engine functionality
- ASL support integration
- High-contrast mode
- Visual-first processing

### Changed
- N/A

### Fixed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Security
- N/A
```

### Step 6: Publish to npm

```bash
# Dry run (test without publishing)
npm publish --dry-run

# Publish to public npm registry
npm publish --access public

# Tag as latest
npm dist-tag add @vr4deaf/magician-engine-mymodule@1.0.0 latest
```

### Step 7: Verify Publication

```bash
# Check package on npm
npm view @vr4deaf/magician-engine-mymodule

# Install in test project
mkdir /tmp/test-install
cd /tmp/test-install
npm init -y
npm install @vr4deaf/magician-engine-mymodule

# Verify installation
node -e "console.log(require('@vr4deaf/magician-engine-mymodule'))"
```

### Step 8: Create Git Tag

```bash
# Create and push version tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create GitHub release
gh release create v1.0.0 \
  --title "v1.0.0" \
  --notes "$(cat CHANGELOG.md)"
```

## Premium/Branded Module Publishing

### Private Registry Setup

Premium modules are published to a private registry or scoped as private packages.

#### Option 1: Private npm Organization

```bash
# Configure private scope
npm config set @vr4deaf:registry https://registry.npmjs.org/
npm config set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

# package.json for private module
{
  "name": "@vr4deaf/magician-branded-mbtq-enterprise",
  "version": "1.0.0",
  "private": false,
  "publishConfig": {
    "access": "restricted"
  }
}

# Publish as restricted
npm publish --access restricted
```

#### Option 2: Private Registry (Verdaccio)

```bash
# Install Verdaccio
npm install -g verdaccio

# Start registry
verdaccio

# Configure npm to use private registry
npm config set @vr4deaf:registry http://localhost:4873/

# Publish to private registry
npm publish
```

### License Key Validation

Premium modules include license key validation:

```typescript
// src/license-validator.ts
export class LicenseValidator {
  private static readonly PUBLIC_KEY = process.env.VR4DEAF_PUBLIC_KEY;

  static async validate(licenseKey: string): Promise<boolean> {
    try {
      // Verify license signature
      const isValid = await this.verifySignature(licenseKey);
      
      // Check expiration
      const isNotExpired = await this.checkExpiration(licenseKey);
      
      return isValid && isNotExpired;
    } catch (error) {
      console.error('License validation failed:', error);
      return false;
    }
  }

  private static async verifySignature(key: string): Promise<boolean> {
    // Implement signature verification
    return true;
  }

  private static async checkExpiration(key: string): Promise<boolean> {
    // Check if license is expired
    return true;
  }
}

// src/index.ts
import { LicenseValidator } from './license-validator';

export class MagicianEnterprise {
  constructor(config: { license: string }) {
    if (!LicenseValidator.validate(config.license)) {
      throw new Error('Invalid or expired license');
    }
    // Initialize module
  }
}
```

### Publishing Premium Modules

```bash
# Set license environment variable
export VR4DEAF_PRIVATE_REGISTRY=https://registry.vr4deaf.com

# Build with license validation
pnpm build

# Test license validation
pnpm test:license

# Publish to private registry
npm publish --registry $VR4DEAF_PRIVATE_REGISTRY
```

## Version Management

### Semantic Versioning Strategy

**Format:** MAJOR.MINOR.PATCH

- **MAJOR**: Breaking changes
  - API changes
  - Removed features
  - Incompatible updates

- **MINOR**: New features, backward compatible
  - New functionality
  - Deprecations
  - Performance improvements

- **PATCH**: Bug fixes
  - Bug fixes
  - Security patches
  - Documentation updates

### Pre-release Versions

```bash
# Alpha: Internal testing
npm version 1.0.0-alpha.0

# Beta: Public testing
npm version 1.0.0-beta.0

# Release candidate
npm version 1.0.0-rc.0

# Publish pre-release
npm publish --tag beta
```

### Version Coordination

For modules with interdependencies:

```json
{
  "name": "@vr4deaf/magician-ui-asl-navigation",
  "version": "1.2.0",
  "peerDependencies": {
    "@vr4deaf/magician-engine-accessibility": "^1.0.0"
  }
}
```

### Deprecation Process

```bash
# Deprecate old version
npm deprecate @vr4deaf/magician-engine-old@"< 2.0.0" \
  "This version is deprecated. Please upgrade to 2.0.0+"

# Completely deprecate package
npm deprecate @vr4deaf/magician-engine-old \
  "Package deprecated. Use @vr4deaf/magician-engine-new instead"
```

## NPM Registry Configuration

### Organization Setup

```bash
# Create organization (first time)
npm org create @vr4deaf

# Add team members
npm team create @vr4deaf:developers
npm team add @vr4deaf:developers username

# Set package permissions
npm access grant read-write @vr4deaf:developers \
  @vr4deaf/magician-engine-accessibility
```

### Registry Authentication

```bash
# Set authentication token
npm config set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

# Or use .npmrc file
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc
```

### Scoped Registry Configuration

```bash
# Configure scope to use specific registry
npm config set @vr4deaf:registry https://registry.npmjs.org/

# For private modules
npm config set @vr4deaf-private:registry https://registry.vr4deaf.com/
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/publish.yml
name: Publish Magician Modules

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  publish:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Run linter
        run: pnpm lint
      
      - name: Build modules
        run: pnpm build
      
      - name: Publish to npm
        run: |
          cd magician-modules/engines/my-module
          npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            See CHANGELOG.md for details
          draft: false
          prerelease: false
```

### Automated Version Bump

```yaml
# .github/workflows/version-bump.yml
name: Version Bump

on:
  pull_request:
    types: [closed]
    branches:
      - main

jobs:
  bump:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Determine version bump
        id: version
        run: |
          if [[ "${{ github.event.pull_request.labels.*.name }}" =~ "breaking" ]]; then
            echo "bump=major" >> $GITHUB_OUTPUT
          elif [[ "${{ github.event.pull_request.labels.*.name }}" =~ "feature" ]]; then
            echo "bump=minor" >> $GITHUB_OUTPUT
          else
            echo "bump=patch" >> $GITHUB_OUTPUT
          fi
      
      - name: Bump version
        run: |
          cd magician-modules/engines/my-module
          npm version ${{ steps.version.outputs.bump }} --no-git-tag-version
      
      - name: Commit version bump
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git commit -am "chore: bump version [skip ci]"
          git push
```

### Quality Checks

```yaml
# .github/workflows/quality.yml
name: Quality Checks

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Type check
        run: pnpm type-check
      
      - name: Lint
        run: pnpm lint
      
      - name: Test with coverage
        run: pnpm test --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
      
      - name: Security audit
        run: npm audit --audit-level=moderate
      
      - name: Check bundle size
        run: |
          pnpm build
          npx size-limit
```

## Post-Publishing Tasks

### Documentation Updates

1. **Update main README**
   ```markdown
   ## Available Modules
   
   ### Engines
   - [@vr4deaf/magician-engine-accessibility](./magician-modules/engines/accessibility) - v1.0.0
   - [@vr4deaf/magician-engine-ai](./magician-modules/engines/ai) - v1.2.0
   ```

2. **Update documentation website**
   - Add module to documentation
   - Update API references
   - Add integration examples

3. **Announce release**
   - GitHub Discussions
   - Social media
   - Developer newsletter

### npm Package Metadata

```bash
# Add/update package tags
npm dist-tag add @vr4deaf/magician-engine-accessibility@1.0.0 latest
npm dist-tag add @vr4deaf/magician-engine-accessibility@1.0.0 stable

# Update package README on npm
# (npm automatically uses README.md from package)
```

### Monitor Package

```bash
# Check download stats
npm info @vr4deaf/magician-engine-accessibility

# Monitor issues
# Watch GitHub issues and npm feedback
```

## Troubleshooting

### Common Publishing Errors

#### Error: 403 Forbidden

```bash
# Solution: Check authentication
npm whoami
npm login

# Verify organization access
npm org ls @vr4deaf
```

#### Error: Package already exists

```bash
# Solution: Bump version
npm version patch
npm publish
```

#### Error: ENOENT package.json

```bash
# Solution: Ensure you're in module directory
cd magician-modules/engines/my-module
npm publish
```

#### Error: Missing files

```bash
# Solution: Check files field in package.json
{
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}

# Or use .npmignore to exclude unwanted files
```

### Build Issues

```bash
# Clean build
rm -rf dist node_modules
pnpm install
pnpm build

# Check TypeScript compilation
pnpm tsc --noEmit
```

### Version Conflicts

```bash
# Check published versions
npm view @vr4deaf/magician-engine-accessibility versions

# Force version (not recommended)
npm version 1.0.1 --force
```

### Registry Issues

```bash
# Check registry configuration
npm config get registry

# Reset to default
npm config set registry https://registry.npmjs.org/

# Clear cache
npm cache clean --force
```

## Best Practices

1. **Always test before publishing**
   - Run full test suite
   - Test in clean environment
   - Verify package contents

2. **Use semantic versioning strictly**
   - Follow semver guidelines
   - Document breaking changes
   - Communicate deprecations

3. **Maintain CHANGELOG**
   - Update before each release
   - Be clear and concise
   - Follow Keep a Changelog format

4. **Automate when possible**
   - Use CI/CD pipelines
   - Automated testing
   - Automated versioning

5. **Monitor published packages**
   - Watch for issues
   - Monitor downloads
   - Respond to feedback

6. **Security first**
   - Run security audits
   - Update dependencies
   - Validate licenses

## Related Documentation

- [DEVELOPER_MODULES.md](./DEVELOPER_MODULES.md) - Module development
- [BRANDING_LICENSING.md](./BRANDING_LICENSING.md) - Licensing guidelines
- [CONTRIBUTING_MODULES.md](./CONTRIBUTING_MODULES.md) - Contributing guide
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Integration patterns
