# Contributing to VR4DEAF

Thank you for your interest in contributing to the VR4DEAF platform! This project is dedicated to creating accessible, Deaf-first vocational rehabilitation and workforce solutions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Migration Guidelines](#migration-guidelines)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Getting Help](#getting-help)

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. We expect:

- Respectful and professional communication
- Focus on accessibility and Deaf-first design principles
- Constructive feedback and collaboration
- Recognition that this platform serves the Deaf community first and foremost

## How to Contribute

### Reporting Issues

1. Check existing issues to avoid duplicates
2. Use the appropriate issue template
3. Provide clear reproduction steps
4. Include relevant screenshots or videos (especially for UI/accessibility issues)

### Proposing Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Submit a pull request with a clear description

### Migration Contributions

During the repository migration period, please:

1. Review the `MIGRATION_PLAN.md` before making major changes
2. Check for related migration issues
3. Coordinate with the migration team to avoid conflicts
4. Tag PRs with the `migration` label if they affect migration work

## Development Workflow

### Setup

```bash
# Clone the repository
git clone https://github.com/pinkycollie/VR4Deaf.git
cd VR4Deaf

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `migration/` - Migration-related work
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add ASL video player component
fix: correct keyboard navigation in dashboard
docs: update API documentation
migration: integrate backend auth service
```

## Migration Guidelines

### For Migration Work

If you're contributing to the repository migration:

1. **Read the Migration Plan**: Review `MIGRATION_PLAN.md` thoroughly
2. **Check Phase Status**: Verify which phase is currently active
3. **Use Issue Templates**: Create sub-issues using the phase templates in `.github/ISSUE_TEMPLATE/`
4. **Preserve History**: When migrating code, preserve git history where possible
5. **Document Changes**: Update migration documentation as you go
6. **Maintain Branding**: Preserve MIT/Magician/MBTQ attribution

### Migration Checklist for Code

When migrating code from other repositories:

- [ ] Preserve git history (use `git subtree` or similar)
- [ ] Update import paths
- [ ] Update package.json metadata
- [ ] Add migration notes to commit message
- [ ] Update relevant documentation
- [ ] Test thoroughly in new location
- [ ] Update `REPOSITORY_AUDIT.md` if needed

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow existing code style (enforced by ESLint)
- Use meaningful variable and function names
- Prefer functional components in React
- Use hooks appropriately

### Accessibility

This is critical for VR4DEAF:

- All UI must be keyboard navigable
- Provide appropriate ARIA labels
- Maintain high color contrast ratios
- Support screen readers
- Design with visual-first communication in mind
- Consider ASL users in all UX decisions

### React/Next.js

- Use Next.js App Router conventions
- Keep components focused and single-purpose
- Use Tailwind CSS for styling
- Follow component structure in `components/`
- Use Radix UI primitives for accessibility

### Python (Backend)

- Follow PEP 8 style guide
- Use type hints
- Document functions with docstrings
- Keep functions focused and testable

## Testing Requirements

### Frontend Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- All new features should include tests
- Maintain or improve existing coverage
- Focus on critical user paths
- Test accessibility features thoroughly

### Test Types

- **Unit Tests**: Individual components and functions
- **Integration Tests**: Component interactions
- **E2E Tests**: Critical user workflows
- **Accessibility Tests**: WCAG compliance

## Documentation

### Code Documentation

- Document complex logic with comments
- Use JSDoc/TSDoc for functions and components
- Keep comments up-to-date with code changes

### Project Documentation

When adding features:

1. Update relevant README sections
2. Add API documentation if applicable
3. Update architecture docs if needed
4. Add examples and usage instructions

### Migration Documentation

When working on migration:

1. Update `MIGRATION_PLAN.md` status
2. Document any deviations from plan
3. Record migration decisions
4. Update audit documents

## Pull Request Process

1. **Before Submitting**:
   - Run linter: `npm run lint`
   - Run tests: `npm test`
   - Update documentation
   - Test locally

2. **PR Description**:
   - Clear title describing the change
   - Reference related issues
   - List testing performed
   - Note any breaking changes
   - Include screenshots for UI changes

3. **Review Process**:
   - Address reviewer feedback
   - Keep PR scope focused
   - Respond to comments promptly
   - Request re-review after changes

4. **Merging**:
   - PRs require approval from maintainers
   - All CI checks must pass
   - Resolve merge conflicts
   - Squash commits if requested

## Getting Help

### Resources

- **Documentation**: Check `docs/` directory
- **Architecture**: See `docs/architecture/`
- **Migration**: See `MIGRATION_PLAN.md`
- **Issues**: Browse existing GitHub issues

### Communication

- **GitHub Issues**: For bugs and feature requests
- **Pull Requests**: For code discussions
- **Discussions**: For general questions and ideas

### Migration Questions

For migration-specific questions:

1. Check `MIGRATION_PLAN.md` first
2. Review migration phase issues
3. Create a new issue with `migration` and `question` labels

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Project documentation
- Release notes

Special recognition for:

- Accessibility improvements
- Migration efforts
- Documentation enhancements
- Community support

## License

By contributing to VR4DEAF, you agree that your contributions will be licensed under the MIT License. See the `LICENSE` file for details.

Your contributions should maintain the Magician/MBTQ provenance and attribution as outlined in the license.

---

Thank you for contributing to VR4DEAF and supporting the Deaf community! 🤟
