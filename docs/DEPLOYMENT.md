# Deployment & Configuration Guide

## Overview

This guide covers deployment strategies, environment configuration, and operational procedures for the VR4DEAF.org platform.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Deployment Strategies](#deployment-strategies)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Monitoring & Logging](#monitoring--logging)
5. [Security Configuration](#security-configuration)
6. [Performance Optimization](#performance-optimization)
7. [Troubleshooting](#troubleshooting)

---

## Environment Setup

### Required Tools

- **Node.js** - v18.0.0 or higher
- **pnpm** - v8.0.0 or higher (preferred) or npm
- **Git** - v2.30.0 or higher

### Local Development

```bash
# Clone repository
git clone https://github.com/pinkycollie/VR4Deaf.git
cd VR4Deaf

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

Create `.env.local` file with the following variables:

```bash
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.vr4deaf.org
NEXT_PUBLIC_AI_TOOLS_URL=https://aitools.vr4deaf.org
NEXT_PUBLIC_WS_URL=wss://ws.vr4deaf.org

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=auth.vr4deaf.org
AUTH_SECRET=your-secret-key-change-in-production
JWT_SECRET=your-jwt-secret-change-in-production
SESSION_SECRET=your-session-secret-change-in-production

# Database (if applicable)
DATABASE_URL=postgresql://user:password@localhost:5432/vr4deaf
MONGODB_URI=mongodb://localhost:27017/vr4deaf

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
NEXT_PUBLIC_ENABLE_REAL_TIME_CHAT=true
NEXT_PUBLIC_ENABLE_VIDEO_CALLS=false

# Third-Party Services
SENDGRID_API_KEY=your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=vr4deaf-uploads

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXX-Y
NEXT_PUBLIC_GTM_ID=GTM-XXXXX

# Error Tracking
SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Development
NEXT_TELEMETRY_DISABLED=1
```

### Environment-Specific Configuration

#### Development (.env.local)
```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

#### Staging (.env.staging)
```bash
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.vr4deaf.org
NEXT_PUBLIC_API_BASE_URL=https://api-staging.vr4deaf.org
```

#### Production (.env.production)
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://vr4deaf.org
NEXT_PUBLIC_API_BASE_URL=https://api.vr4deaf.org
```

---

## Deployment Strategies

### Vercel Deployment (Recommended)

#### Initial Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_API_BASE_URL production
vercel env add AUTH_SECRET production
# ... add all required environment variables
```

#### Deployment Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### vercel.json Configuration

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.vr4deaf.org/:path*"
    }
  ]
}
```

### Docker Deployment

#### Dockerfile

The project includes a multi-stage Dockerfile for production deployment. See `Dockerfile` in the root directory.

Key features:
- Multi-stage build for optimized image size
- Uses Next.js standalone output
- Non-root user for security
- Alpine Linux base for minimal attack surface

#### docker-compose.yml

The project includes a docker-compose configuration with MongoDB. See `docker-compose.yml` in the root directory.

Services included:
- **app**: VR4Deaf Next.js application
- **mongodb**: MongoDB 7.0 for data storage

Configuration:
```yaml
# Example environment variables for docker-compose
MONGODB_USERNAME=admin
MONGODB_PASSWORD=secure_password_here
MONGODB_DATABASE=vr4deaf
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
```

#### Build and Run

```bash
# Build image
docker build -t vr4deaf:latest .

# Run container
docker run -p 3000:3000 --env-file .env.production vr4deaf:latest

# Using docker-compose
docker-compose up -d
```

### AWS Deployment

#### next.config.mjs for AWS

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['vr4deaf-uploads.s3.amazonaws.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
  },
};

export default nextConfig;
```

#### S3 + CloudFront Setup

```bash
# Create S3 bucket
aws s3 mb s3://vr4deaf-static

# Upload static assets
aws s3 sync .next/static s3://vr4deaf-static/_next/static
aws s3 sync public s3://vr4deaf-static/public

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name vr4deaf-static.s3.amazonaws.com \
  --default-root-object index.html
```

---

## CI/CD Pipeline

### GitHub Actions

#### .github/workflows/deploy.yml

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run linter
        run: pnpm lint
        
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run tests
        run: pnpm test
        
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build application
        run: pnpm build
        env:
          NEXT_PUBLIC_API_BASE_URL: ${{ secrets.API_BASE_URL }}
          
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next
          
  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: .next
          
      - name: Deploy to Github Page
    
```

### Pre-deployment Checks

```yaml
name: Pre-deployment Checks

on:
  pull_request:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run security audit
        run: pnpm audit --production
        
      - name: Check for secrets
        uses: trufflesecurity/trufflehog@v3
        
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run accessibility tests
        run: pnpm test:a11y
        
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build application
        run: pnpm build
        
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://vr4deaf.org
            https://vr4deaf.org/client
          uploadArtifacts: true
```

---

## Monitoring & Logging

### Error Tracking with Sentry

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Filter out sensitive information
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.authorization;
    }
    return event;
  },
});
```

### Application Logging

```typescript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
});

// Usage
logger.info({ userId: '123' }, 'User logged in');
logger.error({ error }, 'API request failed');
```

### Analytics Integration

```typescript
// lib/analytics.ts
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties);
    }
  },
  
  page: (path: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID, {
        page_path: path,
      });
    }
  },
};
```

### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    api: await checkAPIGateway(),
    redis: await checkRedis(),
  };
  
  const isHealthy = Object.values(checks).every(check => check.status === 'ok');
  
  return Response.json({
    status: isHealthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  }, {
    status: isHealthy ? 200 : 503,
  });
}
```

---

## Security Configuration

### Content Security Policy

```typescript
// next.config.mjs
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-scripts.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:;
      font-src 'self';
      connect-src 'self' https://api.vr4deaf.org wss://ws.vr4deaf.org;
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim(),
  },
];
```

### Rate Limiting

```typescript
// lib/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

// Usage in API route
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  // Process request
}
```

### CORS Configuration

```typescript
// lib/cors.ts
export function cors(origin?: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}
```

---

## Performance Optimization

### Caching Strategy

```typescript
// lib/cache.ts
export const revalidationConfig = {
  homepage: { revalidate: 3600 }, // 1 hour
  jobs: { revalidate: 300 }, // 5 minutes
  profile: { revalidate: 60 }, // 1 minute
};

// Usage in page
export const revalidate = revalidationConfig.jobs.revalidate;
```

### Image Optimization

```typescript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['vr4deaf-uploads.s3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### Bundle Analysis

```bash
# Install analyzer
pnpm add -D @next/bundle-analyzer

# Run analysis
ANALYZE=true pnpm build
```

---

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next
pnpm install --frozen-lockfile
pnpm build
```

#### Environment Variable Issues

```bash
# Verify environment variables
printenv | grep NEXT_PUBLIC

# Check Vercel environment variables
vercel env ls
```

#### Database Connection Issues

```bash
# Test database connection
pnpm tsx scripts/test-db-connection.ts

# Check database logs
docker-compose logs postgres
```

### Debug Mode

```bash
# Enable debug logging
NODE_OPTIONS='--inspect' pnpm dev

# Enable Next.js debugging
DEBUG=* pnpm dev
```

### Support Contacts

- **DevOps Team:** devops@vr4deaf.org
- **Security Team:** security@vr4deaf.org
- **On-call:** +1 (555) 123-4567

---

**Last Updated:** December 2024
