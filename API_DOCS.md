# API Documentation

## Overview

The VR4Deaf API provides endpoints for the AUTH-SYNC-TRUST spine and Four Magicians pathway system. All endpoints follow RESTful conventions and return JSON responses.

## Base URL

```
Development: http://localhost:3000/api
Production: https://vr4deaf.org/api
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

Tokens are issued by the DeafAUTH service using Supabase OAuth.

## Standard Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Core Spine APIs

### DeafAUTH - Authentication

#### Get Current User
```http
GET /api/deafauth
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login
```http
POST /api/deafauth
Content-Type: application/json

{
  "action": "login",
  "email": "user@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /api/deafauth
Content-Type: application/json
Authorization: Bearer <token>

{
  "action": "logout"
}
```

#### Get User Profile
```http
GET /api/deafauth/profile
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "accommodations": {
      "visualNeeds": true,
      "aslPreferred": true,
      "captioningRequired": true,
      "visualAlerts": true
    }
  }
}
```

#### Update Profile
```http
PUT /api/deafauth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "accommodations": {
    "visualNeeds": true,
    "aslPreferred": true,
    "captioningRequired": false,
    "visualAlerts": true
  }
}
```

### PinkSync - Synchronization

#### Get Sync Status
```http
GET /api/pinksync
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "active",
    "lastSync": "2024-12-19T03:00:00Z"
  }
}
```

#### Trigger Sync Event
```http
POST /api/pinksync
Authorization: Bearer <token>
Content-Type: application/json

{
  "sourceSystem": "deafauth",
  "targetSystems": ["magicians", "agency"],
  "eventType": "accommodations_changed",
  "payload": {
    "userId": "user_123",
    "changes": { "aslPreferred": true }
  }
}
```

### FibonRose - Trust & Accountability

#### Get Trust Events
```http
GET /api/fibonrose?entityId=agency_123
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "event_123",
      "entityId": "agency_123",
      "entityType": "agency",
      "eventType": "accommodation_honored",
      "accommodationsHonored": true,
      "details": {},
      "timestamp": "2024-12-19T03:00:00Z"
    }
  ]
}
```

#### Get Trust Score
```http
GET /api/fibonrose?entityId=agency_123&type=score
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "entityId": "agency_123",
    "entityType": "agency",
    "score": 850,
    "eventsCount": 100,
    "badges": ["bronze", "silver"],
    "lastUpdated": "2024-12-19T03:00:00Z"
  }
}
```

#### Log Trust Event
```http
POST /api/fibonrose
Authorization: Bearer <token>
Content-Type: application/json

{
  "entityId": "agency_123",
  "entityType": "agency",
  "eventType": "accommodation_honored",
  "accommodationsHonored": true,
  "details": {
    "accommodation": "asl_interpreter",
    "service": "counseling_session"
  }
}
```

## Support Services APIs

### Agency Management

#### List Agencies
```http
GET /api/agency?page=1&perPage=10
Authorization: Bearer <token>
```

#### Create Agency
```http
POST /api/agency
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "State VR Agency",
  "type": "vr_agency",
  "region": "CA",
  "contact": {
    "email": "contact@agency.gov",
    "phone": "555-0100"
  },
  "services": ["counseling", "job_placement", "training"]
}
```

### IPE Approval Workflows

#### List Approval Requests
```http
GET /api/approval?status=pending
Authorization: Bearer <token>
```

#### Submit for Approval
```http
POST /api/approval
Authorization: Bearer <token>
Content-Type: application/json

{
  "action": "submit",
  "ipeId": "ipe_123"
}
```

#### Approve/Reject
```http
POST /api/approval
Authorization: Bearer <token>
Content-Type: application/json

{
  "action": "approve",
  "ipeId": "ipe_123",
  "notes": "All requirements met"
}
```

### Notifications

#### Get Notifications
```http
GET /api/notification?unreadOnly=true
Authorization: Bearer <token>
```

#### Create Notification
```http
POST /api/notification
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_123",
  "type": "info",
  "title": "New Resource Available",
  "message": "A new training program matching your profile is available",
  "visualAlert": true
}
```

#### Mark as Read
```http
PUT /api/notification
Authorization: Bearer <token>
Content-Type: application/json

{
  "notificationId": "notif_123"
}
```

## Four Magicians APIs

### Magicians Overview

#### List All Magicians
```http
GET /api/magicians
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "name": "Job Magician",
      "type": "job",
      "description": "Orchestrates VR, Workforce, employers, trainings, accommodations",
      "endpoint": "/api/magicians/job"
    },
    {
      "name": "Business Magician",
      "type": "business",
      "description": "Orchestrates self-employment supports, small-business tools, revenue streams",
      "endpoint": "/api/magicians/business"
    },
    {
      "name": "Developer Magician",
      "type": "developer",
      "description": "Orchestrates learning paths, tooling, credentials for tech growth",
      "endpoint": "/api/magicians/developer"
    },
    {
      "name": "Creative Magician",
      "type": "creative",
      "description": "Orchestrates gear, platforms, audience growth, income models for creators",
      "endpoint": "/api/magicians/creative"
    }
  ]
}
```

### Job Magician

#### Get Pathway Status
```http
GET /api/magicians/job?clientId=user_123
Authorization: Bearer <token>
```

#### Get Recommendations
```http
POST /api/magicians/job
Authorization: Bearer <token>
Content-Type: application/json

{
  "action": "get_recommendations",
  "clientId": "user_123",
  "stage": "explore"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "id": "res_123",
        "title": "VR Career Assessment",
        "description": "Comprehensive assessment...",
        "vrCoverage": true,
        "accessTags": ["asl-available", "visual-friendly"]
      }
    ],
    "stage": "explore"
  }
}
```

#### Update Stage
```http
POST /api/magicians/job
Authorization: Bearer <token>
Content-Type: application/json

{
  "action": "update_stage",
  "clientId": "user_123",
  "newStage": "prepare"
}
```

### Business Magician

Endpoints follow same pattern as Job Magician:
- `GET /api/magicians/business?clientId=user_123`
- `POST /api/magicians/business` (get_recommendations, update_stage)

### Developer Magician

Endpoints follow same pattern:
- `GET /api/magicians/developer?clientId=user_123`
- `POST /api/magicians/developer` (get_recommendations, update_stage)

### Creative Magician

Endpoints follow same pattern:
- `GET /api/magicians/creative?clientId=user_123`
- `POST /api/magicians/creative` (get_recommendations, update_stage)

## Rate Limiting

All endpoints are rate-limited:
- **Authenticated requests**: 1000 requests/hour
- **Unauthenticated requests**: 100 requests/hour

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
```

## Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Missing or invalid token |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource doesn't exist |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error |
| 501  | Not Implemented - Feature coming soon |

## Webhooks

### Webhook Events

The following events can trigger webhooks:

- `user.created` - New user registered
- `user.updated` - User profile updated
- `accommodations.changed` - User accommodations updated
- `pathway.transitioned` - User moved to new pathway stage
- `trust.event_logged` - New trust event recorded
- `approval.submitted` - IPE submitted for approval
- `approval.decided` - IPE approved or rejected

### Webhook Payload Format

```json
{
  "event": "user.updated",
  "timestamp": "2024-12-19T03:00:00Z",
  "data": {
    "userId": "user_123",
    "changes": {
      "accommodations": {
        "aslPreferred": true
      }
    }
  }
}
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { VR4DeafClient } from '@vr4deaf/sdk';

const client = new VR4DeafClient({
  apiKey: 'your_api_key',
  baseUrl: 'https://vr4deaf.org/api'
});

// Get recommendations
const recommendations = await client.magicians.job.getRecommendations({
  clientId: 'user_123',
  stage: 'explore'
});
```

### Python
```python
from vr4deaf import VR4DeafClient

client = VR4DeafClient(
    api_key='your_api_key',
    base_url='https://vr4deaf.org/api'
)

# Get recommendations
recommendations = client.magicians.job.get_recommendations(
    client_id='user_123',
    stage='explore'
)
```

## Support

For API support, contact:
- **Email**: api@vr4deaf.org
- **Documentation**: https://docs.vr4deaf.org
- **Status Page**: https://status.vr4deaf.org
