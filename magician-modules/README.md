# Magician Modules

This directory contains developer-facing modules for the VR4Deaf platform, organized under the `@vr4deaf/magician-*` namespace. These modules provide reusable components, engines, agents, and branded solutions for building Deaf-first applications.

## Directory Structure

```
magician-modules/
├── engines/          # Core processing engines (AI, accessibility, real-time)
├── ui-kits/         # Reusable UI component libraries
├── agents/          # AI agents and automation modules
└── branded/         # Magician/MBTQ branded proprietary modules
```

## Module Categories

### Engines (`engines/`)
Core processing engines that power the VR4Deaf platform:
- **Accessibility Engine**: ASL integration, captioning, visual-first processing
- **AI/ML Engine**: Career matching, skills assessment, recommendation systems
- **Real-time Engine**: Collaboration, notifications, live updates

### UI Kits (`ui-kits/`)
Reusable component libraries with Deaf-first design:
- **ASL Navigation Kit**: Visual-first navigation components
- **Accessibility Components**: High-contrast, visual-first UI elements
- **Communication Kit**: Captioning, visual notifications, feedback systems

### Agents (`agents/`)
AI-powered automation and assistance modules:
- **Virtual Support Agent**: 24/7 automated assistance
- **Career Matching Agent**: Skills assessment and job matching
- **Learning Assistant**: Adaptive learning and guidance

### Branded (`branded/`)
Magician/MBTQ branded proprietary solutions:
- Premium features and integrations
- Enterprise-level modules
- Custom business logic components

## Getting Started

See [DEVELOPER_MODULES.md](../docs/DEVELOPER_MODULES.md) for detailed documentation on:
- Creating new modules
- Publishing workflow
- Integration patterns
- Best practices

## Module Naming Convention

All modules follow the `@vr4deaf/magician-{category}-{name}` pattern:
- `@vr4deaf/magician-engine-accessibility`
- `@vr4deaf/magician-ui-asl-navigation`
- `@vr4deaf/magician-agent-career-matching`
- `@vr4deaf/magician-branded-enterprise`

## License

Modules are licensed individually:
- Open-source modules: MIT License
- Premium/Branded modules: Proprietary License (see individual module LICENSE files)

For licensing details, see [BRANDING_LICENSING.md](../docs/BRANDING_LICENSING.md)
