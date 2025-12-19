# Production Deployment Checklist

## Pre-Deployment

### Environment Configuration
- [ ] All environment variables defined in `.env.example` are set in production
- [ ] Supabase project created with production credentials
- [ ] MongoDB database provisioned (Atlas, AWS DocumentDB, or self-hosted)
- [ ] Database connection string tested and working
- [ ] All API keys rotated from development to production values
- [ ] CORS origins configured for production domains

### Security
- [ ] Supabase Row Level Security (RLS) policies enabled
- [ ] JWT token expiration set appropriately (15 minutes recommended)
- [ ] Supabase service role key stored securely (not in codebase)
- [ ] MongoDB authentication enabled
- [ ] MongoDB user accounts with minimal required permissions
- [ ] HTTPS enforced on all endpoints
- [ ] Rate limiting configured (see API_DOCS.md)
- [ ] Input validation enabled on all routes
- [ ] SQL injection prevention verified
- [ ] XSS protection headers configured

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] Build completes without errors (`npm run build`)
- [ ] Linter passes with no errors (`npm run lint`)
- [ ] TypeScript compilation successful
- [ ] No console.log statements in production code
- [ ] Error handling covers all edge cases
- [ ] Dead code removed

### Infrastructure
- [ ] Docker images built and tagged correctly
- [ ] docker-compose.yml configured for production
- [ ] Container orchestration configured (Docker Swarm, Kubernetes, ECS, etc.)
- [ ] Load balancer configured for horizontal scaling
- [ ] Health check endpoints implemented
- [ ] Monitoring and alerting configured
- [ ] Log aggregation setup (CloudWatch, Datadog, etc.)
- [ ] Backup strategy defined and tested

## Deployment Steps

### 1. Database Migration
```bash
# Backup existing data
mongodump --uri="$MONGODB_URI" --out=/backup/$(date +%Y%m%d)

# Run migrations
npm run migrate:up

# Verify migration
npm run migrate:verify
```

### 2. Build and Tag Docker Image
```bash
# Build image
docker build -t vr4deaf:latest .

# Tag for registry
docker tag vr4deaf:latest registry.example.com/vr4deaf:$(git rev-parse --short HEAD)
docker tag vr4deaf:latest registry.example.com/vr4deaf:latest

# Push to registry
docker push registry.example.com/vr4deaf:$(git rev-parse --short HEAD)
docker push registry.example.com/vr4deaf:latest
```

### 3. Deploy with Docker Compose
```bash
# Pull latest images
docker-compose pull

# Stop existing containers
docker-compose down

# Start new containers
docker-compose up -d

# Verify deployment
docker-compose ps
docker-compose logs -f app
```

### 4. Smoke Tests
```bash
# Health check
curl https://vr4deaf.org/api/health

# Auth endpoint
curl https://vr4deaf.org/api/deafauth

# Magicians endpoint
curl https://vr4deaf.org/api/magicians

# Database connectivity
curl https://vr4deaf.org/api/health/db
```

## Post-Deployment

### Verification
- [ ] Homepage loads correctly
- [ ] API endpoints respond with expected status codes
- [ ] Authentication flow works (login/logout)
- [ ] Database queries executing successfully
- [ ] Static assets served correctly
- [ ] SSL certificate valid and trusted
- [ ] CORS headers allow expected origins
- [ ] Rate limiting functioning
- [ ] Error pages display correctly (404, 500)

### Monitoring Setup
- [ ] Application metrics streaming (CPU, memory, requests/sec)
- [ ] Error tracking configured (Sentry, Rollbar, etc.)
- [ ] Database performance metrics (query time, connections)
- [ ] Uptime monitoring (Pingdom, StatusCake, etc.)
- [ ] Alert rules configured for critical metrics
- [ ] On-call rotation defined
- [ ] Runbook created for common issues

### Documentation
- [ ] API documentation published
- [ ] Deployment runbook updated
- [ ] Architecture diagrams current
- [ ] Changelog updated with release notes
- [ ] Team notified of deployment

## Rollback Procedure

If deployment fails:

### 1. Quick Rollback
```bash
# Revert to previous image
docker-compose pull --quiet
docker tag registry.example.com/vr4deaf:previous registry.example.com/vr4deaf:latest
docker-compose up -d

# Verify rollback
curl https://vr4deaf.org/api/health
```

### 2. Database Rollback
```bash
# Restore from backup
mongorestore --uri="$MONGODB_URI" --drop /backup/YYYYMMDD

# Run down migrations
npm run migrate:down
```

### 3. Incident Communication
- [ ] Update status page with incident details
- [ ] Notify team and stakeholders
- [ ] Create postmortem issue in GitHub
- [ ] Schedule postmortem meeting

## Performance Optimization

### Application
- [ ] Database indexes created for common queries
- [ ] API responses cached where appropriate
- [ ] Database connection pooling configured
- [ ] Static assets cached with CDN
- [ ] Lazy loading implemented for large data sets
- [ ] Pagination enabled on list endpoints

### Infrastructure
- [ ] Auto-scaling policies configured
- [ ] Database read replicas for heavy read workloads
- [ ] Redis cache for session storage
- [ ] CDN configured for static assets
- [ ] Gzip compression enabled

## Security Hardening

### Application
- [ ] Dependency vulnerabilities scanned and resolved
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] API authentication required on all protected routes
- [ ] User input sanitized and validated
- [ ] SQL injection tests passing
- [ ] XSS vulnerability tests passing
- [ ] CSRF protection enabled

### Infrastructure
- [ ] Firewall rules limit access to necessary ports only
- [ ] VPC/network segmentation configured
- [ ] Secrets stored in vault (AWS Secrets Manager, HashiCorp Vault)
- [ ] SSH access restricted to specific IPs
- [ ] Regular security updates applied
- [ ] Intrusion detection system (IDS) configured

## Compliance

### Data Privacy
- [ ] GDPR compliance verified (if applicable)
- [ ] ADA/WCAG accessibility standards met
- [ ] User consent flows implemented
- [ ] Data retention policies defined
- [ ] Privacy policy published and linked
- [ ] Data deletion procedures tested

### Accessibility
- [ ] Visual contrast ratios meet WCAG AA standards
- [ ] Keyboard navigation functional
- [ ] Screen reader compatibility verified
- [ ] ASL video alternatives provided where needed
- [ ] Captions available on all video content
- [ ] Visual alerts implemented for important notifications

## Maintenance Windows

### Planned Maintenance
- [ ] Maintenance window scheduled during low-traffic period
- [ ] Users notified 48 hours in advance
- [ ] Status page updated with maintenance details
- [ ] Rollback plan prepared
- [ ] Backup taken immediately before maintenance

### Regular Updates
- [ ] Dependency updates scheduled monthly
- [ ] Security patches applied within 7 days
- [ ] OS updates applied monthly
- [ ] Database maintenance windows monthly
- [ ] Certificate renewal automated (Let's Encrypt)

## Disaster Recovery

### Backup Strategy
- [ ] Database backups automated daily
- [ ] Application code versioned in Git
- [ ] Environment configuration documented
- [ ] Backup restoration tested quarterly
- [ ] Off-site backup storage configured
- [ ] Backup retention policy: 30 days

### Recovery Procedures
- [ ] Recovery Time Objective (RTO) defined: 4 hours
- [ ] Recovery Point Objective (RPO) defined: 24 hours
- [ ] Disaster recovery plan documented
- [ ] DR testing scheduled annually
- [ ] Alternative hosting provider identified

## Contact Information

### On-Call Rotation
- Primary: [Name] - [Phone] - [Email]
- Secondary: [Name] - [Phone] - [Email]
- Manager: [Name] - [Phone] - [Email]

### External Contacts
- Hosting Provider Support: [Contact Info]
- Database Provider Support: [Contact Info]
- CDN Provider Support: [Contact Info]
- Security Incident Response: [Contact Info]

## Sign-Off

- [ ] Technical Lead approval
- [ ] Product Manager approval
- [ ] Security team approval
- [ ] Operations team approval

**Deployment Date**: _______________  
**Deployed By**: _______________  
**Git Commit**: _______________  
**Version**: _______________
