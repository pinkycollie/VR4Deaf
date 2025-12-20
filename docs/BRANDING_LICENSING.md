# Branding & Licensing Guide

## Overview

The VR4Deaf platform implements a dual licensing strategy that balances open-source community development with proprietary enterprise features. This document outlines the branding guidelines and licensing structure for all modules in the `@vr4deaf/magician-*` namespace.

## Licensing Structure

### MIT Licensed Modules (Open Source)

**Applies to:**
- Core engines (accessibility, real-time communication)
- UI component kits
- Community-contributed modules
- Developer tools and utilities

**License Text:**
```
MIT License

Copyright (c) 2024 VR4Deaf / MBTQ Universe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Usage:**
- Free to use, modify, and distribute
- Must include copyright notice
- No warranty provided
- Commercial use permitted

### Proprietary Licensed Modules (Premium/Branded)

**Applies to:**
- Magician-branded enterprise modules
- MBTQ-branded premium features
- Advanced analytics and reporting
- Custom integrations
- Priority support packages

**License Model:**
- Subscription-based licensing
- Per-seat or per-organization pricing
- Custom enterprise agreements available
- Source code available under NDA

**Restrictions:**
- No redistribution without written permission
- No modification without license agreement
- No reverse engineering
- Limited to licensed users/organizations

## Branding Guidelines

### VR4Deaf Brand

**Logo Usage:**
- Primary logo for platform identification
- Use in all platform-wide communications
- High-contrast versions for accessibility
- ASL-friendly visual identity

**Color Palette:**
```css
:root {
  --vr4deaf-primary: #1a73e8;      /* Accessible blue */
  --vr4deaf-secondary: #34a853;    /* Success green */
  --vr4deaf-accent: #fbbc04;       /* Warning yellow */
  --vr4deaf-text: #202124;         /* High contrast text */
  --vr4deaf-bg: #ffffff;           /* Clean background */
  --vr4deaf-contrast: #000000;     /* Maximum contrast */
}
```

**Typography:**
- Sans-serif fonts for clarity
- Minimum 16px base font size
- 1.5 line height for readability
- Support for icon-based communication

### Magician Brand

**Purpose:**
Represents the AI-powered, intelligent automation features of the platform.

**Usage:**
- AI and ML modules: `@vr4deaf/magician-engine-ai`
- Intelligent agents: `@vr4deaf/magician-agent-*`
- Automation tools: `@vr4deaf/magician-automation-*`

**Brand Identity:**
- Mystical, intelligent, helpful
- Visual metaphors: stars, wands, sparkles
- Color: Deep purple (#6a1b9a) with gold accents (#ffd700)

**Logo Elements:**
```
✨ Magician by VR4Deaf
```

### MBTQ Brand

**Purpose:**
Represents premium, enterprise-grade features and business intelligence.

**Usage:**
- Enterprise modules: `@vr4deaf/magician-branded-mbtq-*`
- Premium analytics
- Custom integrations
- Business intelligence tools

**Brand Identity:**
- Professional, reliable, powerful
- Visual metaphors: shields, checkmarks, locks
- Color: Navy blue (#0d47a1) with silver accents (#9e9e9e)

**Logo Elements:**
```
🛡️ MBTQ Universe
```

## Module Naming Conventions

### Open Source Modules

Format: `@vr4deaf/magician-{category}-{name}`

**Examples:**
```
@vr4deaf/magician-engine-accessibility
@vr4deaf/magician-engine-realtime
@vr4deaf/magician-ui-asl-navigation
@vr4deaf/magician-ui-accessibility
@vr4deaf/magician-agent-support
@vr4deaf/magician-agent-career
```

**Naming Rules:**
- All lowercase
- Hyphen-separated words
- Clear, descriptive names
- No abbreviations unless widely recognized

### Premium/Branded Modules

Format: `@vr4deaf/magician-branded-{brand}-{name}`

**Examples:**
```
@vr4deaf/magician-branded-mbtq-enterprise
@vr4deaf/magician-branded-mbtq-analytics
@vr4deaf/magician-branded-magician-premium
```

**Access Control:**
- Private npm registry or organization
- License key validation
- User/organization authentication

## Package Metadata Standards

### Required Fields

All modules must include:

```json
{
  "name": "@vr4deaf/magician-engine-example",
  "version": "1.0.0",
  "description": "Clear description of module purpose",
  "license": "MIT",
  "author": "VR4Deaf Team <contact@vr4deaf.org>",
  "homepage": "https://github.com/pinkycollie/VR4Deaf",
  "repository": {
    "type": "git",
    "url": "https://github.com/pinkycollie/VR4Deaf.git",
    "directory": "magician-modules/engines/example"
  },
  "bugs": {
    "url": "https://github.com/pinkycollie/VR4Deaf/issues"
  },
  "keywords": [
    "vr4deaf",
    "deaf-first",
    "accessibility",
    "asl",
    "magician"
  ]
}
```

### Optional but Recommended Fields

```json
{
  "funding": {
    "type": "opencollective",
    "url": "https://opencollective.com/vr4deaf"
  },
  "contributors": [
    {
      "name": "Contributor Name",
      "email": "contributor@example.com"
    }
  ],
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}
```

## README Standards

Every module must include a comprehensive README.md:

### Required Sections

1. **Title and Badges**
   ```markdown
   # @vr4deaf/magician-engine-example
   
   [![npm version](https://badge.fury.io/js/@vr4deaf%2Fmagician-engine-example.svg)]()
   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()
   [![Accessibility](https://img.shields.io/badge/Deaf--First-✓-green.svg)]()
   ```

2. **Description**
   - What the module does
   - Who should use it
   - Key features

3. **Installation**
   ```bash
   npm install @vr4deaf/magician-engine-example
   # or
   pnpm add @vr4deaf/magician-engine-example
   ```

4. **Quick Start**
   - Minimal working example
   - Import statements
   - Basic configuration

5. **API Documentation**
   - All public methods
   - Configuration options
   - Type definitions

6. **Examples**
   - Common use cases
   - Integration patterns
   - Best practices

7. **Accessibility Notes**
   - Deaf-first features
   - Visual-first design
   - ASL support details

8. **Contributing**
   - Link to CONTRIBUTING_MODULES.md
   - Development setup
   - Testing instructions

9. **License**
   - License type (MIT or Proprietary)
   - Copyright information

10. **Support**
    - Issue reporting
    - Discussion forums
    - Contact information

## Copyright and Attribution

### Open Source Modules

**Copyright Holder:** VR4Deaf / MBTQ Universe

**Attribution Requirements:**
- Include copyright notice in LICENSE file
- Maintain attribution in source code headers
- Credit original authors in CONTRIBUTORS file

**Source Code Headers:**
```typescript
/**
 * @vr4deaf/magician-engine-example
 * Copyright (c) 2024 VR4Deaf / MBTQ Universe
 * Licensed under MIT License
 * 
 * Part of the VR4Deaf Deaf-First Platform
 * https://github.com/pinkycollie/VR4Deaf
 */
```

### Proprietary Modules

**Copyright Holder:** MBTQ Universe LLC

**Attribution Requirements:**
- Proprietary license file included
- Copyright notices in all files
- License key validation in code

**Source Code Headers:**
```typescript
/**
 * @vr4deaf/magician-branded-mbtq-enterprise
 * Copyright (c) 2024 MBTQ Universe LLC
 * All Rights Reserved. Proprietary and Confidential.
 * 
 * This software is licensed to authorized users only.
 * Unauthorized use, distribution, or modification is prohibited.
 */
```

## Third-Party Dependencies

### License Compatibility

**Compatible with MIT:**
- MIT License
- Apache 2.0
- BSD (2-clause, 3-clause)
- ISC

**Review Required:**
- GPL (copyleft implications)
- LGPL (linking restrictions)
- Custom licenses

**Not Permitted:**
- Unlicensed code
- Code with unknown licensing
- Proprietary dependencies in open-source modules

### Dependency Auditing

Run regular license audits:

```bash
# Check all dependencies
npx license-checker --summary

# Generate detailed report
npx license-checker --json > licenses.json
```

## Publishing Process

### Open Source Module Publishing

1. **Verify License**
   - Ensure LICENSE file is present
   - Verify all dependencies are compatible
   - Check copyright notices

2. **Update Version**
   ```bash
   npm version patch|minor|major
   ```

3. **Build and Test**
   ```bash
   npm run build
   npm test
   npm run lint
   ```

4. **Publish to npm**
   ```bash
   npm publish --access public
   ```

### Premium Module Publishing

1. **Verify License**
   - Ensure proprietary license is present
   - Update license keys system
   - Verify access controls

2. **Private Registry**
   ```bash
   npm publish --registry https://registry.vr4deaf.org
   ```

3. **Documentation**
   - Update enterprise documentation
   - Notify license holders
   - Update pricing information

## Brand Usage Guidelines

### Do's ✓

- Use VR4Deaf brand for platform identification
- Use Magician brand for AI/automation features
- Use MBTQ brand for enterprise features
- Maintain consistent visual identity
- Follow accessibility guidelines
- Credit contributors appropriately

### Don'ts ✗

- Don't modify brand logos
- Don't use brands for competing products
- Don't imply false endorsement
- Don't use trademarked names without permission
- Don't violate accessibility standards
- Don't misrepresent licensing terms

## Trademark Policy

### Registered Marks

- **VR4Deaf™** - Platform name and logo
- **Magician by VR4Deaf™** - AI/automation brand
- **MBTQ Universe™** - Enterprise brand

**Usage:**
- Requires written permission for commercial use
- Permitted for community contributions
- Must maintain trademark notices
- Cannot imply false affiliation

## Compliance and Enforcement

### License Violations

**Reporting:**
- Email: legal@vr4deaf.org
- Include: module name, violation type, evidence

**Consequences:**
- Immediate removal from npm registry
- Revocation of publishing rights
- Legal action if necessary

### Community Standards

**Expected Behavior:**
- Respect licensing terms
- Provide proper attribution
- Follow branding guidelines
- Maintain accessibility standards
- Support Deaf-first principles

## Contact Information

**General Inquiries:**
- Email: contact@vr4deaf.org
- GitHub: https://github.com/pinkycollie/VR4Deaf

**Legal/Licensing:**
- Email: legal@vr4deaf.org

**Enterprise Licensing:**
- Email: enterprise@mbtquniverse.com
- Website: https://mbtquniverse.com

**Community Support:**
- Discussions: https://github.com/pinkycollie/VR4Deaf/discussions
- Issues: https://github.com/pinkycollie/VR4Deaf/issues

## Related Documentation

- [DEVELOPER_MODULES.md](./DEVELOPER_MODULES.md) - Module development guide
- [CONTRIBUTING_MODULES.md](./CONTRIBUTING_MODULES.md) - Contribution guidelines
- [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md) - Publishing process
- [mbtq_architecture.html](./mbtq_architecture.html) - Platform architecture
