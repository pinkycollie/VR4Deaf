# Module Template

This template provides a starting point for creating new Magician modules.

## Usage

1. Copy this template directory to the appropriate category:
   ```bash
   cp -r magician-modules/engines/.template magician-modules/engines/my-module
   cd magician-modules/engines/my-module
   ```

2. Update `package.json` with your module details

3. Implement your module in `src/`

4. Add tests in `tests/`

5. Document in `README.md` and `docs/API.md`

6. Follow the guidelines in [CONTRIBUTING_MODULES.md](../../../docs/CONTRIBUTING_MODULES.md)

## Structure

```
.template/
├── src/
│   ├── index.ts          # Main entry point
│   ├── module.ts         # Core module implementation
│   ├── types.ts          # TypeScript type definitions
│   └── utils/            # Utility functions
├── tests/
│   └── module.test.ts    # Unit tests
├── docs/
│   └── API.md            # API documentation
├── examples/
│   └── basic.ts          # Usage examples
├── package.json          # Module package configuration
├── tsconfig.json         # TypeScript configuration
├── README.md             # Module documentation
└── LICENSE               # MIT License
```

## Requirements

- TypeScript 5+
- Node.js 16+
- Minimum 80% test coverage
- WCAG AAA accessibility compliance
- Comprehensive documentation
- MIT License (for open-source modules)

## Resources

- [Developer Modules Guide](../../../docs/DEVELOPER_MODULES.md)
- [Contributing Guidelines](../../../docs/CONTRIBUTING_MODULES.md)
- [Integration Guide](../../../docs/INTEGRATION_GUIDE.md)
- [Publishing Workflow](../../../docs/PUBLISHING_WORKFLOW.md)
